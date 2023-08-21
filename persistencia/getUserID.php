<?php
require "helperFunctions.php";

$con = conectarBDD();

$mail = mysqli_real_escape_string($con, $_POST["mail"]); 

$sql = "SELECT `Nro` FROM `cliente` WHERE Mail = '${mail}'";
$id = getFromBDD($sql, $con);
echo json_encode($id);

$con->close();
?>