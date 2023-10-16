<?php
require "../logica/Clases/Publicacion.php";
require "../logica/Clases/Incluye.php";
require "../logica/Clases/Menu.php";

$publicaciones = Publicacion::getAllPublicaciones();
echo json_encode($publicaciones);

?>