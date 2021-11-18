<?php

function addScripted($table, $name) {
  //echo 'add';
  echo "<h1>".$name.": Add</h1>";
  include $table.'_form.html';
  echo '<script src="scripts/global.js" async></script>';
  echo '<script src="scripts/'.$table.'.js" async defer onload="'.$table.'_add();"></script>';
  include $table.'_edit.php';
}

function addSimple($table, $name) {
	echo "<h1>".$name.": Add</h1>";
  include $table.'_form.html';
  include $table.'_edit.php';
}

function listPage($table, $name) {
	echo "<h1>".$name.": List</h1>";
	include $table.'_list.html';
	echo '<script src="scripts/global.js" async></script>';
  echo '<script src="scripts/'.$table.'.js" async defer onload="'.$table.'_list();"></script>';
}

function detailPage($table, $name) {
	echo "<h1>".$name.": Detail</h1>";
	include $table.'_list.html';
	echo '<script src="scripts/global.js" async></script>';
  echo '<script src="scripts/'.$table.'.js" async defer onload="'.$table.'_detail();"></script>';
}


?>
