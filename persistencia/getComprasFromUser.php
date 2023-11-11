<?php
require "helperFunctions.php";

$userID = $_POST["userId"];


$con = conectarBDD();

$sql = "SELECT menu.Nombre AS MenuNombre, tiene.NombreEstado, pide.Nro, pide.Fecha, pedido.ID
FROM menu
JOIN integra ON menu.IDMenu = integra.IDMenu
JOIN contiene ON integra.IDComida = contiene.ID
JOIN pedido ON contiene.ID = pedido.ID
JOIN tiene ON pedido.ID = tiene.ID
JOIN pide ON pedido.ID = pide.ID
WHERE pide.Nro = $userID
ORDER BY pide.Fecha DESC;";
$pedidos = getFromBDD($sql, $con);

echo json_encode($pedidos);

$con->close();


?>