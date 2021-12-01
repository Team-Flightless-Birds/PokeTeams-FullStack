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
    SELECT name, url
    FROM 
        Pokemon NATURAL JOIN (SELECT poke_name AS pokeindex
        FROM favs
        WHERE UID = ?) AS P
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
    $return_obj->fav_pokemons = $sql_result->fetchAll(PDO::FETCH_KEY_PAIR);
    echo json_encode($return_obj);
}

?>
