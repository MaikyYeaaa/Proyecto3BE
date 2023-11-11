<?php
require "helperFunctions.php";

$con = conectarBDD();

$sql = "SELECT * FROM `comida`";

$comidas = getFromBDD($sql, $con);

$dietas = array();
foreach ($comidas as $index => $comida) {
    $id = $comida["IDComida"];
    $sql = "SELECT dieta.Tipodieta, dieta.IDDieta FROM dieta JOIN pertenece ON dieta.IDDieta = pertenece.IDDieta JOIN comida ON comida.IDComida = pertenece.IDComida WHERE comida.IDComida = $id";
    $dieta = getFromBDD($sql, $con);
    $dieta = $dieta[0];
    // var_dump($dieta);
    $comidas[$index]["Dieta"] = $dieta;
}


echo json_encode($comidas);

$con->close();

?>