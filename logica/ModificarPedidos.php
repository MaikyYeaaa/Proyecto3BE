<?php


$jsonFilePath = '../persistencia/pedidos.json'; 
$jsonData = file_get_contents($jsonFilePath);
$data = json_decode($jsonData, true);


$pos = $_POST["posicion"];
$accion = $_POST["accion"];
$date = $_POST["date"];
$data[$pos]["Estado"] = $accion;
$data[$pos]["FechaInicio"] = $date;

$modifiedJsonData = json_encode($data, JSON_PRETTY_PRINT);

file_put_contents($jsonFilePath, $modifiedJsonData);

?>