<?php
require "helperFunctions.php";

$con = conectarBDD();

$id = mysqli_real_escape_string($con, $_POST["id"]);
$valor = mysqli_real_escape_string($con, $_POST["valor"]);

if($valor === "confirmar") {
    $sql = "UPDATE `cliente` SET `Autorizado`='SI' WHERE Mail = '${id}'";
} else{
    $sql = "UPDATE `cliente` SET `Autorizado`='NO' WHERE Mail = '${id}'";
}

sendToBDD($sql, $con);

$con->close();
?>