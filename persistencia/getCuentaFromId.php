<?php
require "helperFunctions.php";
$con = conectarBDD();

$id = mysqli_real_escape_string($con, $_POST["id"]);

$sql = "SELECT * FROM `usuario` WHERE `IDUser` = {$id}";
$resultado = getFromBDD($sql, $con);
echo json_encode($resultado);


$con->close();
?>