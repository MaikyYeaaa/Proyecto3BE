<?php
require "helperFunctions.php";

$con = conectarBDD();

$sql = "SELECT * FROM `tipomenu`";
$tipos = getFromBDD($sql, $con);

echo json_encode($tipos);

$con->close();


?>