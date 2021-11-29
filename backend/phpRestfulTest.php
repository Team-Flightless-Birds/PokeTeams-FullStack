<?php
require('DBInitializer.php');
$db = DBInitializer::initUnixDatabaseConnection();

$method = $_SERVER['REQUEST_METHOD'];
//$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));

switch ($method) {
    case 'GET':
      $name = $_GET['name'];
      $sth = $db->prepare("SELECT * FROM Pokemon WHERE name = ?");
      break;
    case 'POST':
      // $name = $_POST["name"];
      // $email = $_POST["email"];
      // $country = $_POST["country"];
      // $city = $_POST["city"];
      // $job = $_POST["job"];

      // $sql = "insert into contacts (name, email, city, country, job) values ('$name', '$email', '$city', '$country', '$job')"; ````````````````````````````````
      break;
}

// run SQL statement

$sth->execute([$name]);

// die if SQL statement failed
if (!$sth) {
  http_response_code(404);
  //die(mysqli_error($con));
}

if ($method == 'GET') {

    $rows_retrieved = $sth->fetch();
    echo json_encode($rows_retrieved);

  } elseif ($method == 'POST') {

    //echo json_encode($result);

  } else {

    //echo mysqli_affected_rows($con);

  }
?>
