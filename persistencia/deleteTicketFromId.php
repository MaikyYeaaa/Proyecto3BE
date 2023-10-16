<?php
require "../logica/Clases/Reclamo.php";

$id = $_POST["id"];
if(Reclamo::deleteById($id)) {
    echo json_encode(true);
}

?>