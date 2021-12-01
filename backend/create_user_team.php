<?php
require('DBInitializer.php');
$db = DBInitializer::initUnixDatabaseConnection();

$method = $_SERVER['REQUEST_METHOD'];
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

if ($method == 'GET') {
    $uid = $_GET['uid'];
    $team_name = $_GET['team_name'];

    $sql_result = $db->prepare("
    SELECT COUNT(*) AS cnt FROM Teams;");
}else
{
    http_response_code(400);
}



// run SQL statement
$sql_result->execute([]);

if (!$sql_result) {
  http_response_code(404);
}else
{
    $teams_count = $sql_result->fetchAll(PDO::FETCH_COLUMN);
    $TID = $teams_count[0]+1;
    $sql_result = $db->prepare("
    INSERT INTO has (TID, UID)
    VALUES (?, ?);");
    $successful_insert = $sql_result->execute([$TID, $uid]);

    $sql_result = $db->prepare("
    INSERT INTO Teams (TID, name)
    VALUES (?, ?);");
    $successful_insert = $sql_result->execute([$TID, $team_name]);

    $return_obj->tid = $TID;
    echo json_encode($return_obj);
}

?>
