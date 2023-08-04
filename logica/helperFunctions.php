<?php

function writeToJSON($jsonURL, $arrayData) {
    if (!file_exists($jsonURL)) {
        // si no existe, hace un array vacio
        $array = array();
    } else {
        // si existe decodea el contenido
        $array = json_decode(file_get_contents($jsonURL), true);
        // se fija si el contenido de $array no es un array
        if (!is_array($array)) {
            // si no es, hace un array vacio
            $array = array();
        }
    }
    
    $array[] = $arrayData;
    
    $jsonData = json_encode($array, JSON_PRETTY_PRINT);
    
    // Manda el contenido previo + el nuevo al json
    return file_put_contents($jsonURL, $jsonData);
}

function sendToBDD($sql) {
$host = "localhost";
$UsuarioBDD = "root";
$ContraBDD = "";
$bdd = "tukotech";

$con = new mysqli($host, $UsuarioBDD, $ContraBDD, $bdd);

if($con->connect_error) {
    die ("la conexion ha fallado: " . $con->connect_error);
}

$resultado = $con->query($sql);
$con->close();
return true;
}

?>