<?php
require "helperFunctions.php";

$con = conectarBDD();

$nombre = mysqli_real_escape_string($con, $_POST["nombreNuevo"]);
$desc = mysqli_real_escape_string($con, $_POST["descNuevo"]);
$tiempo = mysqli_real_escape_string($con, $_POST["tiempoNuevo"]);
$id = mysqli_real_escape_string($con, $_POST["id"]);

$camposActualizar = [];

if(!empty($nombre)) {
    $camposActualizar[] = "Nombre = '{$nombre}'";
}
if(!empty($desc)) {
    $camposActualizar[] = "Descripcion = '{$desc}'";
}
if (!empty($tiempo)) {
    $camposActualizar[] = "TiempoCocinado = '{$tiempo}'";
}

if(!empty($camposActualizar)) {
    $sql = "UPDATE `comida` SET " . implode(", ", $camposActualizar) . " WHERE IDComida = {$id}";
    sendToBDD($sql, $con);
    echo true;
} else {
    echo "debe ingresar datos";
}

$con->close();
?>