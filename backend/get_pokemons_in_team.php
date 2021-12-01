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
    SELECT name, url
    FROM Pokemon
    WHERE pokeindex = ANY(
        SELECT poke_name AS pid
        FROM member_of NATURAL JOIN Teams
        WHERE TID = ?);");
}else
{
    http_response_code(400);
}

// run SQL statement
$sql_result->execute([$tid]);

if (!$sql_result) {
  http_response_code(404);
}else
{
    $return_obj->pokemons_in_team = $sql_result->fetchAll(PDO::FETCH_KEY_PAIR);
    echo json_encode($return_obj);
}

?>
