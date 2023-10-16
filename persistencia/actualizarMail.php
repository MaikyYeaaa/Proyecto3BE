
<?php
require "../logica/Clases/Usuario.php";

$id = $_POST["id"];
$mail = $_POST["mail"];

$usuario = Usuario::getById($id);

$sql = "UPDATE `usuario` SET `Mail`= '{$mail}'";
if($usuario->actualizarUsuario($sql)) {
    echo json_encode(true);
}
?>
