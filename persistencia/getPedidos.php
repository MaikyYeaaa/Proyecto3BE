<?php
require "helperFunctions.php";
$con = conectarBDD();


$sql = "SELECT * FROM `tiene` WHERE NombreEstado = 'Solicitado'";


$pedidos = getFromBDD($sql, $con);

echo json_encode($pedidos);

$con->close();
?>