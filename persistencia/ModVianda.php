<?php
require "helperFunctions.php";

$con = conectarBDD();

$pos = $_POST["posicion"];
$condicion = $_POST["conID"];

$sqlGetVianda = "SELECT `NroVianda` FROM conforma WHERE ID = $pos";
$viandaArray = getFromBDD($sqlGetVianda, $con);

$vianda = array_column($viandaArray, 'NroVianda');

foreach ($vianda as $value) {
    $sql = "UPDATE `Posee` SET `IDCondicion`='$condicion' WHERE NroVianda = $value";
    $data = sendToBDD($sql, $con);
}






echo json_encode($data);
$con->close();

?>