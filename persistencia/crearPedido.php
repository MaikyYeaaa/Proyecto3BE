<?php
// require "helperFunctions.php";
// $con = conectarBDD();

// $fecha = mysqli_real_escape_string($con, $_POST["fecha"]);
// $monto = mysqli_real_escape_string($con, $_POST["monto"]);
// $vencimiento = mysqli_real_escape_string($con, $_POST["vencimiento"]);

// // crear pago (done)
// $sqlPago = "INSERT INTO `pago` (`Monto`, `TipoPago`) VALUES ('{$monto}','Tarjeta')";

// // crear pedido (done)
// $sqlPedido = "INSERT INTO `pedido`(`ID`) VALUES (NULL)";



// if (sendToBDD($sqlPago, $con) && sendToBDD($sqlPedido, $con)) {

// // traer IDPago (para contiene)
// $sqlIDpago = "SELECT MAX(IDPago) AS IDPago FROM `pago`";
// $IDPago = getFromBDD($sqlIDpago, $con);
// $IDPago = $IDPago[0]["IDPago"];

// // traer cliente ID (para pide)
// $Nro = mysqli_real_escape_string($con, $_POST["idUser"]); 

// // traer ID pedido (para pide) (para tiene) (para conforma) (para llega)
// $sqlIDpedido = "SELECT MAX(ID) AS ID FROM `pedido`";
// $ID = getFromBDD($sqlIDpedido, $con);
// $ID = $ID[0]["ID"];

// // traer ID de Sucursal (para llega) 
// $sqlIDsucursal = "SELECT `IDSucursal` FROM `sucursal` WHERE `IDSucursal` = 1";
// $idSucursal = getFromBDD($sqlIDsucursal, $con);
// $idSucursal = $idSucursal[0]["IDSucursal"];

// // traer NombreEstado (para tiene)
// $sqlNombreEstado = "SELECT `NombreEstado` FROM `estado` WHERE `NombreEstado` = 'Solicitado'";
// $nombreEstado = getFromBDD($sqlNombreEstado, $con);
// $nombreEstado = $nombreEstado[0]["NombreEstado"];

// // traer IDCondicion (para posee)
// $sqlIDcondicion = "SELECT `IDCondicion` FROM `condicion` WHERE `NombreCondicion` = 'Solicitada'";
// $idCondicion = getFromBDD($sqlIDcondicion, $con);
// $idCondicion = $idCondicion[0]["IDCondicion"];



// //traer IDMenu (para implica)
// $IDMenus = mysqli_real_escape_string($con, $_POST["menuIDs"]);


// // crear relaciones

// // //pide
// $sqlPide = "INSERT INTO `pide`(`ID`, `Nro`, `Fecha`) VALUES ('{$ID}','{$Nro}','{$fecha}')";
// if(sendToBDD($sqlPide, $con)) {
// }
// //contiene
// $sqlContiene = "INSERT INTO `contiene`(`ID`, `IDPago`) VALUES ('{$ID}','{$IDPago}')";
// if(sendToBDD($sqlContiene, $con)) {
// }
// //llega
// $sqlLlega = "INSERT INTO `llega`(`ID`, `IDSucursal`) VALUES ('{$ID}','{$idSucursal}')";
// if(sendToBDD($sqlLlega, $con)) {
// }
// //tiene
// $sqlTiene = "INSERT INTO `tiene`(`ID`, `NombreEstado`) VALUES ('{$ID}','{$nombreEstado}')"; 
// if(sendToBDD($sqlTiene, $con)) {
// }
// //conforma //implica
// $IDMenusArray = explode(',', $IDMenus);
// foreach ($IDMenusArray as $singleIDMenu) {

//     // crear vianda (done)
//     $sqlVianda = "INSERT INTO `vianda` (`FechaVencimiento`) VALUES ('{$vencimiento}')";
//     sendToBDD($sqlVianda, $con);

//     // traer NroVianda (para posee) (para implica) (para conforma)
//     $sqlNroVianda = "SELECT MAX(NroVianda) AS NroVianda FROM `vianda`";
//     $nroVianda = getFromBDD($sqlNroVianda, $con);
//     $nroVianda = $nroVianda[0]["NroVianda"];

//     $sqlImplica = "INSERT INTO `implica`(`NroVianda`, `IDMenu`) VALUES ('{$nroVianda}','{$singleIDMenu}')";
//     if(sendToBDD($sqlImplica, $con)) {
//     }

//     $sqlConforma = "INSERT INTO `conforma`(`ID`, `NroVianda`) VALUES ('{$ID}', '{$nroVianda}')";
//     if(sendToBDD($sqlConforma, $con)) {
//     }
// }
// //posee
// $sqlPosee = "INSERT INTO `posee`(`NroVianda`, `IDCondicion`) VALUES ('{$nroVianda}','{$idCondicion}')";
// if(sendToBDD($sqlPosee, $con)) {
// }

// }
// if ($con->error) {
//     echo "Error: " . $con->error;
// } else {
//     echo "Good";
// }

// $con->close();

require "helperFunctions.php";
$con = conectarBDD();

$fecha = mysqli_real_escape_string($con, $_POST["fecha"]);
$monto = mysqli_real_escape_string($con, $_POST["monto"]);
$vencimiento = mysqli_real_escape_string($con, $_POST["vencimiento"]);
$zonaID= $_POST["zona"];


// crear pedido (done)
$sqlPedido = "INSERT INTO `pedido`(`ID`) VALUES (NULL)";

// crear pago (done)
$sqlPago = "INSERT INTO `pago` (`Monto`, `TipoPago`) VALUES ('{$monto}','Tarjeta')";

// traer IDPago (para contiene)
$pago = sendToBDD($sqlPago, $con);
$sqlIDPago = "SELECT MAX(IdPago) AS ID FROM `pago`";
$IDPago = getFromBDD($sqlIDPago, $con);
$IDPago = $IDPago[0]["ID"];


if (sendToBDD($sqlPedido, $con)) {
// traer cliente ID (para pide)
$Nro = mysqli_real_escape_string($con, $_POST["idUser"]); 

// traer ID pedido (para pide) (para tiene) (para conforma) (para llega)
$sqlIDpedido = "SELECT MAX(ID) AS ID FROM `pedido`";
$ID = getFromBDD($sqlIDpedido, $con);
$ID = $ID[0]["ID"];

// traer ID de Sucursal (para llega) 
$idSucursal = $zonaID;

// traer NombreEstado (para tiene)

$nombreEstado = "Solicitado";


// traer IDCondicion (para posee)
$sqlIDcondicion = "SELECT `IDCondicion` FROM `condicion` WHERE `NombreCondicion` = 'Solicitada'";
$idCondicion = getFromBDD($sqlIDcondicion, $con);
$idCondicion = $idCondicion[0]["IDCondicion"];



//traer IDMenu (para implica)
$IDMenus = mysqli_real_escape_string($con, $_POST["menuIDs"]);


// crear relaciones

// //pide
$sqlPide = "INSERT INTO `pide`(`ID`, `Nro`, `Fecha`) VALUES ('{$ID}','{$Nro}','{$fecha}')";
if(sendToBDD($sqlPide, $con)) {
}
//contiene
$sqlContiene = "INSERT INTO `contiene`(`ID`, `IDPago`) VALUES ('{$ID}','{$IDPago}')";
if(sendToBDD($sqlContiene, $con)) {
}
//llega
$sqlLlega = "INSERT INTO `llega`(`ID`, `IDSucursal`) VALUES ('{$ID}','{$idSucursal}')";
if(sendToBDD($sqlLlega, $con)) {
}
//tiene
$sqlTiene = "INSERT INTO `tiene`(`ID`, `NombreEstado`) VALUES ('{$ID}','{$nombreEstado}')"; 
if(sendToBDD($sqlTiene, $con)) {
}
//conforma //implica
$IDMenusArray = explode(',', $IDMenus);
foreach ($IDMenusArray as $singleIDMenu) {

    // crear vianda (done)
    $sqlVianda = "INSERT INTO `vianda` (`FechaVencimiento`) VALUES ('{$vencimiento}')";
    sendToBDD($sqlVianda, $con);

    // traer NroVianda (para posee) (para implica) (para conforma)
    $sqlNroVianda = "SELECT MAX(NroVianda) AS NroVianda FROM `vianda`";
    $nroVianda = getFromBDD($sqlNroVianda, $con);
    $nroVianda = $nroVianda[0]["NroVianda"];

    $sqlImplica = "INSERT INTO `implica`(`NroVianda`, `IDMenu`) VALUES ('{$nroVianda}','{$singleIDMenu}')";
    if(sendToBDD($sqlImplica, $con)) {
    }

    $sqlConforma = "INSERT INTO `conforma`(`ID`, `NroVianda`) VALUES ('{$ID}', '{$nroVianda}')";
    if(sendToBDD($sqlConforma, $con)) {
    }
}
//posee
$sqlPosee = "INSERT INTO `posee`(`NroVianda`, `IDCondicion`) VALUES ('{$nroVianda}','{$idCondicion}')";
if(sendToBDD($sqlPosee, $con)) {
}

}
if ($con->error) {
    echo "Error: " . $con->error;
} else {
    echo "Good";
}

$con->close();
?>