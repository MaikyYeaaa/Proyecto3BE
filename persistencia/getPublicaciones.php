<?php
require "helperFunctions.php";
$con = conectarBDD();

$publicaciones = getFromBDD("SELECT * FROM `publicacion`", $con);

echo json_encode($publicaciones);

$con->close();
?>