<?php
require "helperFunctions.php";

$con = conectarBDD();

$nombre = mysqli_real_escape_string($con, $_POST["nombreNuevo"]);
$desc = mysqli_real_escape_string($con, $_POST["descNuevo"]);
$tiempo = mysqli_real_escape_string($con, $_POST["tiempoNuevo"]);
$id = mysqli_real_escape_string($con, $_POST["id"]);
$dieta = mysqli_real_escape_string($con, $_POST["dieta"]);


    $sqlComida = "UPDATE `comida` SET `Nombre`='$nombre',`Descripcion`='$desc',`TiempoCocinado`='$tiempo' WHERE IDComida = {$id}";
    $sqlDieta = "UPDATE `pertenece` SET `IDDieta`='$dieta' WHERE IDComida = $id";

    $responseComida = sendToBDD($sqlComida, $con);
    $responseDieta = sendToBDD($sqlDieta, $con);


$con->close();
?>