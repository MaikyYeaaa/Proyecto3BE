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
    echo "true";

}

?>