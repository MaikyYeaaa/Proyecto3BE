<?php
require "../logica/Clases/Menu.php";
$jsonURL = '../persistencia/homepageMenus.json';

$comidasString = $_POST["comidasop"];
$comidas = json_decode($comidasString, true);
$nombre = $_POST["titulo"];
$descripción = $_POST["desc"];
$img = $_POST["img"];
$coste = 2000;
$type = $_POST["tipo"];

$jsonInfo = file_get_contents($jsonURL);
$infoArray = json_decode($jsonInfo, true);
$index = sizeof($infoArray);

$newMenu = array(
  "index" => $index,
  "nombre" => $nombre,
  "comidas" => $comidas,
  "descripcion" => $descripción,
  "imagen" => $img,
  "type" => $type
);

$infoArray[] = $newMenu;

$jsonData = json_encode($infoArray, JSON_PRETTY_PRINT);
file_put_contents($jsonURL, $jsonData);

echo json_encode($newMenu);
?>