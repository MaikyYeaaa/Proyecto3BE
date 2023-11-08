<?php 
include "../logica/clases/menu.php";
$idComp= $_POST["idComprador"];
$idComidas = $_POST["comidas"];

$result = Menu::createCustomMenu($idComp,4000,$idComidas);
var_dump($result);
echo json_encode($result);
?>