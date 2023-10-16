<?php
require "../logica/Clases/Publicacion.php";
require "../logica/Clases/Incluye.php";
require "../logica/Clases/Menu.php";


$id = $_POST["id"];
$nombre = $_POST["nombre"];
$desc = $_POST["desc"];
$img = $_POST["imgURL"];
$precioNew = $_POST["precioDescuento"];
$precioViejo = $_POST["precioViejo"];
 
$publicacion = new Publicacion($id, $nombre, $img, $desc);

$ultimaID = $publicacion->getLastId()+1;

$incluye = new Incluye($ultimaID, $id);

if($publicacion->sendBDD() && $incluye->sendBDD()) {
    $descuento = ($precioNew*100)/$precioViejo;

    $sqlUpdate = "UPDATE `menu` SET `Descuento`='{$descuento}'";
if(Menu::updateFromId($sqlUpdate, $id)) {
        echo json_encode(true);
    }

}

?>