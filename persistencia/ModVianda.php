<?php
require "helperFunctions.php";

$con = conectarBDD();

$pos = $_POST["posicion"];
$condicion = $_POST["conID"];

$sqlGetVianda = "SELECT `NroVianda` FROM conforma WHERE ID = $pos";
$viandaArray = getFromBDD($sqlGetVianda, $con);

$vianda = array_column($viandaArray, 'NroVianda');
var_dump($condicion);
var_dump($condicion);
var_dump($condicion);
var_dump($condicion);

foreach ($vianda as $value) {
    $sql = "UPDATE `Posee` SET `IDCondicion`='$condicion' WHERE NroVianda = $value";
    $data = sendToBDD($sql, $con);
    $sqlRemoverStock = "UPDATE menu
    SET StockReal = StockReal - 1
    WHERE IDMenu IN (
        SELECT menu.IDMenu
        FROM conforma
        JOIN pedido ON conforma.ID = pedido.ID
        JOIN Vianda ON conforma.NroVianda = Vianda.NroVianda
        JOIN Implica ON Vianda.NroVianda = Implica.NroVianda
        JOIN menu ON Implica.IDMenu = menu.IDMenu
        WHERE pedido.ID = $pos
    );
    ";
    $removerStock = sendToBDD($sqlRemoverStock,$con);
}

var_dump($removerStock);
var_dump($removerStock);
var_dump($removerStock);
var_dump($removerStock);
var_dump($removerStock);




var_dump($data);
echo json_encode($data);
$con->close();

?>