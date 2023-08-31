<?php
require "helperFunctions.php";
$con = conectarBDD();

$ids = mysqli_real_escape_string($con, $_POST["ids"]);

$sql = "SELECT `Nombre` FROM `comida` WHERE `IDComida` IN ({$ids})";
$Nombres = getFromBDD($sql, $con);

echo json_encode($Nombres);

?>