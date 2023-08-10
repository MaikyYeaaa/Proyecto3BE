<?php
require "helperFunctions.php";

$con = conectarBDD();

$mail = mysqli_real_escape_string($con, $_POST["mail"]);

$sql = "SELECT `Mail` FROM `cliente` WHERE `Mail` = '${mail}'";

$resp = getFromBDD($sql, $con);

echo json_encode($resp);



$con->close();
?>
