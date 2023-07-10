<?php
// require: "Clases/Comida.php";

$id_comida = $_POST["id_comida"];
$nombre_comida = $_POST["nombre"];
$descripcion = $_POST["desc"];
$imagenURL = $_POST["imgURL"];

$newComida = array($id_comida, $nombre_comida, $descripcion, $imagenURL);

$jsonURL = '../persistencia/comidas.json';

// check if file exists
if (!file_exists($jsonURL)) {
    // if not, initialize an empty array
    $comida = array();
} else {
    // if file exists, decode its contents
    $comida = json_decode(file_get_contents($jsonURL), true);
    // check if the decoded content is not array (i.e. empty or malformed JSON)
    if (!is_array($comida)) {
        // if not, initialize an empty array
        $comida = array();
    }
}

$comida[] = $newComida;

$jsonData = json_encode($comida, JSON_PRETTY_PRINT);

// Save back to the file
file_put_contents($jsonURL, $jsonData);

echo json_encode($comida);
?>
