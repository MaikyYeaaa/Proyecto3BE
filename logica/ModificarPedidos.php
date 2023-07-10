<?php


$jsonFilePath = '../persistencia/pedidos.json'; 
$jsonData = file_get_contents($jsonFilePath);
$data = json_decode($jsonData, true);


$pos = $_POST["posicion"];
$accion = $_POST["accion"];
$data[$pos]["Estado"] = $accion;

$modifiedJsonData = json_encode($data, JSON_PRETTY_PRINT);

file_put_contents($jsonFilePath, $modifiedJsonData);

?>