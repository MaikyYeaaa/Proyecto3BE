<?php
require "helperFunctions.php";
$titulo = $_POST["pregunta"];
$descripcion = $_POST["respuesta"];

var_dump($titulo . $descripcion);

$faqData = array(
    'preguntaID' => siguienteID('faq.json'),
    'titulo' => $titulo,
    'descripcion' => $descripcion
);

function siguienteID($jsonURL) {
    if (file_exists($jsonURL)) {
        $data = json_decode(file_get_contents($jsonURL), true);
        $lastItem = end($data); // Obtiene el último elemento del array
        return $lastItem['preguntaID'] + 1; // Devuelve el próximo ID
    } else {
        return 1; // Si el archivo no existe, empieza desde 1
    }
}

writeToJSON('faq.json', $faqData);

?>