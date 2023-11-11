<?php

require "../logica/Clases/Cliente.php";

$clienteObj = new Cliente();
$clientes = $clienteObj->listarAll("");
echo $clientes;

?>