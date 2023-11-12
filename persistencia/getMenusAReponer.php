<?php
require "helperFunctions.php";
$con = conectarBDD();


$sqlGetStockColchon = "SELECT `StockColchon` FROM `menu`;";
$stockColchon = getFromBDD($sqlGetStockColchon, $con);
$stockColchon = $stockColchon[0]["StockColchon"];

$sqlGetMenusAReponer = "SELECT *
FROM menu
WHERE StockReal <= StockColchon
AND IDMenu NOT IN (SELECT ID_menu FROM Asocia WHERE NombreTipoMenu = 'Custom');
";
$MenusArray = getFromBDD($sqlGetMenusAReponer, $con);






echo json_encode($MenusArray);

$con->close();
?>