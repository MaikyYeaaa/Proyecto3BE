<?php
include "../logica/clases/pedido.php";

$userId = $_POST["userID"];
$result = Pedido::getPedidoFromUser($userId);
echo $result;

?>