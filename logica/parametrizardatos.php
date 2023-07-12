<?php

$datosCocina =$_POST["datosCocina"];
$datosTiempo =$_POST["datosTiempo"];
$datosStockcolchon =$_POST["datosStockcolchon"];
$datosStockmaximo =$_POST["datosStockmaximo"];
$datosTiempoturno =$_POST["datosTiempoturno"];
$datosZonas =$_POST["datosZonas"];
$datosCostoMenus =$_POST["datosCostoMenus"];


$file = "miarchivo1.txt";
$texto = "\n -Cocina: ".$datosCocina.
         "\n -Tiempo de cocinado: ".$datosTiempo. 
         "\n -Stock Colchon: ".$datosStockcolchon.
         "\n -Stock Minimo: ".$datosStockmaximo.
         "\n -Tiempo del turno: ".$datosTiempoturno.
         "\n -Zonas: ".$datosZonas.
         "\n -Costo menus: ".$datosCostoMenus;
$fp = fopen($file, "wr");
fwrite($fp, $texto,1000 );
fclose($fp);

?>


