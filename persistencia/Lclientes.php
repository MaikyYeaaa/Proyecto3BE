<?php
require "../logica/Clases/Cliente.php";
if(!empty($_POST["param"])) {
    $param = $_POST["param"];
} else {
    $param = "";
}
$clientes = Cliente::listarAll($param);
echo $clientes;

?>