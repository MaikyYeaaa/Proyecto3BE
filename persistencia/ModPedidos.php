<?php
require "helperFunctions.php";

$con = conectarBDD();

$pos = $_POST["posicion"];
$accion = $_POST["accion"];


$sql = "UPDATE `tiene` SET `NombreEstado`='$accion' WHERE ID = $pos";

$data = sendToBDD($sql, $con);


echo json_encode($data);
$con->close();

?>