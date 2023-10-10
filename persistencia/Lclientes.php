<?php

require "../logica/Clases/Cliente.php";

$clientes = Cliente::listar("NULL");
echo json_encode($clientes);

?>