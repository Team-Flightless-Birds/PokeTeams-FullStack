<?php
require('DBInitializer.php');
$db = DBInitializer::initUnixDatabaseConnection();

$method = $_SERVER['REQUEST_METHOD'];
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

if ($method == 'GET') {
    $tid = $_GET['tid'];
    $poke_index = $_GET['pokeindex'];

    $sql_result = $db->prepare("
    INSERT INTO member_of (poke_name, TID)
    VALUES (?, ?) ");
}else
{
    http_response_code(400);
}



// run SQL statement
$sql_result->execute([$poke_index, $tid]);

if (!$sql_result) {
  http_response_code(404);
}else
{
    $return_obj->success = true;
    echo json_encode($return_obj);
}

?>
