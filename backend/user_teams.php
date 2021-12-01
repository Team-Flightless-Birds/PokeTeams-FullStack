<?php
require('DBInitializer.php');
$db = DBInitializer::initUnixDatabaseConnection();

$method = $_SERVER['REQUEST_METHOD'];

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

if ($method == 'GET') {
    $uid = $_GET['uid'];
    $sql_result = $db->prepare("SELECT TID, name FROM Teams NATURAL JOIN has WHERE UID = ?");
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
    $result_arr = $sql_result->fetchAll(PDO::FETCH_KEY_PAIR);
    $teams_obj->teams = $result_arr;

    //$length = count($result_arr);
    // for ($i = 0; $i < $length; $i++){
    //     $teams_obj->Teams = false;
    // }
    
    echo json_encode($teams_obj);
}

?>