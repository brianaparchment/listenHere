<?php

  if(isset($_POST["submit"])){

    $userInput = array();
    $userInput['name'] = $_POST["music_tag_name"];
    $userInput['comment'] = $_POST["music_tag_comment"];

    music_tag_add($userInput);
  }
?>
