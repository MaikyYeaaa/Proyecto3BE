<?php
require "helperFunctions.php";
require "/Clases/Sucursal.php"

$zona= $_POST["zona"];
$jsonURL= '../persistencia/modificarZonas.json';
$zonas= $zona;

if(writeToJSON($jsonURL, $zonas)){
    echo $zona . " añadida correctamente.";
} else {
    echo "Zona no se pudo añadir";
}



?>