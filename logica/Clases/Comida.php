<?php
require_once "../persistencia/helperFunctions.php";

class Comida {
    private $IDComida;
    private $Nombre;
    private $Descripcion;
    private $ImagenURL;
    private $TiempoCocinado;
    private $Dieta;

    public function __construct($IDComida, $Nombre, $Descripcion, $ImagenURL, $TiempoCocinado, $Dieta) {
        $this->IDComida = $IDComida;
        $this->Nombre = $Nombre;
        $this->Descripcion = $Descripcion;
        $this->ImagenURL = $ImagenURL;
        $this->TiempoCocinado = $TiempoCocinado;
        $this->Dieta = $Dieta;
    }
    
public function getIDComida() {
    return $this->IDComida;
}
public function setIDComida($IDComida) {
    $this->IDComida = $IDComida;
}

public function getNombre() {
    return $this->Nombre;
}
public function setNombre($Nombre) {
    $this->Nombre = $Nombre;
}

public function getDescripcion() {
    return $this->Descripcion;
}
public function setDescripcion($Descripcion) {
    $this->Descripcion = $Descripcion;
}

public function getImagenURL() {
    return $this->ImagenURL;
}
public function setImagenURL($ImagenURL) {
    $this->ImagenURL = $ImagenURL;
}

public function getTiempoCocinado() {
    return $this->ImagenURL;
}
public function setTiempoCocinado($TiempoCocinado) {
    $this->TiempoCocinado = $TiempoCocinado;
}

public function getDieta() {
    return $this->Dieta;
}
public function setDieta($Dieta) {
    $this->Dieta = $Dieta;
}

public function sendBDD() {
    $con = conectarBDD();
    $sqlComida = "INSERT INTO `comida` (`IDComida`, `Nombre`, `Descripcion`, `ImagenURL`, `TiempoCocinado`) VALUES ('{$this->getIDComida()}','{$this->getNombre()}','{$this->getDescripcion()}','{$this->getImagenURL()}','{$this->getTiempoCocinado()}')";
    $sqlPertenece = "INSERT INTO `pertenece` (`IDComida`, `IDDieta`) VALUES ('{$this->getIDComida()}', '{$this->getIDDietaBDD($this->getDieta())}')";
    if(sendToBDD($sqlComida, $con) && sendToBDD($sqlPertenece, $con)) {
        $con->close();
        return true;
    } else {
        die($con->error);
    }
}

public static function getIDDietaBDD($dieta) {
    $con = conectarBDD();
    $sqlDieta = "SELECT * FROM `dieta` WHERE Tipodieta = '" . $dieta . "'";
    $dietaData = getFromBDD($sqlDieta, $con);
    $idDieta = $dietaData[0]["IDDieta"]; //  output: la id de la dieta que ingreso el usuario (ej: 1)
    $con->close();
    return $idDieta;
}

public static function getLastId() {
    $con = conectarBDD();
    $sql = "SELECT MAX(IDComida) as ultimaID FROM `comida`";
    $result = $con->query($sql);

    if ($result && $data = $result->fetch_assoc()) {
        $con->close();
        return $data['ultimaID'];
    }

    $con->close();
    return null; 
}
}
?>