<?php

require("config.php");

//if(empty($_SESSION['user']))
{
    //header("Location: index.html");
    //die("Redirecting to index.html");
}

$val1 = (int)$_POST['v1'];
$val2 = (int)$_POST['v2'];
$projectID=-1;
//SELECT d.* FROM (SELECT lookup_key FROM data_feature_metadata WHERE project_id='wZjXehg' ORDER BY lookup_key LIMIT 0, 60000) q JOIN data_feature_metadata d ON d.lookup_key=q.lookup_key ORDER BY d.lookup_key
$query = "SELECT d.* FROM (SELECT lookup_key FROM data_feature_metadata WHERE project_id=:project_id ORDER BY lookup_key LIMIT :val1, :val2) q JOIN data_feature_metadata d ON d.lookup_key=q.lookup_key ORDER BY d.lookup_key";
//$query_params = array(':project_id' => $projectID, ':val1' => $val1, ':val2' => $val2);
$stmt = $db->prepare($query);
$stmt->bindParam(':val1', $val1, PDO::PARAM_INT);
$stmt->bindParam(':val2', $val2, PDO::PARAM_INT);
$stmt->bindValue(':project_id', $projectID);


$result = $stmt->execute();
$row = $stmt->fetchAll();
$data = array();
if($row)
{
	foreach ($row as $entry) {
		array_push($data, $entry);
	}
}
echo(json_encode($data));