<?php
require "../logica/Clases/Publicacion.php";
require "../logica/Clases/Incluye.php";
require "../logica/Clases/Menu.php";

$idMenu = $_POST["id"];
$nombre = $_POST["nombre"];
$desc = $_POST["desc"];
$img = $_POST["imgURL"];
$descuento = $_POST["precioDescuento"];
// $precioNew = $_POST["precioDescuento"];
$precioViejo = $_POST["precioViejo"];

$publicacion = new Publicacion($nombre, $img, $desc);

$publiSend = $publicacion->sendBDD();

$publicacionID = $publicacion->getLastId();

$incluye = new Incluye($publicacionID, $idMenu);

$incluyeSend = $incluye->sendBDD();

$sqlUpdate = "UPDATE `menu` SET `Descuento`='{$descuento}'";
$menuSend = Menu::updateFromId($sqlUpdate, $idMenu);

if($publiSend == 1 && $incluyeSend == 1 && $menuSend == 1) {
    echo "1";
} else {
    echo "error";
}

?>