<div id="music_tag">
  <h1><span id="tableName"><a href="index.php?m=music_tag">Music Tag</a></span>
  <span id="tableView"></span></h1>


<div id="list">
  <div class="listLabel"><span class="name">Name</span>
  <span class="comment">Comment</span>
  <div class="addButton" id="music_tag_add">New</div>
  </div>
  <div id="music_tag_list"></div>
</div>

<div id="edit" style="display:none">
  <form action="" method="post">

  <div class="section"><label>Name:</label>
  <input type="text" name="music_tag_name" id="music_tag_name" required="required" placeholder="Please Enter Name"/></div>
  <div class="section"><label>Comment:</label><br/>
  <textarea name="music_tag_comment" id="music_tag_comment" required="required" placeholder="Describe this tag"></textarea></div>
  <input type="submit" value=" Submit " name="submit" id="submit"/>

  </form>
</div>

<div id="detail" style="display:none">
  <div class="section"><span class="label">Name: </span><span class="name" id="detailName"></span></div>
  <div class="section"><div class="label">Comment: </div><div class="comment" id="detailComment"></div></div>
</div>

</div>

<?php

  if(isset($_POST["submit"])){

    $userInput = array();
    $userInput['name'] = $_POST["music_tag_name"];
    $userInput['comment'] = $_POST["music_tag_comment"];

    music_tag_add($userInput);
  }
?>