<?php
require "helperFunctions.php";
$con = conectarBDD();

$sqlCocinas = "SELECT `cocinas` FROM `sucursal` LIMIT 1;";
$sqlGetCocinas = getFromBDD($sqlCocinas, $con);

$sqlTiempoturno = "SELECT `TiempoTurno` FROM `sucursal` LIMIT 1;";
$sqlGetTiempoTurno = getFromBDD($sqlTiempoturno, $con);

$sqlTiempococinado = "SELECT `TiempoCocinado` FROM `comida` LIMIT 1;";
$sqlGetTiempoCocinado = getFromBDD($sqlTiempococinado, $con);

$sqlStockMaximo = "SELECT `StockMaximo` FROM `menu` LIMIT 1;";
$sqlGetStockMaximo = getFromBDD($sqlStockMaximo, $con);

$sqlStockMinimo = "SELECT `StockColchón` FROM `menu` LIMIT 1;";
$sqlGetStockMinimo = getFromBDD($sqlStockMinimo, $con);

$resultado = [
    'cocinas' => $sqlGetCocinas[0]['cocinas'],
    'TiempoTurno' => $sqlGetTiempoTurno[0]['TiempoTurno'],
    'TiempoCocinado' => $sqlGetTiempoCocinado[0]['TiempoCocinado'],
    'StockMaximo' => $sqlGetStockMaximo[0]['StockMaximo'],
    'StockColchón' => $sqlGetStockMinimo[0]['StockColchón']
];

echo json_encode($resultado);
$con->close();
?>





