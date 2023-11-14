<?php
require "helperFunctions.php";

$ID = $_POST["ID"];
$CurrentState = $_POST["currentState"];
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
    if($CurrentState === "Solicitado") {
        // Si han pasado más de 24 horas y el estado es 'Solicitado', se cancela el pedido
        $sqlCancelar = "UPDATE `tiene` SET `NombreEstado`='Cancelado',`FechaInicio`='' WHERE ID = $ID";
        $cancelarPedido = sendToBDD($sqlCancelar, $con);
        echo json_encode("Si");
    } else {
        // Si han pasado más de 24 horas pero el estado no es 'Solicitado', no se cancela el pedido
        echo json_encode("No");
    }
} else {
    // Si no han pasado 24 horas, no se cancela el pedido
    echo json_encode("No");
}

$con->close();
?>
