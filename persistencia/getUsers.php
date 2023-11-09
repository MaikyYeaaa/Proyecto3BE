<?php
require "../logica/Clases/Usuario.php";

$listado = Usuario::listar();

echo $listado;
?>