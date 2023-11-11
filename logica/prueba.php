<?php
$jsonURL = "../persistencia/datos.json";
$jsonContent = file_get_contents($jsonURL);
$jsonArray = json_decode($jsonContent, true);

$datosCostoMenus = $jsonArray[0]['datosCostoMenus'];

echo $datosCostoMenus; // Imprime "777"

?>