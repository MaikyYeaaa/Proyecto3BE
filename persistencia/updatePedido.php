<?php
include "../logica/clases/pedido.php";
$state = $_POST["state"];
$id = $_POST["id"];
$result = Pedido::updatePedido($state,$id);
echo $result;
?>