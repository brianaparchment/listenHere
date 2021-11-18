<!DOCTYPE html>
<html>
<head>
<title>Tutorial Form</title>
<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>


<div id="login">
<h1>Music Type</h1>
<hr/>
<form action="" method="post">
<label>Name:</label>
<input type="text" name="music_type_name" id="music_type_name" required="required" placeholder="Please Enter Name"/><br /><br />
<label>Comment:</label>
<input type="text" name="music_type_comment" id="music_type_comment" required="required" placeholder="Describe this type"/><br/><br />
<input type="submit" value=" Submit " name="submit"/><br />
</form>
</div>


<?php

$path = '../../../backend/';
require_once($path.'connect.php');

if(isset($_POST["submit"])){
  
  $conn = connect();

  try {

    $sql = $conn->prepare("INSERT INTO music_type (type_name, type_description) VALUES (:type_name, :type_description)");
    $sql->bindParam(':type_name', $type_name);
    $sql->bindParam(':type_description', $type_description);

    // from https://www.yogeshchauhan.com/learn-to-make-a-simple-contact-us-form-using-php-and-pdo-mysql/
    /*$type_name = clean($_POST["music_type_name"]);
    $type_description = clean($_POST["music_type_comment"]);*/

    $type_name = $_POST["music_type_name"];
    $type_description = $_POST["music_type_comment"];

    if ($sql->execute()) {
      echo "<script type= 'text/javascript'>alert('New Record Inserted Successfully');</script>";
    }
    else{
      echo "<script type= 'text/javascript'>alert('Data not successfully Inserted.');</script>";
    }

    $conn = null;//*/
  }
  catch(PDOException $e)
  {
    echo $e->getMessage();
  }
}//*/
?>

</body>
</html>
