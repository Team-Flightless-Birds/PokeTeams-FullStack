<?php
require('DBInitializer.php');
$db = DBInitializer::initUnixDatabaseConnection();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");


$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $uid = $_GET['uid'];
    $sql_result = $db->prepare("
    SELECT UID, email
    FROM Users AS U
    NATURAL JOIN (SELECT UID2 AS UID FROM follows WHERE UID1 = ?) AS F
    ;");
}else
{
    http_response_code(400);
}

// run SQL statement
$sql_result->execute([$uid]);

if (!$sql_result) {
  http_response_code(404);
}else
{
    $return_obj->following = $sql_result->fetchAll(PDO::FETCH_KEY_PAIR);
    echo json_encode($return_obj);
}

?>
