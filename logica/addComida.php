<?php
// require: "Clases/Comida.php";

$nombre_comida = $_POST["nombre"];
$descripcion = $_POST["desc"];
$dieta = $_POST["dieta"];
$imagenURL = $_POST["imgURL"];

$newComida = [
"id_comida" => rand(1,349289432),
"nombre_comida" => $nombre_comida,
"descripcion" => $descripcion,
"dieta" => $dieta,
"imgURL" => $imagenURL,
];

$jsonURL = '../persistencia/comidas.json';

// existe?
if (!file_exists($jsonURL)) {
    // si no existe, hace un array vacio
    $comida = array();
} else {
    // si existe decodea el contenido
    $comida = json_decode(file_get_contents($jsonURL), true);
    // se fija si el contenido de $comida no es un array
    if (!is_array($comida)) {
        // si no es, hace un array vacio
        $comida = array();
    }
}

$comida[] = $newComida;

$jsonData = json_encode($comida, JSON_PRETTY_PRINT);

// Manda el contenido previo + el nuevo al json
file_put_contents($jsonURL, $jsonData);

echo json_encode($comida);
?>
