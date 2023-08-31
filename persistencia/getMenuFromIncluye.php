<?php
require "helperFunctions.php";
$con = conectarBDD();

$idPubli = mysqli_real_escape_string($con, $_POST['idPubli']);

$sql = "SELECT `IDMenu` FROM `incluye` WHERE `IDPublicacion` = {$idPubli}";
$idMenu = getFromBDD($sql, $con);

echo json_encode($idMenu);

$con->close();
?>