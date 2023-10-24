<?php
require_once "../logica/Clases/Comida.php";

$listarComidas = Comida::listarAll();
$comidasArray = [];

foreach ($listarComidas as $comida) {
    $comidasArray[] = $comida->toArray();
}

echo json_encode($comidasArray);
?>