<?php
// require "helperFunctions.php";

// $con = conectarBDD();

// $mail = $_POST["mail"]); 
// $contra = $_POST["cont"]);

// $sql = "SELECT `Contrasena`, `Mail` FROM `usuario` WHERE Mail = '${mail}'";
// if($userData = getFromBDD($sql, $con)) { // $userData = [{"Contrasena":"jernacioContra336969","Mail":"jernaaaa@gmail.com"}]
//    if($userData[0]["Contrasena"] == $contra) {
//     echo "ningunError";
//    } else {
//     echo "contraError";
//    }
// } else {
//     echo "mailError";
// }

// $con->close();


// // echo json_encode($userData);


require "../logica/Clases/Usuario.php";

$mail = $_POST["mail"]; 
$contra = $_POST["cont"];


$usuarioVerificado = Usuario::login($mail, $contra);

echo $usuarioVerificado;



?>