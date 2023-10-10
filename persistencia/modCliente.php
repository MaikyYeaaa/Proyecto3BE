<?php



require "../logica/Clases/Cliente.php";

$mail = $_POST["mail"];
$cliente = Cliente::getByMail($mail);  // Suponiendo que tienes un método estático que devuelve un objeto Cliente basado en el mail

if ($cliente) {
    if($_POST["valor"] === "confirmar") {
        $cliente->actualizarAutorizado('SI');
        echo "success";
    } else {
        $cliente->actualizarAutorizado('NO');
        echo "success";
    }
} else {
    echo "Cliente no encontrado";
}


?>