<?php

ini_set('display_errors', 0);
ini_set('log_errors', 1);

$mail = $_POST["mail"];
$contra = $_POST["cont"];
$empleado = $_POST["empelado"];

$correos = [
"jefeDeCocina@gmail.com",
"gerente@gmail.com",
];

$contras = [
"jefeContra1",
"gerenteContra1",
];

$posiciones = [
    "jefe-de-cocina",
    "gerente",
];



    $posCorreo = null;
for($i= 0;$i<count($correos);$i++){
    if($mail == $correos[$i] ){
        $posCorreo = $i;
    }

}
if($posCorreo === null){
    echo "false";
}elseif($contras[$posCorreo] == $contra){

    $txt = '../persistencia/login.txt';
    $handle = fopen($txt, 'w');
    
    $texto = 'login iniciado = true';
    
    fwrite($handle, $texto);
    fclose($handle);

    echo "true";

}

?>