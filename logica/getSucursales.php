<?php
require_once "../persistencia/helperfunctions.php";
$con = conectarBDD();
$sql = "SELECT * FROM `Sucursal`";
$result = getFromBDD($sql,$con);

echo json_encode($result);


?>