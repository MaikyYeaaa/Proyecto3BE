<?php
require "helperFunctions.php";
$con = conectarBDD();

$sql = "SELECT * FROM `sucursal`";
$respuesta = getFromBDD($sql, $con);

echo json_encode($respuesta);

$con->close();
?>