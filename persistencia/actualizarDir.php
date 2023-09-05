<?php
require "helperFunctions.php";

$con = conectarBDD();
$id = mysqli_real_escape_string($con, $_POST["id"]);
$dir = mysqli_real_escape_string($con, $_POST["dir"]);
$sqlCliente = "UPDATE `cliente` SET `Dir`= '{$dir}' WHERE Nro = '{$id}'";

if(sendToBDD($sqlCliente,$con)) {
    echo "true";
} else {
    echo $con->error;
}
$con->close();
?>
