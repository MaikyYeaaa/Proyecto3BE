<?php
//require "helperFunctions.php";

// $con = conectarBDD();

// $id = mysqli_real_escape_string($con, $_POST["id"]);

// $sqlElmiminarRelacion = "DELETE FROM pertenece WHERE IDComida = ".$id;

// if(sendToBDD($sqlElmiminarRelacion, $con)) {

    
//     $sqlEliminarComida = "DELETE FROM comida WHERE IDComida = ".$id;
    
//     if (sendToBDD($sqlEliminarComida, $con)) {
//         echo "eliminado correctamente";
//     } else {
//         echo "error!! " . $con->error;
//     }
// } else {
//     echo "error!! " . $con->error;
// }
    
// $con->close();

require "../logica/Clases/Comida.php";

$id = $_POST["id"];

$eliminarComida = Comida::eliminarComida($id);

echo $eliminarComida;


?>