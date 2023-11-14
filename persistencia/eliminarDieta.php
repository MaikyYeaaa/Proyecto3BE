<?php
require "helperFunctions.php";
$con = conectarBDD();

$id = $_POST["id"];

$sql = "DELETE FROM `dieta` WHERE IDDieta = {$id}";
$send = sendToBDD($sql, $con);

echo $send;

$con->close();
?>