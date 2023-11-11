<?php
include "helperfunctions.php";

$con = conectarBDD();
$sql = "SELECT MAX(IDMenu) AS ID FROM menu;";
$result = getFromBDD($sql,$con);
echo json_encode($result);
?>