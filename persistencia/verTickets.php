<?php

require "../logica/Clases/Reclamo.php";
require "../logica/Clases/Realiza.php";
require "../logica/Clases/Cliente.php";
require "../logica/Clases/Incorpora.php";

$reclamosArray = Reclamo::listarAll("WHERE reclamo.Resuelto = 0");
$realizaArray = array();
$incorporaArray = array();
$clienteArray = array();

foreach ($reclamosArray as $reclamoObj) {
    $NReclamo = $reclamoObj->getNReclamo();
    
    $realizaParam = "WHERE NReclamo = '{$NReclamo}'";
    $realizaJSON = Realiza::listarAll($realizaParam);
    $realiza = json_decode($realizaJSON, true);
    $realizaArray[] = $realiza[0];

    $incorporaParam = "WHERE NReclamo = '{$NReclamo}'";
    $incorporaJSON = Incorpora::listarAll($incorporaParam);
    $incorpora = json_decode($incorporaJSON, true);
    $incorporaArray[] = $incorpora[0];

    $clienteParam = "WHERE Nro = '{$realiza[0]["Nro"]}'";
    $clienteJSON = Cliente::listarALL($clienteParam);
    $cliente = json_decode($clienteJSON, true);
    $clienteArray[] = $cliente[0];
}

$juntaArray = array();

foreach ($reclamosArray as $i => $reclamo) {
    $juntaArray[$i] = array(
        'Reclamo' => $reclamo,
        'Realiza' => $realizaArray[$i],
        'Incorpora' => $incorporaArray[$i],
        'Cliente' => $clienteArray[$i]
    );
}

echo json_encode($juntaArray);

// var_dump(json_encode($juntaArray));
// var_dump(json_encode($reclamosArray));
// var_dump(json_encode($realizaArray));
// var_dump(json_encode($clienteArray));

?>
