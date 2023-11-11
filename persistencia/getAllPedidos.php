<?php
include_once "helperFunctions.php";
$con = conectarBDD();
$sql = "SELECT * FROM vistapedidos;";
$resp = getFromBDD($sql,$con);
echo json_encode($resp);


?>