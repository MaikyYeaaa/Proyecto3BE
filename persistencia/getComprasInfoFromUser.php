<?php
require "helperFunctions.php";

$userID = $_POST["userId"];


$con = conectarBDD();

$sql = "SELECT * FROM `pide` WHERE Nro = $userID";
$pedidos = getFromBDD($sql, $con);

echo json_encode($pedidos);

$con->close();


?>