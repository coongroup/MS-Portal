<?php

require("config.php");

if(empty($_SESSION['user']))
{
//    header("Location: index.html");
	die();
}

//Check for permissions which might be redundant


$projectID=-1;
$id=$_POST['i'];
$controlData=$_POST['c'];
$name=$_POST['n'];

$time = date("Y-m-d H:i:s");

//Return an array indicating success/failure, and a text statement.
$data = array();

//Confirm edit abilities (permission_level 2 or 3)
$query = "SELECT * FROM project_permissions WHERE user_id=:user AND project_id=:project_id AND permission_level>=2";
$query_params = array(':user' => $_SESSION['user'], ':project_id' => $projectID);
$stmt = $db->prepare($query);
$result = $stmt->execute($query_params);
$row = $stmt->fetch();
if(!$row)
{
	$data = array("result"=>false, "message"=>"You do not have permission to delete any project data.");
	echo(json_encode($data));
	return;
}

//Confirm that set id and set name match
$query = "SELECT a.*, b.branch_name FROM project_sets AS a JOIN project_branches AS b ON a.branch_id=b.branch_id WHERE a.set_id=:id AND a.set_name=:name";
$query_params = array(':id' => $id, ':name' => $name);
$stmt = $db->prepare($query);
$result = $stmt->execute($query_params);
$row = $stmt->fetch();
if(!$row)
{
	$data = array("result"=>false, "message"=>"Unable to locate specified set data.");
	echo(json_encode($data));
	return;
}

$branch_id = $row['branch_id'];
$branch_name = $row['branch_name'];

//get file associated with set id
$query = "SELECT * FROM project_files WHERE set_id=:id AND project_id=:project_id";
$query_params = array(':id' => $id, ':project_id' => $projectID);
$stmt = $db->prepare($query);
$result = $stmt->execute($query_params);
$row = $stmt->fetch();
if(!$row)
{
	$data = array("result"=>false, "message"=>"Unable to find data file associated with set '" . $name . "'.");
	echo(json_encode($data));
	return;
}
$old_file_id = $row['file_id'];
$og_quant_data = json_decode($row['quant'], true);
$og_file_upload = $row;

$new_quant_data = array();
foreach ($controlData as $entry) {
	$new_quant_data[$entry['header']] = $entry;
}

//Update quant headers, if you cannot find data associated with a particular header return an error message

$quant_adj = array();
foreach ($og_quant_data as $entry) {
	if(!array_key_exists($entry['header'], $new_quant_data))
	{
		$data = array("result"=>false, "message"=>"Unable to find all listed column headers in set '" . $name . "'.");
		echo(json_encode($data));
		return;
	}
	$entry['control']=$new_quant_data[$entry['header']]['control'];
	$entry['control']==="1" || $entry['control']===1 ? $entry['control']="Yes" : $entry['control']="No";
	array_push($quant_adj, $entry);
}

//$quant_adj is what you should upload in lieu of current $quant array

//Delete sets, conditions, and replicates

$set_id = $id;
$set_name = $name;

$new_file_id=AddNewFileEntry($row, $quant_adj, $db);

$new_set_id = AddNewNodes($set_name, $quant_adj, $projectID, $new_file_id, $branch_id, $db);

	DeleteSetsBySetID($set_id, $db);
	DeleteConditionsBySetID($set_id, $db);
	DeleteReplicatesBySetID($set_id, $db);
	DeleteQueryTermsBySetID($set_id, $db);


//Delete existing file Entry
	/*$query = "DELETE FROM project_files WHERE set_id=:id AND file_id=:file_id";
	$query_params = array(':id' => $set_id, ':file_id' => $old_file_id);
	$stmt = $db->prepare($query);
	$result = $stmt->execute($query_params);*/

	//Update file id
$query = "UPDATE project_files SET set_id=:set_id WHERE file_id=:file_id";
$query_params = array(':set_id' => $new_set_id, ':file_id' => $new_file_id);
$stmt = $db->prepare($query);
$result = $stmt->execute($query_params);

	//add deleted replicate activity
	//Deleted replicate 'rep name' (Branch: branch name | Set: set name)
$control_description = "Updated control condition settings in '" . $set_name . "' (Branch: " . $branch_name . ")";
$query = "INSERT INTO project_activity (project_id, activity, time, description) VALUES (:project_id, :activity, :time, :description)";
$query_params = array(':project_id' => $projectID, ':activity' => 'CONTROL RESELECT', ':time' => $time, ':description' => $control_description);
$stmt = $db->prepare($query);
$result = $stmt->execute($query_params);

	//add set to data_deletion_queue
$query = "INSERT INTO data_deletion_queue (project_id, identifier, identifier_type, deletion_time) VALUES (:project_id, :identifier, :identifier_type, :time)";
$query_params = array(':project_id' => $projectID, ':identifier' => $set_id, ':identifier_type' => 'set_id', ':time' => $time);
$stmt = $db->prepare($query);
$result = $stmt->execute($query_params);

	//add to process queue
$lockText = "LOCK TABLES process_queue WRITE";
$stmt = $db->prepare($lockText);
$result = $stmt->execute();
$query = "INSERT INTO process_queue (user_id, project_id, set_id, branch_id, task, task_params, running, completed, task_creation_time, task_completion_time) VALUES 
(:user_id, :project_id, :set_id, :branch_id, :task, :task_params, :running, :completed, :task_creation_time, :task_completion_time)";
$query_params = array(':user_id' => $row['uploader_user_id'], ':project_id' => $projectID, ':task_params' => '', ':task' => 'CONTROL', ':set_id' => $new_set_id, ':branch_id' => $row['branch_id'],
	':running' => '0', ':completed' => '0', ':task_creation_time' => $time, ':task_completion_time' => '');
$stmt = $db->prepare($query);
$result = $stmt->execute($query_params);

	//start processing worker if none exists.

$query = "SELECT * FROM process_queue WHERE running=1 AND project_id=:project_id";
$query_params = array(':project_id' => $projectID);
$stmt = $db->prepare($query);
$result = $stmt->execute($query_params);
$row = $stmt->fetch();

	//if no then launch a new worker
if(!$row)
{
		//launch a new worker here
		//http://www.developertutorials.com/running-background-processes-in-php/ -- how to launch
		//http://stackoverflow.com/questions/6826718/pass-variable-to-php-script-running-from-command-line -- how to pass arguments
	$ch = curl_init();
 
	//curl_setopt($ch, CURLOPT_URL, "https://coonlabdatadev.com/DV/" . $projectID . "/process.php");
	curl_setopt($ch, CURLOPT_URL, "127.0.0.1/projects/" . $projectID . "/process.php");
	//curl_setopt($ch, CURLOPT_FRESH_CONNECT, true);
	curl_setopt($ch, CURLOPT_TIMEOUT, 1);
	 
	curl_exec($ch);
	curl_close($ch);

}

	//if yes then proceed--the active worker will take care of the new task once it finishes its current process.

	//unlock process_queue
$unlockText = "UNLOCK TABLES";
$stmt = $db->prepare($unlockText);
$result = $stmt->execute();

sleep(1);

	//return a message
	//Data from file ___ is being reprocessed to reflect the removal of 'rep name'. Data from this file will become available once processing has completed.
$data = array("result"=>true, "message"=>"Data from the file '" . $og_file_upload['original_file_name'] . "' is being reprocessed to reflect updated control condition settings. Data from this file will become available once processing routines have completed.");
echo(json_encode($data));
return;




function DeleteSetsBySetID($set_id, $db)
{
	$lockText = "LOCK TABLES project_sets WRITE";
	$stmt = $db->prepare($lockText);
	$result = $stmt->execute();

	$query="DELETE FROM project_sets WHERE set_id=:id";
	$query_params = array(':id' => $set_id);
	$stmt = $db->prepare($query);
	$result = $stmt->execute($query_params);

	$lockText = "UNLOCK TABLES";
	$stmt = $db->prepare($lockText);
	$result = $stmt->execute();
}

function DeleteConditionsBySetID($set_id, $db)
{
	$lockText = "LOCK TABLES project_conditions WRITE";
	$stmt = $db->prepare($lockText);
	$result = $stmt->execute();

	$query="DELETE FROM project_conditions WHERE set_id=:id";
	$query_params = array(':id' => $set_id);
	$stmt = $db->prepare($query);
	$result = $stmt->execute($query_params);

	$lockText = "UNLOCK TABLES";
	$stmt = $db->prepare($lockText);
	$result = $stmt->execute();
}

function DeleteReplicatesBySetID($set_id, $db)
{
	$lockText = "LOCK TABLES project_replicates WRITE";
	$stmt = $db->prepare($lockText);
	$result = $stmt->execute();

	$query="DELETE FROM project_replicates WHERE set_id=:id";
	$query_params = array(':id' => $set_id);
	$stmt = $db->prepare($query);
	$result = $stmt->execute($query_params);

	$lockText = "UNLOCK TABLES";
	$stmt = $db->prepare($lockText);
	$result = $stmt->execute();
}

function DeleteQueryTermsBySetID($set_id, $db)
{
	$lockText = "LOCK TABLES data_query_terms WRITE";
	$stmt = $db->prepare($lockText);
	$result = $stmt->execute();

	$query="DELETE FROM data_query_terms WHERE set_id=:id";
	$query_params = array(':id' => $set_id);
	$stmt = $db->prepare($query);
	$result = $stmt->execute($query_params);

	$lockText = "UNLOCK TABLES";
	$stmt = $db->prepare($lockText);
	$result = $stmt->execute();
}

function AddNewNodes($set_name, $quant_data, $project_id, $new_file_id, $branch_id, $db)
{
	//lock project sets
	$lockText = "LOCK TABLES project_sets WRITE, project_files WRITE, project_max_nodes WRITE";
	$stmt = $db->prepare($lockText);
	$result = $stmt->execute();

	//get max set number
	$query = "SELECT max_set_number FROM project_max_nodes WHERE project_ID=:project_id";
	$query_params = array(':project_id' => $project_id);
	$stmt = $db->prepare($query);
	$result = $stmt->execute($query_params);
	$row = $stmt->fetch();
	$max_set=1;
	if($row)
	{
		is_numeric($row['max_set_number']) ? $max_set=$row['max_set_number']+1 : null;
	}

	//create new set entry
	$new_set_id= ($project_id . "-" . $max_set . "S");
	$insertText = "INSERT INTO project_sets (set_id, project_id, branch_id, set_name, set_number, file_id, use_data) VALUES (:set_id, :project_id, :branch_id, :set_name, :set_number, :file_id, :use_data)";
	$query_params = array(':set_id' => $new_set_id, ':project_id' => $project_id, ':branch_id' => $branch_id, 
		':set_name' => $set_name, ':set_number' => $max_set, ':file_id' => $new_file_id, ':use_data' => 1);
	$stmt = $db->prepare($insertText);
	$result = $stmt->execute($query_params);

	//Update project_max_nodes
	$query = "UPDATE project_max_nodes SET max_set_number=:max_set WHERE project_id=:project_id";
	$query_params = array(':project_id' => $project_id, ':max_set'=>$max_set);
	$stmt = $db->prepare($query);
	$result = $stmt->execute($query_params);

	//unlock project sets
	$lockText = "UNLOCK TABLES";
	$stmt = $db->prepare($lockText);
	$result = $stmt->execute();

	//lock project conditions
	$lockText = "LOCK TABLES project_conditions WRITE, project_max_nodes WRITE";
	$stmt = $db->prepare($lockText);
	$result = $stmt->execute();

	//get make condition number
	$query = "SELECT max_condition_number FROM project_max_nodes WHERE project_id=:project_id";
	$query_params = array(':project_id' => $project_id);
	$stmt = $db->prepare($query);
	$result = $stmt->execute($query_params);
	$row = $stmt->fetch();
	$max_condition=1;
	if($row)
	{
		is_numeric($row['max_condition_number']) ? $max_condition=$row['max_condition_number']+1 : null;
	}

	//insert project conditions
	$insertArray = array();
	$used_condition_array = array();
	foreach ($quant_data as $header) 
	{
		if (!array_key_exists($header['condName'], $used_condition_array))
		{
			$condition_id = $project_id . "-" . $max_condition . "C";
			$is_control = $header['control']=="Yes" ? 1 : 0;
			array_push($insertArray, array($condition_id, $header['condName'], $max_condition, $project_id, $new_file_id, $is_control, $new_set_id, $branch_id, 1));
			$used_condition_array[$header['condName']] = $condition_id;
			$max_condition++;
		}
	}

	$row_length = count($insertArray[0]);
	$nb_rows = count($insertArray);
	$length = $row_length * $nb_rows;

	$args = implode(',', array_map(
		function($el) { return '('.implode(',', $el).')'; },
		array_chunk(array_fill(0, $length, '?'), $row_length)
		));

	$query_params = array();
	foreach($insertArray as $array)
	{
		foreach($array as $value)
		{
			$query_params[] = $value;
		}
	}

	$insertText = "INSERT INTO project_conditions (condition_id, condition_name, condition_number, project_id, file_id, is_control, set_id, branch_id, use_data) VALUES " . $args;
	$stmt = $db->prepare($insertText);
	$result = $stmt->execute($query_params);

	//Update project_max_nodes
	$query = "UPDATE project_max_nodes SET max_condition_number=:max_cond WHERE project_id=:project_id";
	$query_params = array(':project_id' => $project_id, ':max_cond'=>$max_condition);
	$stmt = $db->prepare($query);
	$result = $stmt->execute($query_params);

	//unlock project conditions
	$lockText = "UNLOCK TABLES";
	$stmt = $db->prepare($lockText);
	$result = $stmt->execute();

	//lock project replicates
	$lockText = "LOCK TABLES project_replicates WRITE, project_max_nodes WRITE";
	$stmt = $db->prepare($lockText);
	$result = $stmt->execute();

	//get max replicate number
	$query = "SELECT max_replicate_number FROM project_max_nodes WHERE project_id=:project_id";
	$query_params = array(':project_id' => $project_id);
	$stmt = $db->prepare($query);
	$result = $stmt->execute($query_params);
	$row = $stmt->fetch();
	$max_replicate=1;
	if($row)
	{
		is_numeric($row['max_replicate_number']) ? $max_replicate=$row['max_replicate_number']+1 : null;
	}

	//insert replicates
	$insertArray = array();
	foreach($quant_data as $header)
	{
		$replicate_id = $project_id . "-" . $max_replicate . "R";
		$condition_id = $used_condition_array[$header['condName']];
		$is_control = $header['control']=="Yes" ? 1 : 0;
		array_push($insertArray, array($replicate_id, $header['repName'], $max_replicate, $project_id, $new_file_id, $is_control, $condition_id, $new_set_id, $branch_id, 1, $header['header']));
		$max_replicate++;
	}

	$row_length = count($insertArray[0]);
	$nb_rows = count($insertArray);
	$length = $row_length * $nb_rows;

	$args = implode(',', array_map(
		function($el) { return '('.implode(',', $el).')'; },
		array_chunk(array_fill(0, $length, '?'), $row_length)
		));

	$query_params = array();
	foreach($insertArray as $array)
	{
		foreach($array as $value)
		{
			$query_params[] = $value;
		}
	}

	$insertText = "INSERT INTO project_replicates (replicate_id, replicate_name, replicate_number, project_id, file_id, is_control, condition_id, set_id, branch_id, use_data, header_text) VALUES " . $args;
	$stmt = $db->prepare($insertText);
	$result = $stmt->execute($query_params);

	//Update project_max_nodes
	$query = "UPDATE project_max_nodes SET max_replicate_number=:max_rep WHERE project_id=:project_id";
	$query_params = array(':project_id' => $project_id, ':max_rep'=>$max_replicate);
	$stmt = $db->prepare($query);
	$result = $stmt->execute($query_params);

	//unlock replicates
	$lockText = "UNLOCK TABLES";
	$stmt = $db->prepare($lockText);
	$result = $stmt->execute();

	return $new_set_id;

}

//Re-adds file and file headers--setting up for a new upload.
function AddNewFileEntry($file_upload_data, $quant, $db)
{
	$lockText = "LOCK TABLES project_files WRITE";
	$stmt = $db->prepare($lockText);
	$result = $stmt->execute();
	$insertText = "INSERT INTO project_files (project_id, uploader_user_id, original_file_name, file_name, delimiter, upload_time, impute_missing_values, log2_transform, identifier, 
		feature_descriptors, quant, filter, branch_id, set_name, organism_id, standard_id_column, standard_id_type) VALUES (:project_id, :uploader_user_id, :original_file_name, :file_name, :delimiter, :upload_time, :impute_missing_values,
		:log2_transform, :identifier, :feature_descriptors, :quant, :filter, :branch_id, :set_name, :organism_id, :standard_id_column, :standard_id_type)";
	$query_params = array(':project_id' => $file_upload_data['project_id'], ':uploader_user_id' => $file_upload_data['uploader_user_id'], ':original_file_name' => $file_upload_data['original_file_name'],
		':file_name' => $file_upload_data['file_name'], ':delimiter' => $file_upload_data['delimiter'],
		':upload_time' => $file_upload_data['upload_time'], ':impute_missing_values' => $file_upload_data['impute_missing_values'], ':log2_transform' => $file_upload_data['log2_transform'],
		':identifier' => $file_upload_data['identifier'], ':feature_descriptors' => $file_upload_data['feature_descriptors'], 
		':quant' => json_encode($quant), ':filter' => $file_upload_data['filter'], ':branch_id' => $file_upload_data['branch_id'], ':set_name' => $file_upload_data['set_name'],
		 ':organism_id' => $file_upload_data['organism_id'], ':standard_id_column' => $file_upload_data['standard_id_column'], ':standard_id_type' => $file_upload_data['standard_id_type']);
$stmt = $db->prepare($insertText);
$result = $stmt->execute($query_params);
$file_id = $db->lastInsertID();

$unlockText = "UNLOCK TABLES";
$stmt = $db->prepare($unlockText);
$result = $stmt->execute();

$identifier_header_array = json_decode($file_upload_data['identifier'], true);
$feature_descriptor_header_array = json_decode($file_upload_data['feature_descriptors'], true);
$quant_header_array = $quant;
$project_id = $file_upload_data['project_id'];

$insertArray = array();
foreach ($identifier_header_array as $header) {
	array_push($insertArray, array($_SESSION['user'], $project_id, $file_id, $header['header'], $header['userName'], 1,0,0, "", "", 0));
}
foreach ($feature_descriptor_header_array as $header) {
	array_push($insertArray, array($_SESSION['user'], $project_id, $file_id, $header['header'], $header['userName'], 0,1,0, "", "", 0));
}
foreach ($quant_header_array as $header) {
	array_push($insertArray, array($_SESSION['user'], $project_id, $file_id, $header['header'], "", 0,0,1, $header['condName'], $header['repName'], $header['control']==="Yes" ? 1 : 0));
}

$row_length = count($insertArray[0]);
$nb_rows = count($insertArray);
$length = $row_length * $nb_rows;

$args = implode(',', array_map(
	function($el) { return '('.implode(',', $el).')'; },
	array_chunk(array_fill(0, $length, '?'), $row_length)
	));

$query_params = array();
foreach($insertArray as $array)
{
	foreach($array as $value)
	{
		$query_params[] = $value;
	}
}

$insertText = "INSERT INTO project_file_headers (uploader_user_id, project_id, file_id, header_text, user_header_name, is_unique_id, is_feature_metadata, is_quant_data, condition_name, replicate_name, is_control) VALUES " . $args;
$stmt = $db->prepare($insertText);
$result = $stmt->execute($query_params);

return $file_id;

}
