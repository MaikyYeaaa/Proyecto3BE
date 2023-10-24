<?php
require "../logica/Clases/Comida.php";

$nombre_comida = $_POST["nombre"];
$descripcion = $_POST["desc"];
$dieta = $_POST["dieta"];
$imagenURL = $_POST["imgURL"];
$tiempoCocinado = $_POST["tiempoCocinado"];
// $nombre_comida = "test";
// $descripcion = "testdesc";
// $dieta = "Celiaca";
// $imagenURL = "https://img.pixers.pics/pho(s3:700/PI/62/8/700_PI628_0a52c36a534004114ce074067697190e_5b7abc84a0477_.,700,653,jpg)/fotomurales-minion-kevin.jpg.jpg";
// $tiempoCocinado = "22";

$comidaId = Comida::getLastId()+1;
$comida = new Comida($comidaId, $nombre_comida, $descripcion, $imagenURL, $tiempoCocinado, $dieta);

$dietaId = $comida->getIDDietaBDD($dieta);

if($comida->sendBDD()) {
    echo json_encode(true);
}


// $sqlComida = "SELECT * FROM `comida` WHERE Nombre = '".$nombre_comida."'";
// $comidaData = getFromBDD($sqlComida, $con);
// $idComida = $comidaData[0]["IDComida"];

// $sqlRelacion = "INSERT INTO `pertenece` (`IDComida`, `IDDieta`) VALUES ('".$idComida."','".$idDieta."')";
// if (sendToBDD($sqlRelacion, $con)) {
//     echo "correcto";
// }

// if ($con->error) {
//     echo $con->error;
// }

// $con->close();


?>
