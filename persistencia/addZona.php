<?php
require "helperFunctions.php";
$con = conectarBDD();

$barrio = mysqli_real_escape_string($con, $_POST["barrioZona"]);
$direccion = mysqli_real_escape_string($con, $_POST["dirZona"]);

$sql = "INSERT INTO `sucursal` (`Nombre`,`Direccion`) VALUES ('{$barrio}', '{$direccion}')";
$resultado = sendToBDD($sql, $con);
echo $resultado;


$con->close();
?>