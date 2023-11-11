<?php
require "helperFunctions.php";

$con = conectarBDD();

$sql = "SELECT * FROM `dieta`";
$dietas = getFromBDD($sql, $con);

echo json_encode($dietas);

$con->close();


?>