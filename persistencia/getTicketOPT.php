<?php
require "helperFunctions.php";

$con = conectarBDD();

$sql = "SELECT * FROM `RazonReclamo`";

echo json_encode(getFromBDD($sql, $con));

$con->close();

?>