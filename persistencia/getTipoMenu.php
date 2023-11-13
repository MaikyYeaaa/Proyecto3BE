<?php
require "helperFunctions.php";

$con = conectarBDD();

$sql = "SELECT * FROM tipomenu WHERE NombreTipoMenu <> 'Custom'; ";
$tipos = getFromBDD($sql, $con);

echo json_encode($tipos);

$con->close();


?>