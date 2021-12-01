<?php
require('DBInitializer.php');
$db = DBInitializer::initUnixDatabaseConnection();

$method = $_SERVER['REQUEST_METHOD'];
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

if ($method == 'GET') {
    $pokemon_type = NULL;
    $search_keyword = NULL;
    $is_fav = NULL;
    $uid = false;

    if(!empty($_GET['type']))
        $pokemon_type = $_GET['type'];
    if(!empty($_GET['keyword']))
        $search_keyword = $_GET['keyword'];
    if(!empty($_GET['is_favorite']))
        $is_fav = $_GET['is_favorite'];
    if(!empty($_GET['uid']))
        $uid = $_GET['uid'];

    if ($pokemon_type)
        $temp_search = "AND (type1 = '$pokemon_type' OR type2 = '$pokemon_type')";
    else
        $temp_search = "";
    if(!$search_keyword)
    {
        $search_keyword = "";
    }
    if(!$pokemon_type)
    {
        $pokemon_type = "";
    }

    if($uid && $is_fav)
    {
        $sql_result = $db->prepare("
        SELECT *
        FROM 
            Pokemon NATURAL JOIN (SELECT poke_name AS pokeindex
            FROM favs
            WHERE UID = ?) AS P
        WHERE name LIKE '%$search_keyword%' $temp_search
        ;"); 
        $sql_result->execute([$uid]);
    }
    else
    {
        $sql_result = $db->prepare("
        SELECT *
        FROM Pokemon
        WHERE name LIKE '%$search_keyword%' $temp_search
        ;");
        $sql_result->execute([]);
    }

}else
{
    http_response_code(400);
}

/*
        SELECT *
        FROM 
            Pokemon NATURAL JOIN (SELECT poke_name AS pokeindex
            FROM favs
            WHERE UID = 3) AS P
        WHERE name LIKE '%s%' 
        ;"
*/

if (!$sql_result) {
  http_response_code(404);
}else
{
    $return_obj->pokemons_filtered = $sql_result->fetchAll(PDO::FETCH_UNIQUE);
    echo json_encode($return_obj);
}

?>
