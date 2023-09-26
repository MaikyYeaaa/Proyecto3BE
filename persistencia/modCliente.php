<?php
require "helperFunctions.php";

$con = conectarBDD();

$mail = mysqli_real_escape_string($con, $_POST["mail"]);
$valor = mysqli_real_escape_string($con, $_POST["valor"]);

if($valor === "confirmar") {
    $sql = "UPDATE `cliente` SET `Autorizado`='SI' WHERE Mail = '${mail}'";
} else{
    $sql = "UPDATE `cliente` SET `Autorizado`='NO' WHERE Mail = '${mail}'";
}

if (sendToBDD($sql, $con)) {
    echo "success";
}

if ($con->error) {
    die($con->error);
}

$con->close();
?>