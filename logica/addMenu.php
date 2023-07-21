<?php

$nombre = $_POST["nombre"];
$descripcion = $_POST["desc"];
$img = $_POST["imgURL"];
$stock = $_POST["stock"];

$comida1 = $_POST["comida1"];
$comida2 = $_POST["comida2"];
$comida3 = $_POST["comida3"];
$comida4 = $_POST["comida4"];
$comida5 = $_POST["comida5"];

$comidas = [$comida1, $comida2, $comida3, $comida4, $comida5];

$newMenu = [
    "id_menu" => rand(1, 2020200),
    "nombre_menu" => $nombre,
    "descripcion" => $descripcion,
    "stock" => $stock,
    "comidas" => $comidas,
    "imgURl" => $img,
];

$jsonURL = '../persistencia/menus.json';

// existe?
if (!file_exists($jsonURL)) {
    // si no existe, hace un array vacio
    $menu = array();
} else {
    // si existe decodea el contenido
    $menu = json_decode(file_get_contents($jsonURL), true);
    // se fija si el contenido de $comida no es un array
    if (!is_array($menu)) {
        // si no es, hace un array vacio
        $menu = array();
    }
}

$menu[] = $newMenu;

$jsonData = json_encode($menu, JSON_PRETTY_PRINT);

// Manda el contenido previo + el nuevo al json
file_put_contents($jsonURL, $jsonData);

echo json_encode($menu);


?>