<?php
require "../logica/Clases/Menu.php";
if(!empty($_POST["param"])) {
    $param = $_POST["param"];
} else {
    $param = "";
}
$menus = Menu::listarAll($param);
echo $menus;

?>