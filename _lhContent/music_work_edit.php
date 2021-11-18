<?php
if(isset($_POST["submit"])){
  $userInput = array();
  $userInput['name'] = $_POST["music_work_name"];
  $userInput['isDuration1'] = $_POST["music_work_isDuration1"];
  $userInput['isDuration3'] = $_POST["music_work_isDuration3"];
  $userInput['isDuration5'] = $_POST["music_work_isDuration5"];
  $userInput['isDuration10'] = $_POST["music_work_isDuration10"];
  $userInput['isDuration15'] = $_POST["music_work_isDuration15"];
  $userInput['isDuration20'] = $_POST["music_work_isDuration20"];
  $userInput['isPrintShort'] = $_POST["music_work_isPrintShort"];
  $userInput['isPrintMedium'] = $_POST["music_work_isPrintMedium"];
  $userInput['isPrintLong'] = $_POST["music_work_isPrintLong"];
  $userInput['comment'] = $_POST["music_work_comment"];

  //music_work_add($work_name, $work_description);
  music_work_add($userInput);
}
  
?>