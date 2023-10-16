<?php
require "helperFunctions.php";
$con = conectarBDD();


$sql = "SELECT * FROM `usuario`";
$resultado = getFromBDD($sql, $con);
echo json_encode($resultado);


$con->close();
?>