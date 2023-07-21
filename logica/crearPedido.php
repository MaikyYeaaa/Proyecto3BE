<?php
require "../logica/Clases/Pedido.php";

$nombre = $_POST["Menu custom"];
$fechaInicio = $_POST["fecha"];
$fechaFin = "0"; //La fecha fin se ajusta cuando un administrador modifique el estado
$jsonURL = '../persistencia/pedidos.json';
$creador = "User"; //CAMBIAR A NOMBRE ACTUAL
$comidas[] = $_POST["platos"];
$multiplicador = $_POST["multi"];
$coste = 2000 * $multiplicador; 
for ($i = 1; $i < $multiplicador; $i++) {
    $comidas[$i] = $_POST["platos"];
}

var_dump($comidas);

$jsonInfo = file_get_contents($jsonURL);
$infoArray = json_decode($jsonInfo, true);
$index = sizeof($infoArray);
$Pedido = new Pedido($index,"Menu custom",$creador,"Solicitado",$coste,$fechaInicio,$fechaFin,$comidas);
$infoArray[] = $Pedido;
$jsonData = json_encode($infoArray, JSON_PRETTY_PRINT);

// Save the updated JSON back to the file
file_put_contents($jsonURL, $jsonData);

echo json_encode($Pedido);
?>