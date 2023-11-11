<?php
require "../logica/Clases/Usuario.php";
require "../logica/Clases/Cliente.php";
require "../logica/Clases/Web.php";
require "../logica/Clases/Empresa.php";

$nombre = $_POST["nombre"];
$apellido = $_POST["apellido"];
$contra = $_POST["contra"];
$mail = $_POST["mail"];
$tel = $_POST["tel"];
$direccion = $_POST["direccion"];

$usuarioVerif = false;
$clienteVerif = false;
$tipoClienteVerif = false;

$usuario = new Usuario('NULL', $nombre, $contra, 'NULL', $mail);
if($usuario->sendBDD()) {
    $usuarioVerif = true;
    $id = Usuario::getLastId();
}

$cliente = new Cliente($id, $mail, 'NULL', $tel, $direccion);
if($cliente->sendBDD()) {
    $clienteVerif = true;
}

$tipo = $_POST["tipo"];
if($tipo == "web") {
    $ci = $_POST["ci-rut"];
    $web = new Web($cliente->getNro(), $cliente->getMail(), $cliente->getAutorizado(), $cliente->getTelefono(), $cliente->getDir(), $ci, $nombre, $apellido);
    if($web->sendBDD()) {
        $tipoClienteVerif = true;
    }
} else {
    $rut = $_POST["ci-rut"];
    $empresa = new Empresa($cliente->getNro(), $cliente->getMail(), $cliente->getAutorizado(), $cliente->getTelefono(), $cliente->getDir(), $rut, $nombre);
    if($empresa->sendBDD()) {
        $tipoClienteVerif = true;
    }
} 

if($clienteVerif && $usuarioVerif && $tipoClienteVerif) {
    echo "correcto";
} else {
    if(!$clienteVerif) {
        echo "error al registrar cliente";
    }
    if(!$usuarioVerif) {
        echo "error al registrar usuario";
    }
    if(!$tipoClienteVerif) {
        echo "error al ingresar el tipo de cliente";
    }
}




?>