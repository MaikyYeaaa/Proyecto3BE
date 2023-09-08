<?php
require "helperFunctions.php";

$con = conectarBDD();

$nombre = mysqli_real_escape_string($con, $_POST["nombre"]);
$precio = mysqli_real_escape_string($con, $_POST["precio"]);
$stock = mysqli_real_escape_string($con, $_POST["stock"]);
$img = mysqli_real_escape_string($con, $_POST["imgURL"]);

$sqlMenu = "INSERT INTO `menu` (`Nombre`, `Precio`, `StockReal`, `MenuIMG`) VALUES ('${nombre}','${precio}','${stock}','${img}')";
if (sendToBDD($sqlMenu, $con)) {
    $id = mysqli_insert_id($con);
    $comidas = mysqli_real_escape_string($con, $_POST["comidas"]);
    $comidasArray = explode(',', $comidas);
    foreach($comidasArray as $comida) {
        $sqlIntegra = "INSERT INTO `integra` (`IDComida`, `IDMenu`) VALUES ('${comida}','${id}')";
        if (!sendToBDD($sqlIntegra, $con)) {
            echo "Error en integra query: " . mysqli_error($con);
            break;
        }
    }
} else {
    echo "Error en menu query: " . mysqli_error($con);
}


$con->close();
?>