<?php
ini_set('display_errors', 0);
ini_set('log_errors', 1);
$jsonFilePath = '../persistencia/faq.json';
$jsonData = file_get_contents($jsonFilePath);
$Pedidos=json_decode($jsonData, true);
header('Content-Type: application/json');

echo json_encode($Pedidos);
?>