<?php
require "helperFunctions.php";
$con = conectarBDD();

$id = mysqli_real_escape_string($con, $_POST["id"]);

$publicaciones = getFromBDD("SELECT `Rol` FROM `usuario` WHERE `IDUser` =  '{$id}'", $con);

echo json_encode($publicaciones);

$con->close();
?>