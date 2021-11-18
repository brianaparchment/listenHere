<?php
//TODO: actually submit
if(isset($_POST["submit"])){
  $userInput = array();
  
  $userInput['music_work_ID'] = $_POST["workName"];
  
  foreach (array_keys($_POST) as $key) {
    if (strpos($key, 'duration') !== false) { 
      $userInput['duration'] = $_POST[$key];
    } elseif  (strpos($key, 'tag') !== false) {
      $indices = preg_split('/_/', substr($key, 8));
      $userInput['position'] = $indices[0];
      $userInput['music_tag_ID'] = $_POST[$key];
      music_movement_add($userInput);
    }
  }
}

?>