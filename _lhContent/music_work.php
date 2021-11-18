<div id="music_work">
<h1><span id="tableName"><a href="index.php?m=music_work">Music Work</a></span>
  <span id="tableView"></span></h1>

<div id="list">
  <div class="listLabel">
    <span class="name">Name</span>
    <span class="shortInfo, duration">Duration</span>
    <span class="shortInfo, print">Print</span>
    <span class="comment">Comment</span>
    <div class="addButton" id="music_work_add">New</div>
  </div>
  <div id="music_work_list"></div>
</div>

<div id="edit" style="display:none">
  <form action="" method="post">

  <div class="section"><label>Name:</label>
  <input type="text" name="music_work_name" id="music_work_name" required="required" placeholder="Please Enter Name"/></div>
  
  <div class="section">
    <label>Duration:</label>
    <label class="check">1
      <input type="hidden" name="music_work_isDuration1" value="0">
      <input type="checkbox" name="music_work_isDuration1" value ="1" id="music_work_isDuration1">
      <span class="checkmark"></span>
    </label>
    <label class="check">3
      <input type="hidden" name="music_work_isDuration3" value="0">
      <input type="checkbox" name="music_work_isDuration3" value="1" id="music_work_isDuration3">
      <span class="checkmark"></span>
    </label>
    <label class="check">5
      <input type="hidden" name="music_work_isDuration5" value="0">
      <input type="checkbox" name="music_work_isDuration5" value="1" id="music_work_isDuration5">
      <span class="checkmark"></span>
    </label>
    <label class="check">10
      <input type="hidden" name="music_work_isDuration10" value="0">
      <input type="checkbox" name="music_work_isDuration10" value="1" id="music_work_isDuration10">
      <span class="checkmark"></span>
    </label>
    <label class="check">15
      <input type="hidden" name="music_work_isDuration15" value="0">
      <input type="checkbox" name="music_work_isDuration15" value="1" id="music_work_isDuration15">
      <span class="checkmark"></span>
    </label>
    <label class="check">20
      <input type="hidden" name="music_work_isDuration20" value="0">
      <input type="checkbox" name="music_work_isDuration20" value="1" id="music_work_isDuration20">
      <span class="checkmark"></span>
    </label>
  </div>

  <div class="section">
    <label>Print Duration: </label>
    <label class="check">Short
      <input type="hidden" name="music_work_isPrintShort" value="0">
      <input type="checkbox" name="music_work_isPrintShort" value="1" id="music_work_isPrintShort">
      <span class="checkmark"></span>
    </label>
    <label class="check">Medium
      <input type="hidden" name="music_work_isPrintMedium" value="0">
      <input type="checkbox" name="music_work_isPrintMedium" value="1" id="music_work_isPrintMedium">
      <span class="checkmark"></span>
    </label>
    <label class="check">Long
      <input type="hidden" name="music_work_isPrintLong" value="0">
      <input type="checkbox" name="music_work_isPrintLong" value="1" id="music_work_isPrintLong">
      <span class="checkmark"></span>
    </label>
  </div>

  <div class="section"><label>Comment:</label><br/>
     <textarea name="music_work_comment" id="music_work_comment" required="required" placeholder="Describe this work"></textarea></div>
    <input type="submit" value=" Submit " name="submit" id="submit"/>
  </div>

  </form>
</div>

<div id="detail" style="display:none">
  <div class="section"><span class="label">Name: </span><span class="name" id="detail_name"></span></div>
  <div class="section"><div class="label">Duration(s): </div>
    <input type="checkbox" disabled readonly id="detail_isDuration1">
    <input type="checkbox" disabled readonly id="detail_isDuration3">
    <input type="checkbox" disabled readonly id="detail_isDuration5">
    <input type="checkbox" disabled readonly id="detail_isDuration10">
    <input type="checkbox" disabled readonly id="detail_isDuration15">
    <input type="checkbox" disabled readonly id="detail_isDuration20">
  </div>
  <div class="section"><div class="label">Print Duration(s): </div>
    <input type="checkbox" disabled readonly id="detail_isPrintShort">
    <input type="checkbox" disabled readonly id="detail_isPrintMedium">
    <input type="checkbox" disabled readonly id="detail_isPrintLong">
  </div>
  <div class="section"><div class="label">Comment: </div><div class="comment" id="detail_comment"></div></div>
</div>

</div>

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
