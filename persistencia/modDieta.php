<?php
require "helperFunctions.php";
$con = conectarBDD();

$id = $_POST["id"];
$dieta = $_POST["dieta"];

$sql = "UPDATE `dieta` SET `Tipodieta`='{$dieta}' WHERE `IDDieta` = {$id}";
$send = sendToBDD($sql, $con);

echo $send;

$con->close();
?>