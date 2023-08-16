<?php
require "helperFunctions.php";
$con = conectarBDD();
$menuName = $_POST["menuName"];
$stock = $_POST["stock"];

$sqlCocinas = "UPDATE `menu` SET `StockReal` = '$stock' WHERE `nombre` = '$menuName'";

sendToBDD($sqlCocinas, $con);
$con->close();


?>