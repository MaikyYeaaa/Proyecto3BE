<?php
require "helperFunctions.php";

$con = conectarBDD();

$id = mysqli_real_escape_string($con, $_POST["id"]);

$sqlPertenece = "DELETE FROM pertenece WHERE IDComida = ".$id;
$sqlInterga = "DELETE FROM integra WHERE IDComida = ".$id;

if(sendToBDD($sqlInterga, $con) && sendToBDD($sqlPertenece, $con)) {

    
    $sqlEliminarComida = "DELETE FROM comida WHERE IDComida = ".$id;
    
    if (sendToBDD($sqlEliminarComida, $con)) {
        echo "eliminado correctamente";
    } else {
        echo "error!! " . $con->error;
    }
} else {
    echo "error!! " . $con->error;
}
    
$con->close();



?>