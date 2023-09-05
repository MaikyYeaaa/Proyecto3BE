<?php
require "helperFunctions.php";
$con = conectarBDD();
$ID = $_POST["ID"];

$sqlGetVianda = "SELECT * FROM `Conforma` WHERE ID = $ID";
$viandas = getFromBDD($sqlGetVianda, $con);

foreach ($viandas as $vianda) {
    $nroVianda = $vianda['NroVianda']; // Store the NroVianda value in a variable
    $sqlGetMenuID = "SELECT `IDMenu` FROM `implica` WHERE NroVianda = $nroVianda";
    $MenuID = getFromBDD($sqlGetMenuID, $con);

    foreach ($MenuID as $Menu) {
        $menuID = $Menu['IDMenu']; // Store the IDMenu value in a variable
        $sqlGetMenuName = "SELECT `Nombre`, `MenuIMG` FROM `menu` WHERE IDMenu = $menuID";
        $MenuNames = getFromBDD($sqlGetMenuName, $con);

        // Process $MenuNames here if needed
    }
}

// Output or process $MenuNames here if needed
echo json_encode($MenuNames);
$con->close();
?>