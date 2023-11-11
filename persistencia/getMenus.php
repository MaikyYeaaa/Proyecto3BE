<?php
require "../logica/Clases/Menu.php";
$menus = Menu::listarAll("");
echo $menus;
?>