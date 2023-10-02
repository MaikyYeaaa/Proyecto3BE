<?php
require "helperFunctions.php";
require "../logica/clases/Sucursal.php";
$con = conectarBDD();

$Name =$_POST["barrioZona"];
$Dir = $_POST["dirZona"];
$zona = new Sucursal(0,$Name,$Dir,0,0); //El tiempo de turno y numero de cocinas debe ser 0, ya que cualquier sucursal que no sea la numero 0 NO ES una sucursal de trabajo, si no un punto de entrega

$sql = "INSERT INTO `sucursal` (`Nombre`,`Direccion`) VALUES ('{$zona->getNombre()}', '{$zona->getDireccion()}')";
$resultado = sendToBDD($sql, $con);
echo $resultado;

$con->close();
?>