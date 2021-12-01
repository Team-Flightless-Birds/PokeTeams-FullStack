<?php
require('DBInitializer.php');
$db = DBInitializer::initUnixDatabaseConnection();

$method = $_SERVER['REQUEST_METHOD'];

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

if ($method == 'GET') {
    $uid = $_GET['uid'];
    $sql_result = $db->prepare("
    SELECT UID, email 
    FROM Users AS U1
    WHERE UID <> ? AND UID NOT IN
    (SELECT UID FROM Users AS U2 NATURAL JOIN (SELECT UID2 AS UID FROM follows WHERE UID1 = ?) AS F);");
}else
{
    http_response_code(400);
}

// run SQL statement
$sql_result->execute([$uid, $uid]);

if (!$sql_result) {
  http_response_code(404);
}else
{
    $result_arr = $sql_result->fetchAll(PDO::FETCH_KEY_PAIR);
    $sql_obj->users_not_following = $result_arr;
    echo json_encode($sql_obj);
}

?>