<?php
require('DBLoginReadOnly.php');
$db = DBLoginReadOnly::initUnixDatabaseConnection();

$method = $_SERVER['REQUEST_METHOD'];
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

if ($method == 'GET') {
    $email = $_GET['email'];
    $hashed_password = $_GET['password'];
    $sql_result = $db->prepare("SELECT COUNT(*) FROM Users WHERE email = ? AND password =?;");
}else
{
    http_response_code(400);
}

// run SQL statement
$sql_result->execute([$email, $hashed_password]);

if (!$sql_result) {
  http_response_code(404);
}else
{
    $result_arr = $sql_result->fetchAll(PDO::FETCH_COLUMN);
    $login_obj->login_success = false;
    
    if($result_arr[0] > 0)
    {
        $login_obj->login_success = true;
        $sql_result = $db->prepare("SELECT DISTINCT UID FROM Users WHERE email = ?;");
        $sql_result->execute([$email]);
        $arr = $sql_result->fetchAll(PDO::FETCH_COLUMN);
        $login_obj->uid = $arr[0];
        echo json_encode($login_obj);
    }else
    {
        echo json_encode($login_obj);
    }
}

// gcloud app deploy backend/backend.yml

?>
