<?php
require('DBInitializer.php');
$db = DBInitializer::initUnixDatabaseConnection();

$method = $_SERVER['REQUEST_METHOD'];
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

if ($method == 'GET') {
    $uid = $_GET['uid'];
    $new_email = $_GET['new_email'];
    $sql_result = $db->prepare("
    SELECT COUNT(*)
    FROM Users
    WHERE email = ?;
    ");
    $sql_result->execute([$new_email]);
    $arr = $sql_result->fetchAll(PDO::FETCH_COLUMN);
    if($arr[0] == 0)
    {
        $sql_result = $db->prepare("
            UPDATE Users
            SET email = ?
            WHERE UID = ?;");
        $sql_result->execute([$new_email, $uid]);
        $return_obj->change_success = true;
        echo json_encode($return_obj);

    }else
    {
        $return_obj->change_success = false;
        echo json_encode($return_obj);
    }



    
}else
{
    http_response_code(400);
}

?>
