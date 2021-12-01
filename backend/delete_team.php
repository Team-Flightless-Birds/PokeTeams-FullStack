<?php
require('DBInitializer.php');
$db = DBInitializer::initUnixDatabaseConnection();

$method = $_SERVER['REQUEST_METHOD'];
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

if ($method == 'GET') {
    $tid = $_GET['tid'];
    $sql_result = $db->prepare("
    DELETE FROM has
    WHERE TID = ?;");
}else
{
    http_response_code(400);
}

// run SQL statement
$successful_deletion = $sql_result->execute([$tid]);

$sql_result = $db->prepare("
    DELETE FROM member_of
    WHERE TID = ?;");
$successful_deletion = $sql_result->execute([$tid]);

$sql_result = $db->prepare("
    UPDATE Teams
    SET name = 'DELETED TEAM'
    WHERE TID = ?;");
$successful_deletion = $sql_result->execute([$tid]);

if (!$sql_result) {
  http_response_code(404);
}else
{
    $return_obj->success = $successful_deletion;
    echo json_encode($return_obj);
}

?>
