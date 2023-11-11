<?php
require "helperFunctions.php";
$con = conectarBDD();

$id = mysqli_real_escape_string($con, $_POST["id"]);
$nombre = mysqli_real_escape_string($con, $_POST["nombreNuevo"]);
$stock = mysqli_real_escape_string($con, $_POST["stockNuevo"]);
$precio = mysqli_real_escape_string($con, $_POST["precioNuevo"]);

$sql = "UPDATE `menu` SET `Nombre`='{$nombre}', `Precio`='{$precio}', `StockReal`='{$stock}' WHERE `IDMenu` = {$id}";
if (sendToBDD($sql, $con)) {
    echo true;
} else {
    echo false;
}

$con->close();
?>