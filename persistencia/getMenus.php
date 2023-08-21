<?php
require "helperFunctions.php";
$con = conectarBDD();
$sqlComida = "SELECT * FROM `menu`";
$comidaData = getFromBDD($sqlComida, $con);
echo json_encode($comidaData);

$con->close();


?>