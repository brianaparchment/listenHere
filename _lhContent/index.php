<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd">
<html>
<head>
	<meta http-equiv="content-type" content="text/html;charset=iso-8859-1">
	<!--<meta name="description" content="The Website of INF 465: Programming for Informatics.">-->
	<title>Listening Here Content</title>
	<!--<meta name="Author" content="Cristyn Magnus">
	<meta name="KEYWORDS" content="Cristyn Magnus, Informatics, INF 465">-->
	<link rel="STYLESHEET" type="text/css" href="content.css">
</head>
<body>

<?php
	include 'header.html';
?>

<div class="content">

<?php

$path = "../_lhDatabase/";
require_once($path."db_interface.php");//*/

//main menu

if (preg_match('/(\w+)/', $_REQUEST['m'], $item)) {
	
	// ----- Music Work ----- //
	if ($item[0] == "music_work") {
		include 'music_work.php';
		echo '<script src="scripts/table.js"></script>';
		echo '<script src="scripts/music_work.js" async></script>';
	}
	/*if ($item[0] == "music_work_list") {	
		listPage("music_work", "Music Work");

	} else if ($item[0] == "music_work_add") {
		addSimple("music_work", "Music Work");

	} else if ($item[0] == "music_work_detail") {
		echo "<h1>Music Work: Detail</h1>";

	} else if ($item[0] == "music_work_edit") {
		echo "<h1>Music Work: Edit</h1>";

	} else if ($item[0] == "music_work_del") {
		echo "<h1>Music Work: Delete</h1>";
		include 'menu.html';
	} */
	
	// ----- Music Tag ----- //
	else if ($item[0] == "music_tag") {
		include 'music_tag.php';
		echo '<script src="scripts/table.js"></script>';
		echo '<script src="scripts/music_tag.js" async></script>';
	}
	/*else if ($item[0] == "music_tag_list") {
		listPage("music_tag", "Music Tag");

	} else if ($item[0] == "music_tag_add") {
		addSimple("music_tag", "Music Tag");

	} else if ($item[0] == "music_tag_detail") {
		echo "<h1>Music Tag: Detail</h1>";
		
	} else if ($item[0] == "music_tag_edit") {
		echo "<h1>Music Tag: Edit</h1>";
		include 'music_tag_form.html';
		echo '<script src="scripts/music_tag_edit.js" async></script>';
		include 'music_tag_edit.php';

	} else if ($item[0] == "music_tag_del") {
		echo "<h1>Music Tag: Delete</h1>";
		include 'menu.html';
	} */
	
	// ----- Music Movement ----- //
  
/*
	else if ($item[0] == "music_movement_list") {
		echo "<h1>Music Movement: List</h1>";

	} else if ($item[0] == "music_movement_add") {
		addScripted("music_movement", "Music Movement");

	} else if ($item[0] == "music_movement_detail") {
		echo "<h1>Music Movement: Detail</h1>";

	} else if ($item[0] == "music_movement_edit") {
		echo "<h1>Music Movement: Edit</h1>";
		/*if (preg_match('/(\w+)/', $_REQUEST['i'], $record) {
		
			include 'music_movement_form.html';
			echo '<script src="scripts/global.js" async></script>';
			//echo '<script src="scripts/music_movement.js" async defer onload="musicMovement = new MusicMovement(); musicMovement.init(\'edit\');"></script>';
			echo '<script src="scripts/music_movement.js" async defer onload="music_movement_edit('.$record.');"></script>';
			include 'music_movement_edit.php';

		}*/
	/*} else if ($item[0] == "music_movement_del") {
		echo "<p>Delete Movement Placeholder</p>";
		include 'menu.html';
	} */
	
	else if ($item[0] == 'menu') {
		include 'menu.html';
	}
} else include 'menu.html';
//*/
?>

</div><!--main-->

</body>
</html>
