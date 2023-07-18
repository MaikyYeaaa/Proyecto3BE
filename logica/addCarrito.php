<?php
require './helperFunctions.php';
$id = $_POST["id"];

$newItem = [
    "id" => $id
];

$arrayData = $newItem;
$jsonURL = '../persistencia/carrito.json';

$resultado = writeToJSON($jsonURL, $arrayData);
var_dump($resultado)
?>