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
    echo json_encode("No");
} else {
    if($CurrentState === "Solicitado"){ //Si el pedido está en solicitado, solo necesita actualizar el pedido, ya que no hay vianda
        $sqlCancelar = "UPDATE `tiene` SET `NombreEstado`='Cancelado',`FechaInicio`='' WHERE ID = $ID";
        $cancelarPedido = sendToBDD($sqlCancelar,$con);
    }else{ //Si el pedido no está en solicitado, significa que está en otro estado, por lo que debe actualizar las viandas también
        $sqlCancelar = "UPDATE `tiene` SET `NombreEstado`='Cancelado',`FechaInicio`='' WHERE ID = $ID";
        $cancelarPedido = sendToBDD($sqlCancelar,$con);
        $sqlCancelarVianda = "UPDATE `posee`
        SET `IDCondicion` = 4
        WHERE `NroVianda` IN (
            SELECT `NroVianda`
            FROM `conforma`
            WHERE ID = 6
        );
        ";
        $result = sendToBDD($sqlCancelarVianda,$con);
        
    }
   

    echo json_encode("Si");
}

//echo json_encode($dietas);

$con->close();


?>