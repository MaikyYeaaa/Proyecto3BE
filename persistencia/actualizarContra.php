<?php
require "../logica/Clases/Usuario.php";

$id = $_POST["id"];
$contrasena = $_POST["contraNueva"];

$usuario = Usuario::getById($id);

$sql = "UPDATE `usuario` SET `Contrasena`= '{$contrasena}'";
if($usuario->actualizarUsuario($sql)) {
    echo json_encode(true);
}
?>
