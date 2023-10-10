<?php
require "../logica/Clases/Cliente.php";

$id = $_POST["id"];

$cliente = Cliente::getById($id);
echo $cliente;


?>