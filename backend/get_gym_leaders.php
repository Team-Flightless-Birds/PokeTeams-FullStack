<?php
require('DBInitializer.php');
$db = DBInitializer::initUnixDatabaseConnection();

$method = $_SERVER['REQUEST_METHOD'];
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

if ($method == 'GET') {
    $type = NULL;
    $badge = NULL;
    $game_name = NULL;
    $name = NULL;

    if(!empty($_GET['type']))
    {
        $type = $_GET['type'];
        if ($type == 'Various')
            $type = "";
    }
        
    if(!empty($_GET['badge']))
        $badge = $_GET['badge'];
    if(!empty($_GET['game_name']))
        $game_name = $_GET['game_name'];
    if(!empty($_GET['leader_name']))
        $name = $_GET['leader_name'];

    $filter_string = "WHERE 1=1 ";

    if ($type)
        $filter_string .= "AND (type LIKE '%$type%' OR type = 'Various') ";
    if($badge)
        $filter_string .= "AND (badge = '$badge') ";
    if($game_name)
        $filter_string .= "AND (game_name LIKE '%$game_name%') ";
    if($name)
        $filter_string .= "AND (name LIKE '%$name%') ";

    $sql_result = $db->prepare("
        SELECT *
        FROM GymLeaders $filter_string;"); 
    $sql_result->execute([]);

}else
{
    http_response_code(400);
}

if (!$sql_result) {
  http_response_code(404);
}else
{
    $return_obj->leaders_filtered = $sql_result->fetchAll(PDO::FETCH_UNIQUE);
    echo json_encode($return_obj);
}

?>
