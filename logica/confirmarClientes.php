<?php

$usuario = $_POST["nombre"];
$valor = $_POST["valor"];

if($valor === "confirmar") {
    echo $usuario . " registrado!";
} else{
    echo $usuario . " no registrado :(";
}




?>