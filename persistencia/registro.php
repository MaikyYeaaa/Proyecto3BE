<?php
require "helperFunctions.php";

ini_set('display_errors', 0);
ini_set('log_errors', 1);

$con = conectarBDD();

$nombre = mysqli_real_escape_string($con, $_POST["nombre"]);
$mail = mysqli_real_escape_string($con, $_POST["mail"]);
$contra = mysqli_real_escape_string($con, $_POST["contrasena"]);
$direccion = mysqli_real_escape_string($con, $_POST["dir"]);
$tipo = mysqli_real_escape_string($con, $_POST["cliente"]);
$cedula = mysqli_real_escape_string($con, $_POST["cedula"]);

if($nombre == "" || $mail == "" || $contra == "" || $direccion == "" || $tipo == "") {
    echo "error: a php le llegan datos vacios";
} else {
    $sqlUsuario = "INSERT INTO `usuario`(`IDUser`, `Nombre`, `Contrasena`, `Rol`, `Mail`) VALUES (NULL, '".$nombre."', '".$contra."', '".$tipo."', '".$mail."')";
    if (sendToBDD($sqlUsuario, $con)) {
        echo "usuario registrado";
        $sqlNormal = "INSERT INTO `cliente`(`Nro`, `Mail`, `Autorizado`, `Dir`) VALUES (NULL, '".$mail."', NULL, '".$direccion."')";
        if (sendToBDD($sqlNormal, $con)) {
            echo "cliente registrado!";
        } else {
            echo "error registrando cliente!";
        }
    } else {
        echo "error registrando usuario!";
    }

    if($tipo == "normal") {
    $apellido = mysqli_real_escape_string($con, $_POST["apellido"]);
    $sqlWeb = "INSERT INTO `web`(`Nro`, `CI`, `Nombre`, `Apellido`) VALUES (NULL, '".$cedula."', '".$nombre."', '".$apellido."')";
     if (sendToBDD($sqlWeb, $con)) {
        echo "cliente web registrado correctamente";
     } else {
        echo "cliente web error";
     }
 } else {
    //aca va lo de empresa
 }

}
$con->close();


?>
