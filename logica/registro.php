<?php

ini_set('display_errors', 0);
ini_set('log_errors', 1);

$nombre = $_POST["nombre"];
$mail = $_POST["mail"];
$contra = $_POST["contrasena"];
$numVerif = rand(10000, 99999);
$tipo = $_POST["cliente"];

    $usuario = [
        "nombre" => $nombre,
        "mail" => $mail,
        "contrasena" => $contra,
        "tipo de cuenta" => $tipo,
        "admin-verificado" => false,
    ];
    
    // agarra el contenido del json para que no lo remplaze
    $jsonString = file_exists('../persistencia/usuarios.json') ? file_get_contents('../persistencia/usuarios.json') : '[]';
    $data = json_decode($jsonString, true);
    // añade al usuario nuevo
    $data[] = $usuario;

    // guarda todo en el json
    $json = json_encode($data, JSON_PRETTY_PRINT);
    if(file_put_contents("../persistencia/usuarios.json", $json)) {
        echo $numVerif;
    } else {
        echo json_encode("error!!");
    }
?>
