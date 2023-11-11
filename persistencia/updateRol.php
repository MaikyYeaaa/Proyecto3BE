<?php
require "../logica/Clases/Usuario.php";

$rol = $_POST["rol"];
$id = $_POST["id"];

$actualizar = Usuario::actualizarRolConId($rol,$id);

echo $actualizar;


?>