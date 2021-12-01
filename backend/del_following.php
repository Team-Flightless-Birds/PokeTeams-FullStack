<?php
require('DBInitializer.php');
$db = DBInitializer::initUnixDatabaseConnection();

$method = $_SERVER['REQUEST_METHOD'];
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

if ($method == 'GET') {
    $self_uid = $_GET['self_uid'];
    $target_uid = $_GET['target_uid'];
    $sql_result = $db->prepare("
    DELETE FROM follows
    WHERE UID1 = ? AND UID2 = ?;");
}else
{
    http_response_code(400);
}

// run SQL statement
$successful_deletion = $sql_result->execute([$self_uid, $target_uid]);

if (!$sql_result) {
  http_response_code(404);
}else
{
    $return_obj->success = $successful_deletion;
    echo json_encode($return_obj);
}

?>
