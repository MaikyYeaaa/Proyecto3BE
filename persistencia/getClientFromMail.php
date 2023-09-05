<?php
require "helperFunctions.php";
$con = conectarBDD();

$mail = mysqli_real_escape_string($con, $_POST["mail"]);

$sql = "SELECT `Dir` FROM `cliente` WHERE `Mail` = '{$mail}'";
$resultado = getFromBDD($sql, $con);
echo json_encode($resultado);


$con->close();
?>