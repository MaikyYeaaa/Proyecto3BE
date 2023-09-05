<?php
require "helperFunctions.php";

$con = conectarBDD();

$sql = "SELECT `Mail` FROM `cliente` WHERE `Autorizado` = 'NULL'";
$clientes = getFromBDD($sql, $con);
    echo json_encode($clientes);

$con->close();

?>