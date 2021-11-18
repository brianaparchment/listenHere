<?php

$path = "../backend/";
require_once($path."db_interface.php"); //*/

//https://stackoverflow.com/questions/18866571/receive-json-post-with-php/39508364#39508364
$data = json_decode(file_get_contents('php://input'), true);

// to debug php posts:
// https://stackoverflow.com/questions/11109298/debug-and-inspect-post
//file_put_contents( 'debug' . time() . '.log', var_export( $data, true));

//music_tag_delete($data["id"]);
delete($data["table"], $data["id"]);

?>