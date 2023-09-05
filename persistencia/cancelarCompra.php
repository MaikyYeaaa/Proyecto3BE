<?php
require "helperFunctions.php";
$ID = $_POST["ID"];
$con = conectarBDD();

$sql = "SELECT 
CASE
    WHEN TIMESTAMPDIFF(HOUR, Fecha, NOW()) >= 24 THEN 'Yes'
    ELSE 'No'
END AS passed_24_hours
FROM pide
WHERE ID = $ID;";


$respuesta = getFromBDD($sql, $con);

if ($respuesta[0]['passed_24_hours'] === "Yes") {
    echo json_encode("No");
} else {
    $sqlCancelar = "UPDATE `tiene` SET `NombreEstado`='Cancelado',`FechaInicio`='' WHERE ID = $ID";
    $cancelarPedido = sendToBDD($sqlCancelar,$con);
    echo json_encode("Si");
}

//echo json_encode($dietas);

$con->close();


?>