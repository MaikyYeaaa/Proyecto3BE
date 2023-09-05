<?php
require "helperFunctions.php";

$con = conectarBDD();
$id = mysqli_real_escape_string($con, $_POST["id"]);
$mail = mysqli_real_escape_string($con, $_POST["mail"]);
$sql = "UPDATE `usuario` SET `Mail`= '{$mail}' WHERE IDUser = '{$id}'";
if(sendToBDD($sql,$con)) {
    $sqlCliente = "UPDATE `cliente` SET `Mail`= '{$mail}' WHERE Nro = '{$id}'";
    if(sendToBDD($sqlCliente,$con)) {
        echo "true";
    } else {
        echo $con->error;
    }
} else {
    echo $con->error;
}
$con->close();
?>
