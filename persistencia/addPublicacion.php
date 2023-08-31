<?php
require "helperFunctions.php";
$con = conectarBDD();

$id = mysqli_real_escape_string($con, $_POST["id"]);
$nombre = mysqli_real_escape_string($con, $_POST["nombre"]);
$desc = mysqli_real_escape_string($con, $_POST["desc"]);
$img = mysqli_real_escape_string($con, $_POST["imgURL"]);
$precioNew = mysqli_real_escape_string($con, $_POST["precioDescuento"]);
$precioViejo = mysqli_real_escape_string($con, $_POST["precioViejo"]);
 
$sqlPublicacion = "INSERT INTO `publicacion`(`Nombre`, `FotoURL`, `Descripcion`) VALUES ('{$nombre}','{$img}','{$desc}')";
if(sendToBDD($sqlPublicacion, $con)) {
    $ultimaID = mysqli_insert_id($con);
    
    $sqlIncluye = "INSERT INTO `incluye` (`IDPublicacion`,`IDMenu`) VALUES ('{$ultimaID}','{$id}')";
    if(sendToBDD($sqlIncluye, $con)) {
        $descuento = ($precioNew*100)/$precioViejo;
        $sqlMenu = "UPDATE `menu` SET `Descuento`='{$descuento}' WHERE `IDMenu` = '{$id}'";
        if(sendToBDD($sqlMenu, $con)) {
            echo "true";
        }

    }
}

if ($con->error) {
    echo "Error: " . $con->error;
}

$con->close();
?>