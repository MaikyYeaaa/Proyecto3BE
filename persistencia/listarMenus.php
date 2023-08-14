<?php
require "helperFunctions.php";

$con = conectarBDD();

$sqlMenu = "SELECT * FROM `menu`";
$menus = getFromBDD($sqlMenu, $con);

echo json_encode($menus);

$con->close();
?>