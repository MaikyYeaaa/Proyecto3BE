<?php
require "helperFunctions.php";

$con = conectarBDD();

$sqlIntegra = "SELECT * FROM `integra` ORDER BY `integra`.`IDMenu` ASC";
$comidas = getFromBDD($sqlIntegra, $con);

echo json_encode($comidas);

$con->close();
?>