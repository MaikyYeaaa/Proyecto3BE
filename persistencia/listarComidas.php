<?php
require "helperFunctions.php";

$con = conectarBDD();

$sql = "SELECT * FROM `comida`";

$data = getFromBDD($sql, $con);

echo json_encode($data);

$con->close();

?>