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
function removeFromJSON($jsonURL, $index) {
    if (!file_exists($jsonURL)) {
                // si no existe, hace un array vacio
        return false;
    } else {
                // si existe decodea el contenido
        $array = json_decode(file_get_contents($jsonURL), true);
                // se fija si el contenido de $array no es un array
        if (!is_array($array)) {
                        // si no es, hace un array vacio
            return false;
        }
    }
    
    // saca el elemento q le pedi
    unset($array[$index]);
    $jsonData = json_encode($array, JSON_PRETTY_PRINT);
    
    // devuelve el json
    return file_put_contents($jsonURL, $jsonData);
}
function getArrayFromJSON($jsonURL) {
    if (!file_exists($jsonURL)) {
        return false;
    } else {
        $array = json_decode(file_get_contents($jsonURL), true);
        if (!is_array($array)) {
            return false;
        }
        return $array;
    }
}

function conectarBDD() {
    // $host = "mysql";
    // $UsuarioBDD = "root";
    // $ContraBDD = "12345";
    // $bdd = "tukotech";
    $host = "localhost";
    $UsuarioBDD = "root";
    $ContraBDD = "";
    $bdd = "tukotech";

    $con = new mysqli($host, $UsuarioBDD, $ContraBDD, $bdd);
    if($con->connect_error) {
        die ("la conexion ha fallado: " . $con->connect_error);
    }
    return $con;
}
function sendToBDD($sql, $con) {
    if (!$con->query($sql)) {
        echo "Error executing query: (" . $con->error . ") " . $con->error;
    }
    return $con->affected_rows;
}
function getFromBDD($sql, $con) {
    $resultado = $con->query($sql);
    if(!$resultado) {
        die ("error al ejecutar la consulta: " . $con->error);
    }
    $data = array();
    while ($fila = $resultado->fetch_assoc()) {
        $data[] = $fila;
    }
    return $data;
}
?>