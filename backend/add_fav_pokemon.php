<?php
require('DBInitializer.php');
$db = DBInitializer::initUnixDatabaseConnection();

$method = $_SERVER['REQUEST_METHOD'];
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

if ($method == 'GET') {
    $uid = $_GET['uid'];
    $poke_index = $_GET['pokeindex'];
    $sql_result = $db->prepare("
    INSERT INTO favs (UID, poke_name)
    VALUES (?, ?);");
}else
{
    http_response_code(400);
}

// run SQL statement
$successful_insert = $sql_result->execute([$uid, $poke_index]);

if (!$sql_result) {
  http_response_code(404);
}else
{
    $return_obj->success = $successful_insert;
    echo json_encode($return_obj);
}

?>
