<?php
require "helperFunctions.php";


$con = conectarBDD();

$sql = "SELECT * FROM `comida`";

$comidas = getFromBDD($sql, $con);

foreach ($comidas as $index => $comida) {
    $id = $comida["IDComida"];
    $sql = "SELECT dieta.Tipodieta, dieta.IDDieta FROM dieta JOIN pertenece ON dieta.IDDieta = pertenece.IDDieta JOIN comida ON comida.IDComida = pertenece.IDComida WHERE comida.IDComida = $id";
    $dieta = getFromBDD($sql, $con);

    $comidas[$index]["Dieta"] = $dieta[0];
}


echo json_encode($comidas);

$con->close();

?>