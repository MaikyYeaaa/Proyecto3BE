<?php
// Load the JSON data from the file
$jsonFilePath = '../persistencia/faq.json';
$jsonData = file_get_contents($jsonFilePath);
$jsonArray = json_decode($jsonData, true);
$preguntaABorrar = $_POST["id"]; 

    array_splice($jsonArray, $preguntaABorrar, 1);

    // Encode the modified array back to JSON
    $modifiedJsonData = json_encode($jsonArray, JSON_PRETTY_PRINT);

    // Write the modified JSON data back to the file
    file_put_contents($jsonFilePath, $modifiedJsonData);
    echo json_encode($preguntaABorrar);
?>