<?php
require "../logica/Clases/Cliente.php";

$id = $_POST["id"];
$dir = $_POST["dir"];

$cliente = Cliente::getById($id);

$sql = "UPDATE `cliente` SET `Dir`= '{$dir}'";
if($cliente->Update($sql)) {
    echo json_encode(true);
}
?>
