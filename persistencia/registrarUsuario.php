<?php
require "helperFunctions.php";

$con = conectarBDD();

$nombre = mysqli_real_escape_string($con, $_POST["nombre"]);
$apellido = mysqli_real_escape_string($con, $_POST["apellido"]);
$contra = mysqli_real_escape_string($con, $_POST["contra"]);
$mail = mysqli_real_escape_string($con, $_POST["mail"]);
$tel = mysqli_real_escape_string($con, $_POST["tel"]);
$direccion = mysqli_real_escape_string($con, $_POST["direccion"]);

$sqlUsuario = "INSERT INTO `usuario`(`IDUser`, `Nombre`, `Contrasena`, `Rol`, `Mail`) VALUES ('NULL','${nombre}','${contra}','NULL','${mail}')";
if(sendToBDD($sqlUsuario, $con)) {
    echo "user registrado";
    $id = $con->insert_id; //agarra la ultima id
}


$sqlCliente = "INSERT INTO `cliente` (`Nro`, `Mail`, `Autorizado`, `Dir`) VALUES ('${id}', '${mail}', 'NULL', '${direccion}')";
if(sendToBDD($sqlCliente, $con)) {
    echo "cliente registrado";
}

$tipo = mysqli_real_escape_string($con, $_POST["tipo"]);
if($tipo == "web") {
    $ci = mysqli_real_escape_string($con, $_POST["ci-rut"]);
    $sqlWeb = "INSERT INTO `web`(`Nro`, `CI`, `Nombre`, `Apellido`) VALUES ('${id}','${ci}','${nombre}','${apellido}')";
    if(sendToBDD($sqlWeb, $con)) {
        echo "web registrado";
    }
} else {
    $rut = mysqli_real_escape_string($con, $_POST["ci-rut"]);
    $sqlEmpresa = "INSERT INTO `empresa`(`Nro`, `Rut`, `Nombre`) VALUES ('${id}','${rut}','${nombre}')";
    if(sendToBDD($sqlEmpresa, $con)) {
        echo "emp registrado";
    }
} // DEPENDIENDO DEL TIPO, LE PIDO UNA O LA OTRA




$con->close();


?>