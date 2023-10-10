<?php
require "../logica/Clases/Cliente.php";
$param = $_POST["param"];
$clientes = Cliente::listarAll($param);
echo json_encode($clientes);

?>