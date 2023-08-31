<?php
require "helperFunctions.php";
$con = conectarBDD();

$platos = mysqli_real_escape_string($con, $_POST["platosIDs"]);

$sql = "SELECT `Nombre` FROM `comida` WHERE `IDComida` IN (${platos})";

$platosNombres = getFromBDD($sql, $con);

echo json_encode($platosNombres);

$con->close();
?>