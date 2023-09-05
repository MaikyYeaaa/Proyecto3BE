<?php
require "helperFunctions.php";

$con = conectarBDD();

$nombre = mysqli_real_escape_string($con, $_POST["nombre"]);
$apellido = mysqli_real_escape_string($con, $_POST["apellido"]);
$contra = mysqli_real_escape_string($con, $_POST["contra"]);
$mail = mysqli_real_escape_string($con, $_POST["mail"]);
$tel = mysqli_real_escape_string($con, $_POST["tel"]);
$direccion = mysqli_real_escape_string($con, $_POST["direccion"]);

$usuario = false;
$cliente = false;
$tipoCliente = false;

$sqlUsuario = "INSERT INTO `usuario`(`IDUser`, `Nombre`, `Contrasena`, `Rol`, `Mail`) VALUES ('NULL','${nombre}','${contra}','NULL','${mail}')";
if(sendToBDD($sqlUsuario, $con)) {
    $usuario = true;
    $id = $con->insert_id; //agarra la ultima id
}


$sqlCliente = "INSERT INTO `cliente` (`Nro`, `Mail`, `Autorizado`, `Dir`) VALUES ('${id}', '${mail}', 'NULL', '${direccion}')";
if(sendToBDD($sqlCliente, $con)) {
    $cliente = true;
}

$tipo = mysqli_real_escape_string($con, $_POST["tipo"]);
if($tipo == "web") {
    $ci = mysqli_real_escape_string($con, $_POST["ci-rut"]);
    $sqlWeb = "INSERT INTO `web`(`Nro`, `CI`, `Nombre`, `Apellido`) VALUES ('${id}','${ci}','${nombre}','${apellido}')";
    if(sendToBDD($sqlWeb, $con)) {
        $tipoCliente = true;
    }
} else {
    $rut = mysqli_real_escape_string($con, $_POST["ci-rut"]);
    $sqlEmpresa = "INSERT INTO `empresa`(`Nro`, `Rut`, `Nombre`) VALUES ('${id}','${rut}','${nombre}')";
    if(sendToBDD($sqlEmpresa, $con)) {
        $tipoCliente = true;
    }
} 

if($cliente && $usuario && $tipoCliente) {
    echo "correcto";
} else {
    echo $con->error;
}


$con->close();


?>