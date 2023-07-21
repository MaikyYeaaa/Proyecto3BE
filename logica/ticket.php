<?php
require "helperFunctions.php";


$razon = $_POST["razon"];
$descripcion = $_POST["descripcion"];
$user = $_POST["user"];

$jsonURL = "../persistencia/tickets.json";
if(empty(file_get_contents($jsonURL))) {
    $index = 0;
} else {
    $jsonInfo = file_get_contents($jsonURL);
    $infoArray = json_decode($jsonInfo, true);
    $index = sizeof($infoArray);
}

$newTicket = [
    "id" => $index,
    "usuario" => $user,
    "razon" => $razon,
    "descripcion" => $descripcion,
];

$json = writeToJSON($jsonURL, $newTicket);

echo $json;

?>