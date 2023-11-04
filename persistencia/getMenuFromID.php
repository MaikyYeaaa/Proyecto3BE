<?php
require "helperFunctions.php";
$con = conectarBDD();

$id = mysqli_real_escape_string($con, $_POST["id"]);

$sql = "SELECT * FROM `menu` WHERE `IDMenu` = $id";

$menus = getFromBDD($sql, $con);

echo json_encode($menus);

$con->close();
?>