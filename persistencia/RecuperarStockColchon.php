<?php
require "helperFunctions.php";
$con = conectarBDD();
$menuName = $_POST["menuName"];

$sqlGetStockMaximo = "SELECT `StockMaximo` FROM `menu`;";
$stockMaximo = getFromBDD($sqlGetStockMaximo, $con);
$stockMaximo = $stockMaximo[0]["StockMaximo"];

$sqlUpdateStock = "UPDATE `menu` SET `StockReal` = $stockMaximo WHERE `Nombre` = '$menuName';";
$datas = sendToBDD($sqlUpdateStock, $con);
echo json_encode($datas);
$con->close();
?>