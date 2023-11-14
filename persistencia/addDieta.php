<?php
require "helperFunctions.php";
$con = conectarBDD();

$dieta = $_POST["dieta"];

$sql = "INSERT INTO `dieta` (`Tipodieta`) VALUES ('{$dieta}')";
$send = sendToBDD($sql, $con);

echo $send;

$con->close();
?>