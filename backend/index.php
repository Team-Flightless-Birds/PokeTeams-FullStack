<?php
switch (@parse_url($_SERVER['REQUEST_URI'])['path']) {
   case '/':                   // URL (without file name) to a default screen
      http_response_code(404);
      exit('Not Found');
   case '/testDBconnect.php':
      require 'testDBconnect.php';
      break;
   case '/phpRestfulTest.php':
      require 'phpRestfulTest.php';
      break;
   case '/user_login.php':
      require 'user_login.php';
      break;
   case '/user_signup.php':
      require 'user_signup.php';
      break;
   case '/user_teams.php':
      require 'user_teams.php';
      break;
   default:
      http_response_code(404);
      exit('Not Found');
}  
?>