<?php
require("config.php");
//if (empty($_SESSION['user'])) {
//    header("Location: index.html");
//    die("Redirecting to index.html");
//}
$server = mysql_connect($host, $username, $password);
mysql_select_db($dbname);

$branch = $_POST['bi'];

$argLine = "SELECT DISTINCT (data_descriptive_statistics.unique_identifier_id), data_unique_identifiers.unique_identifier_text FROM data_descriptive_statistics JOIN data_unique_identifiers ON data_descriptive_statistics.unique_identifier_id=data_unique_identifiers.unique_identifier_id WHERE data_descriptive_statistics.branch_id='" . $branch . "'";
$query = mysql_query($argLine);
if ( ! $query ) {
    echo mysql_error();
    die;
}
$data = array();
while ($rows = mysql_fetch_array($query)) {
    $data[] = $rows;
}
echo(json_encode($data));