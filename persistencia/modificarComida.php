<?php
require "../logica/Clases/Comida.php";


$nombre = $_POST["nombreNuevo"];
$desc = $_POST["descNuevo"];
$tiempo = $_POST["tiempoNuevo"];
$id = $_POST["id"];

$actualizacion = Comida::modComida($nombre, $desc, $tiempo, $id);

echo $actualizacion;

?>