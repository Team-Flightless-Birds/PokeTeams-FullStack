<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">    
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" />  
  <title>PHP test</title>    
</head>

<body>
<div class="container">

  <h1>PHP to DB test</h1>
  
<?php
    require "DBInitializer.php";
    $db = DBInitializer::initUnixDatabaseConnection();
    $dbh->query("use pokeMain");
    $stmt = $pdo->query("SELECT * FROM Users");
    echo "<p>";
    while ($row = $stmt->fetch()) {
        echo $row['email']."<br />\n";
    }
    echo "</p>";
?>

</div>
</body>
</html>