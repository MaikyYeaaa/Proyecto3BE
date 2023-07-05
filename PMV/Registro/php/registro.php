<?php

ini_set('display_errors', 0);
ini_set('log_errors', 1);

$nombre = $_POST["nombre"];
$mail = $_POST["mail"];
$contra = $_POST["contrasena"];
$contraRepit = $_POST["contrasenaRepit"];

//verificadores
$contrasenaVerificada = false;
$mailVerificado = false;
$numVerif = rand(10000, 99999);

if($contra == $contraRepit) {
    $contrasenaVerificada = true;
}
if(filter_var($mail, FILTER_VALIDATE_EMAIL)) {
    $mailVerificado = true;
}

if ($nombre === '' || $mail === '' || $contra === '' || $contrasenaVerificada == false || $mailVerificado == false){
    echo json_encode("error!!");
} else {
    $usuario = [
        "nombre" => $nombre,
        "mail" => $mail,
        "contrasena" => $contra,
        "verificado" => false,
    ];
    
    // Load the existing data
    $jsonString = file_exists('usuarios.json') ? file_get_contents('usuarios.json') : '[]';
    $data = json_decode($jsonString, true);

    // Add the new user
    $data[] = $usuario;

    // Save the data
    $json = json_encode($data, JSON_PRETTY_PRINT);
    if(file_put_contents("usuarios.json", $json)) {
        echo json_encode($numVerif);
    } else {
        echo json_encode("error!!");
    }
}
?>
