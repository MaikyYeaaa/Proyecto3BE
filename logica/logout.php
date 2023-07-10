<?php

$txt = '../persistencia/login.txt';
$handle = fopen($txt, 'w');

$texto = 'login iniciado = false';

fwrite($handle, $texto);
fclose($handle);

echo "Sesion cerrada exitosamente."

?>