<?php

ini_set('display_errors', 0);
ini_set('log_errors', 1);

$nombre = $_POST["nombre"];
$mail = $_POST["mail"];
$contra = $_POST["contrasena"];
$contraRepit = $_POST["contrasenaRepit"];

//verificadores
$contrasenaVerificada = false;
$contrasenaSegura = false;
$mailVerificado = false;
$numVerif = rand(10000, 99999);

if($contra == $contraRepit) { //si ambas contraseñas son iguales
    $contrasenaVerificada = true;
}
if(preg_match('/[A-Z]/', $contra) && preg_match('/\d/',$contra)) { //si contiene almenos una mayusc y un numero
    $contrasenaSegura = true;
}

if(filter_var($mail, FILTER_VALIDATE_EMAIL)) { //si el mail es valido
    $mailVerificado = true;
}

if ($nombre === '' || $mail === '' || $contra === '' || $contrasenaVerificada == false || $contrasenaSegura == false || $mailVerificado == false ){
    if($nombre === '') {
        echo json_encode("nombre vacio");
    }
    else if($mail === '') {
        echo json_encode("e-mail vacio");
    }
    else if($contra === '') {
        echo json_encode("contra vacia");
    }
    else if($contrasenaVerificada == false) {
        echo json_encode("contrasenias no coinciden");
    }
    else if($contrasenaSegura == false) {
        echo json_encode("contrasena debe tener al menos una letra en Mayusc y un numero");
    }
    else if($mailVerificado == false) {
        echo json_encode("e-mail ingresado es invalido");
    }
} else {
    $usuario = [
        "nombre" => $nombre,
        "mail" => $mail,
        "contrasena" => $contra,
        "codigo de verificacion" => $numVerif,
        "mail-verificado" => false,
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
        echo json_encode($numVerif);
    } else {
        echo json_encode("error!!");
    }
}
?>
