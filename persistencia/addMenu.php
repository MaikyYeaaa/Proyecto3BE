<?php
require "helperFunctions.php";

$con = conectarBDD();

$nombre = mysqli_real_escape_string($con, $_POST["nombre"]);
$precio = mysqli_real_escape_string($con, $_POST["precio"]);
$stock = mysqli_real_escape_string($con, $_POST["stock"]);

$sqlMenu = "INSERT INTO `menu` (`Nombre`, `Precio`, `StockReal`) VALUES ('${nombre}','${precio}','${stock}')";
if (sendToBDD($sqlMenu, $con)) {
    $id = mysqli_insert_id($con);
    $comidas = mysqli_real_escape_string($con, $_POST["comidas"]);
    $comidasArray = explode(',', $comidas);
    foreach($comidasArray as $comida) {
        $sqlIntegra = "INSERT INTO `integra` (`IDComida`, `IDMenu`) VALUES ('${comida}','${id}')";
        sendToBDD($sqlIntegra, $con);
    }
}


$con->close();
?>