<?php
require "helperFunctions.php";
$con = conectarBDD();


$sql = "SELECT * FROM `tiene` WHERE NombreEstado = 'Solicitado' ORDER BY ID ASC;";


$pedidos = getFromBDD($sql, $con);

echo json_encode($pedidos);

$con->close();
?>