<?php
include "../logica/clases/pedido.php";
$resultOP = Pedido::GetAllPedidos();
echo $resultOP;

?>