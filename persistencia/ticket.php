<?php
require "../logica/Clases/Reclamo.php";




$razon = $_POST["razon"];
$descripcion = $_POST["descripcion"];
$idUser = $_POST["id"];

$reclamo = new Reclamo(NULL, $descripcion, false);
var_dump(json_encode($reclamo));

$sqlReclamo = "INSERT INTO `reclamo`(`DescripcionReclamo`) VALUES ('${descripcion}')";
if (sendToBDD($sqlReclamo, $con)) {
    echo "reclamo added <br>";
    $NReclamo = $con->insert_id; //devuelve la id generada en el ultimo insert ($sqlReclamo)

    $sqlIncorpora = "INSERT INTO `incorpora`(`NReclamo`, `NombreRazon`) VALUES ('${NReclamo}','${razon}')";
    if(sendToBDD($sqlIncorpora, $con)) {
        echo "relacion `incopora` added <br>";
    } else {
        echo "error al ingresar relacion en `incorpora` <br>";
    }

    $sqlNro = "SELECT `Nro` FROM `cliente` WHERE `Nro` = '${id}'"; //agarro el id del cliente con ese id
    $NroArray = getFromBDD($sqlNro, $con);
    $Nro = $NroArray[0]['Nro'];

    $sqlRealiza = "INSERT INTO `realiza`(`NReclamo`, `Nro`) VALUES ('${NReclamo}','${Nro}')";
    if(sendToBDD($sqlRealiza, $con)) {
        echo "relacion `realiza` added <br>";
    } else {
        echo "error al ingresar relacion en `realiza` <br>";
    }
} else {
    echo "error al ingresar reclamo <br>";
}


$con->close();

?>