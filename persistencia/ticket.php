<?php
require "../logica/Clases/Reclamo.php";
require "../logica/Clases/Incorpora.php";
require "../logica/Clases/Realiza.php";

$requisitos = 0;

$razon = $_POST["razon"];
$descripcion = $_POST["descripcion"];
$idUser = $_POST["id"];
$reclamos = Reclamo::listarAll("");

$NReclamo = count($reclamos)+1;

$reclamo = new Reclamo($NReclamo, $descripcion, false);
if($reclamo->sendBDD()) {
    $requisitos++;
}
$incorpora = new Incorpora($reclamo->getNReclamo(), $razon);
if($incorpora->sendBDD()) {
    $requisitos++;
}
$realiza = new Realiza($reclamo->getNReclamo(), $idUser);
if($realiza->sendBDD()) {
    $requisitos++;
}

if($requisitos == 3) {
    echo json_encode(true);
}

?>