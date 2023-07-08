<?php

ini_set('display_errors', 0);
ini_set('log_errors', 1);

$mail = $_POST["mail"];
$contra = $_POST["cont"];

$correos = [
"roberto@gmail.com",
"maneto@gmail.com",
"mamerto@gmail.com",
"kn.maiky@gmail.com",
"gilberto@gmail.com",
];

$contras = [
"123",
"aaaaaa",
"trrr",
"proyecto123",
"olanda",
];


    $posCorreo = null;
for($i= 0;$i<count($correos);$i++){
    if($mail == $correos[$i]){
        $posCorreo = $i;
    }

}
if($posCorreo === null){
    echo "false";
}elseif($contras[$posCorreo] == $contra){
    $file = '../persistencia/login.txt';
    // Abrir el archivo o crearlo si no existe
    $handle = fopen($file, 'w');
    
    $texto = 'login iniciado = true';
    
    // Escribir el contenido en el archivo
    fwrite($handle, $texto);
    
    // Cerrar el archivo
    fclose($handle);

    echo "true";

}

?>