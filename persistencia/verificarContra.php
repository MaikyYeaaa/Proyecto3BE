<?php
require "helperFunctions.php";

$con = conectarBDD();
$id = mysqli_real_escape_string($con, $_POST["id"]);

$contrasena = mysqli_real_escape_string($con, $_POST["contraVieja"]);
$sql = "SELECT * FROM `usuario` WHERE IDUser = '{$id}' AND Contrasena = '{$contrasena}'";
$usuario = getFromBDD($sql, $con);
if(empty($usuario)){
    echo false;
}else{
    echo true;
}
$con->close();
?>

