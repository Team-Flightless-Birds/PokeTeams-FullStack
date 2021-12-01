<?php
require('DBInitializer.php');
$db = DBInitializer::initUnixDatabaseConnection();

$method = $_SERVER['REQUEST_METHOD'];
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

if ($method == 'GET') {
    $tid = $_GET['tid'];
    $new_team_name = $_GET['new_team_name'];
    $sql_result = $db->prepare("
    UPDATE Teams
    SET name = ?
    WHERE TID = ?;");
}else
{
    http_response_code(400);
}

// run SQL statement
$sql_result->execute([$new_team_name, $tid]);

if (!$sql_result) {
  http_response_code(404);
}else
{
    $return_obj->success = true;
    echo json_encode($return_obj);
}

?>
