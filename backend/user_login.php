<?php
require('DBInitializer.php');
$db = DBInitializer::initUnixDatabaseConnection();

$method = $_SERVER['REQUEST_METHOD'];

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
        echo json_encode($login_obj);
    }else
    {
        echo json_encode($login_obj);
    }
}

?>
