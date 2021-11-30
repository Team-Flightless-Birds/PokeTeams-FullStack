<?php
require('DBInitializer.php');
$db = DBInitializer::initUnixDatabaseConnection();

$method = $_SERVER['REQUEST_METHOD'];

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

if ($method == 'GET') {
    $email = $_GET['email'];
    $hashed_password = $_GET['password'];
    $dup_check_sql = $db->prepare("SELECT COUNT(*) FROM Users WHERE email = ?;");

}else
{
    http_response_code(400);
}

// run SQL statement
$dup_check_sql->execute([$email]);

if (!$dup_check_sql) {
  http_response_code(404);
}else
{
    $result_arr = $dup_check_sql->fetchAll(PDO::FETCH_COLUMN);
    
    // no duplicate, proceed to insert 
    if($result_arr[0] == 0)
    {
        $stmt = $db->query("SELECT COUNT(*) AS cnt FROM Users;");
        $users_count = $stmt->fetchAll(PDO::FETCH_COLUMN);
        $UID = $users_count[0]+1;

        $registration_sql = $db->prepare("INSERT INTO Users VALUES(?, ?, ?);");
        $registration_sql->execute([$UID, $email, $hashed_password]);

        $register_obj->duplicate_user = false;
        $register_obj->registration_status = true;
        echo json_encode($register_obj);
    }else
    // duplicate, abort and return
    {
        $register_obj->duplicate_user = true;
        $register_obj->registration_status = false;
        echo json_encode($register_obj);
    }
}

?>
