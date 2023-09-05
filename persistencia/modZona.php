<?php
require "helperFunctions.php";
$con = conectarBDD();

$id = mysqli_real_escape_string($con, $_POST["id"]);
$nombre = mysqli_real_escape_string($con, $_POST["nombreChange"]);
$dir = mysqli_real_escape_string($con, $_POST["dirChange"]);

$sql = "UPDATE `sucursal` SET `Nombre` = '{$nombre}', `Direccion` = '{$dir}' WHERE `IDSucursal` = {$id}";
$respuesta = sendToBDD($sql, $con);

echo $respuesta;

$con->close();
?>