<?php
require "helperFunctions.php";

$jsonFileName = "../persistencia/datos.json";
$jsonArray = json_decode(file_get_contents($jsonFileName), true);

$lastElement = end($jsonArray); // Obtén el último elemento del array.

$datosCocina = empty($_POST["datosCocina"]) ? $lastElement["datosCocina"] : $_POST["datosCocina"];
$datosTiempo = empty($_POST["datosTiempo"]) ? $lastElement["datosTiempo"] : $_POST["datosTiempo"];
$datosStockcolchon = empty($_POST["datosStockcolchon"]) ? $lastElement["datosStockcolchon"] : $_POST["datosStockcolchon"];
$datosStockmaximo = empty($_POST["datosStockmaximo"]) ? $lastElement["datosStockmaximo"] : $_POST["datosStockmaximo"];
$datosTiempoturno = empty($_POST["datosTiempoturno"]) ? $lastElement["datosTiempoturno"] : $_POST["datosTiempoturno"];
$datosZonas = empty($_POST["datosZonas"]) ? $lastElement["datosZonas"] : $_POST["datosZonas"];
$datosCostoMenus = empty($_POST["datosCostoMenus"]) ? $lastElement["datosCostoMenus"] : $_POST["datosCostoMenus"];

$texto = [
  "datosCocina" => $datosCocina,
  "datosTiempo" => $datosTiempo,
  "datosStockcolchon" => $datosStockcolchon,
  "datosStockmaximo" => $datosStockmaximo,
  "datosTiempoturno" => $datosTiempoturno,
  "datosZonas" => $datosZonas,
  "datosCostoMenus" => $datosCostoMenus,
];

writeToJSON($jsonFileName, $texto);
?>
