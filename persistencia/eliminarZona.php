<?php
require "helperFunctions.php";
$con = conectarBDD();

$id = mysqli_real_escape_string($con, $_POST["id"]);

$sql = "DELETE FROM `sucursal` WHERE `IDSucursal` = {$id}";
$respuesta = sendToBDD($sql, $con);

echo $respuesta;

$con->close();
?>