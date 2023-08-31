<?php
require "helperFunctions.php";

$con = conectarBDD();




$jsonFileName = "../persistencia/datos.json";
$jsonArray = json_decode(file_get_contents($jsonFileName), true);

$lastElement = end($jsonArray); // Obtén el último elemento del array.

$datosCocina = empty($_POST["datosCocina"]) ? $lastElement["datosCocina"] : $_POST["datosCocina"];
$datosTiempo = empty($_POST["datosTiempo"]) ? $lastElement["datosTiempo"] : $_POST["datosTiempo"];
$datosStockcolchon = empty($_POST["datosStockcolchon"]) ? $lastElement["datosStockcolchon"] : $_POST["datosStockcolchon"];
$datosStockmaximo = empty($_POST["datosStockmaximo"]) ? $lastElement["datosStockmaximo"] : $_POST["datosStockmaximo"];
$datosTiempoTurno = empty($_POST["datosTiempoturno"]) ? $lastElement["datosTiempoturno"] : $_POST["datosTiempoturno"];
$datosZonas = empty($_POST["datosZonas"]) ? $lastElement["datosZonas"] : $_POST["datosZonas"];
$datosCostoMenus = empty($_POST["datosCostoMenus"]) ? $lastElement["datosCostoMenus"] : $_POST["datosCostoMenus"];
$datosFechaVencimiento = empty($_POST["datosFechaVencimiento"]) ? $lastElement["datosFechaVencimiento"] : $_POST["datosFechaVencimiento"];


$texto = [
  "datosCocina" => $datosCocina,
  "datosTiempo" => $datosTiempo,
  "datosStockcolchon" => $datosStockcolchon,
  "datosStockmaximo" => $datosStockmaximo,
  "datosTiempoturno" => $datosTiempoTurno,
  "datosZonas" => $datosZonas,
  "datosCostoMenus" => $datosCostoMenus,
  "datosFechaVencimiento" => $datosFechaVencimiento,

];


$sqlCocinas="UPDATE `Sucursal` SET  `Cocinas`= ".$datosCocina.";";
$sqlTiempoTurno="UPDATE `Sucursal` SET  `TiempoTurno`= ".$datosTiempoTurno.";";

$sqlTiempoCocinado="UPDATE `comida` SET  `TiempoCocinado`= ".$datosTiempo.";";
$sqlStockmaximo="UPDATE `menu` SET  `StockMaximo`= ".$datosStockmaximo.";";
$sqlStockColchón="UPDATE `menu` SET  `StockColchón`= ".$datosStockcolchon.";";


//ACTUALIZAR CODIGO CUANDO ACTUALICEMOS EL DER!!!!!

sendToBDD($sqlTiempoCocinado, $con);
sendToBDD($sqlStockmaximo, $con);
sendToBDD($sqlStockColchón, $con);
sendToBDD($sqlCocinas, $con);
sendToBDD($sqlTiempoTurno, $con);

$con->close();



writeToJSON($jsonFileName, $texto);
?>
