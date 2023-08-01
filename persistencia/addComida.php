<?php
require "helperFunctions.php";

$con = conectarBDD();

$nombre_comida = mysqli_real_escape_string($con, $_POST["nombre"]);
$descripcion = mysqli_real_escape_string($con, $_POST["desc"]);
$dieta = mysqli_real_escape_string($con, $_POST["dieta"]);
$imagenURL = mysqli_real_escape_string($con, $_POST["imgURL"]);
$tiempoCocinado = mysqli_real_escape_string($con, $_POST["tiempoCocinado"]);

$sqlDieta = "SELECT * FROM `dieta` WHERE Tipodieta = '" . $dieta . "'";
$dietaData = getFromBDD($sqlDieta, $con);
$idDieta = $dietaData[0]["IDDieta"]; //  output: la id de la dieta que ingreso el usuario (ej: 1)

$sqlCrearComida = "INSERT INTO `comida` (`IDComida`, `Nombre`, `Descripcion`, `ImagenURL`, `TiempoCocinado`) VALUES (NULL, '" . $nombre_comida . "', '" . $descripcion . "', '" . $imagenURL . "', '" . $tiempoCocinado . "')";
sendToBDD($sqlCrearComida, $con);

$sqlComida = "SELECT * FROM `comida` WHERE Nombre = '".$nombre_comida."'";
$comidaData = getFromBDD($sqlComida, $con);
$idComida = $comidaData[0]["IDComida"];

$sqlRelacion = "INSERT INTO `pertenece` (`IDComida`, `IDDieta`) VALUES ('".$idComida."','".$idDieta."')";
sendToBDD($sqlRelacion, $con);
echo "relacion creada correctamente";


$con->close();


?>
