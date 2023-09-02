<?php
require "helperFunctions.php";

$con = conectarBDD();
$id = mysqli_real_escape_string($con, $_POST["id"]);
$contrasena = mysqli_real_escape_string($con, $_POST["contraVieja"]);
$sql = "SELECT * FROM `usuario` WHERE IDUser = '{$id}' AND Contrasena = '{$contrasena}'";
$usuario = getFromBDD($sql, $con);
echo json_encode($usuario);

if($usuario == array()){
    echo "anda";
}else{
 echo "no anda";
}
$con->close();
?>

