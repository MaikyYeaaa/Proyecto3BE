<?php
require "helperFunctions.php";
$con = conectarBDD();

$id = mysqli_real_escape_string($con, $_POST["id"]);

$sqlIntegra = "DELETE FROM integra WHERE IDMenu = ${id}";
sendToBDD($sqlIntegra, $con);

$sqlMenu = "DELETE FROM menu WHERE IDMenu = ${id}";
sendToBDD($sqlMenu, $con);

echo true;

$con->close();
?>