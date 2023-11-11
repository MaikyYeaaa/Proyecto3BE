<?php
ini_set('display_errors', 0);
ini_set('log_errors', 1);
$jsonFilePath = '../persistencia/usuarios.json';
$jsonData = file_get_contents($jsonFilePath);
$Users=json_decode($jsonData, true);
header('Content-Type: application/json');

echo json_encode($Users);
?>