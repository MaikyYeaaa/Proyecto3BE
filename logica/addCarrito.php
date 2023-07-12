<?php
require './helperFunctions.php';
$id = $_POST["id"];
$arrayData[] = $id; 
$jsonURL = '../persistencia/carrito.json';

$resultado = writeToJSON($jsonURL, $arrayData);
var_dump($resultado)
?>