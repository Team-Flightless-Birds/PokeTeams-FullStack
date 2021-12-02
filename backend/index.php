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
   case '/following.php':
      require 'following.php';
      break;
   case '/get_fav_pokemon.php':
      require 'get_fav_pokemon.php';
      break;
   case '/get_pokemons.php':
      require 'get_pokemons.php';
      break;
   case '/get_teams_by_uid.php':
      require 'get_teams_by_uid.php';
      break;
   case '/add_following.php':
      require 'add_following.php';
      break;
   case '/del_following.php':
      require 'del_following.php';
      break;
   case '/get_pokemons_by_tid.php':
      require 'get_pokemons_by_tid.php';
      break;
   case '/add_fav_pokemon.php':
      require 'add_fav_pokemon.php';
      break;
   case '/del_fav_pokemon.php':
      require 'del_fav_pokemon.php';
      break;
   case '/get_all_not_following.php':
      require 'get_all_not_following.php';
      break;
   case '/create_user_team.php':
      require 'create_user_team.php';
      break;
   case '/add_pokemon_to_team.php':
      require 'add_pokemon_to_team.php';
      break;
   case '/get_pokemons_in_team.php':
      require 'get_pokemons_in_team.php';
      break;
   case '/update_team_name.php':
      require 'update_team_name.php';
      break;
   case '/uid_to_email.php':
      require 'uid_to_email.php';
      break;
   case '/delete_team.php':
      require 'delete_team.php';
      break;
   case '/get_gym_leaders.php':
      require 'get_gym_leaders.php';
      break;
   case '/get_pokemons_in_team2.php':
      require 'get_pokemons_in_team2.php';
      break;
   default:
      http_response_code(404);
      exit('Not Found');
}  
?>