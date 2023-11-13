<?php
require "../logica/Clases/Publicacion.php";
$id = $_POST["id"];

$eliminar = Publicacion::deleteFromId($id);

echo $eliminar;

// require "helperFunctions.php";
// $con = conectarBDD();

// $id = mysqli_real_escape_string($con, $_POST["id"]);

// $sqlIncluye = "DELETE FROM `incluye` WHERE `IDPublicacion` = {$id}";
// if (sendToBDD($sqlIncluye, $con)) {   
//     $sqlPublicacion = "DELETE FROM `publicacion` WHERE `IDPublicacion` = {$id}";
//     sendToBDD($sqlPublicacion, $con);
// }

// $con->close();
?>