<?php
$jsonFilePath = '../persistencia/usuarios.json'; 
$jsonData = file_get_contents($jsonFilePath);
$data = json_decode($jsonData, true);

$index = $_POST["id"];
$newPass = $_POST["newCont"];
$data[$index]["contrasena"] = $newPass;

$modifiedJsonData = json_encode($data, JSON_PRETTY_PRINT);
file_put_contents($jsonFilePath, $modifiedJsonData);

?>