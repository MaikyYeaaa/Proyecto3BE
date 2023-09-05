<?php
require "helperFunctions.php";

$con = conectarBDD();
$id = mysqli_real_escape_string($con, $_POST["id"]);
$contrasena = mysqli_real_escape_string($con, $_POST["contraNueva"]);
$sql = "UPDATE `usuario` SET `Contrasena`= '{$contrasena}' WHERE IDUser = '{$id}'";
if(sendToBDD($sql,$con)) {
    echo "true";
} else {
    echo $con->error;
}
$con->close();
?>
