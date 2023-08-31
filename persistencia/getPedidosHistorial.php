<?php
require "helperFunctions.php";
$con = conectarBDD();

$id = mysqli_real_escape_string($con, $_POST["id"]);

$sqlPide = "SELECT * FROM `pide` WHERE `Nro` = '{$id}'";
$pideArray = getFromBDD($sqlPide, $con);

$pedidosID = array();
foreach ($pideArray as $pide) {
    $pedidosID[] = $pide["ID"]; 
}
$IDsParaContiene = "";
foreach ($pedidosID as $index => $ID) {
    if ($index != count($pedidosID) - 1) {
        $IDsParaContiene .= "{$ID},";
    } else {
        $IDsParaContiene .= $ID;
    }
}

$sqlContiene = "SELECT `IDPago` FROM `contiene` WHERE `ID` IN ({$IDsParaContiene})";
$contieneArray = getFromBDD($sqlContiene, $con);

$IDsParaPago = "";
foreach($contieneArray as $index => $contiene) {
    if ($index != count($contieneArray) - 1) {
        $IDsParaPago .= "{$contiene["IDPago"]},";
    } else {
        $IDsParaPago .= $contiene["IDPago"];
    }
}

$sqlPago = "SELECT * FROM `pago` WHERE `IdPago` IN ({$IDsParaPago})";
$pagoArray = getFromBDD($sqlPago, $con);


$arrayFinal = array();
foreach($pideArray as $index => $pide) {
    $arrayFinal[$index] = array_merge($pide, $pagoArray[$index]);
}



echo json_encode($arrayFinal);

$con->close();
?>