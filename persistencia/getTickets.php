<?php
require "helperFunctions.php";

$con = conectarBDD();

$sqlReclamos = "SELECT reclamo.*, cliente.Mail FROM reclamo JOIN realiza ON reclamo.NReclamo = realiza.NReclamo JOIN cliente ON realiza.Nro = cliente.Nro WHERE reclamo.Resuelto = 0";
$reclamos = getFromBDD($sqlReclamos, $con);

echo json_encode($reclamos);

$con->close();
?>