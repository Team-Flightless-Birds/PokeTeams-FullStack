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
    SELECT name
    FROM Pokemon NATURAL JOIN
    (SELECT poke_name as pokeindex
    FROM Teams
    WHERE TID = ?) AS T; ");
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
    $return_obj->pokemons_in_team = $sql_result->fetchAll(PDO::FETCH_COLUMN);
    echo json_encode($return_obj);
}

?>
