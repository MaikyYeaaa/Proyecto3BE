<?php
require "../logica/Clases/Usuario.php";

$id = $_POST["id"];
$usuario = Usuario::getById($id);

echo json_encode($usuario);

?>