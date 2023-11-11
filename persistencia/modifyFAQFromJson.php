<?php
$jsonFilePath = '../persistencia/faq.json';
$jsonData = file_get_contents($jsonFilePath);
$jsonArray = json_decode($jsonData, true);
$preguntaAModificar = $_POST["id"]; 
$nuevoTitulo = $_POST["titulo"]; 
$nuevaDescripcion = $_POST["descripcion"]; 

    $jsonArray[$preguntaAModificar]["titulo"] = $nuevoTitulo;
    $jsonArray[$preguntaAModificar]["descripcion"] = $nuevaDescripcion;
    $modifiedJsonData = json_encode($jsonArray, JSON_PRETTY_PRINT);
    file_put_contents($jsonFilePath, $modifiedJsonData);

    echo json_encode($jsonArray[$preguntaAModificar]); 

?>