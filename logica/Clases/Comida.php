<?php
require_once "../persistencia/helperFunctions.php";

class Comida {
    private $IDComida;
    private $Nombre;
    private $Descripcion;
    private $ImagenURL;
    private $TiempoCocinado;
    private $NombreDieta;

    public function __construct($IDComida, $Nombre, $Descripcion, $ImagenURL, $TiempoCocinado, $NombreDieta) {
        $this->IDComida = $IDComida;
        $this->Nombre = $Nombre;
        $this->Descripcion = $Descripcion;
        $this->ImagenURL = $ImagenURL;
        $this->TiempoCocinado = $TiempoCocinado;
        $this->NombreDieta = $NombreDieta;
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

public function getNombreDieta() {
    return $this->NombreDieta;
}
public function setNombreDieta($NombreDieta) {
    $this->NombreDieta = $NombreDieta;
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

public static function getIDDietaBDD($NombreDieta) {
    $con = conectarBDD();
    $sqlDieta = "SELECT * FROM `dieta` WHERE Tipodieta = '" . $NombreDieta . "'";
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

public static function modComida($nombre, $desc, $tiempo, $id) {
$con = conectarBDD();

    $camposActualizar = [];

if(!empty($nombre)) {
    $camposActualizar[] = "Nombre = '{$nombre}'";
}
if(!empty($desc)) {
    $camposActualizar[] = "Descripcion = '{$desc}'";
}
if (!empty($tiempo)) {
    $camposActualizar[] = "TiempoCocinado = '{$tiempo}'";
}

if(!empty($camposActualizar)) {
    $sql = "UPDATE `comida` SET " . implode(", ", $camposActualizar) . " WHERE IDComida = {$id}";
    sendToBDD($sql, $con);
    return true;
} else {
    return false;
}

$con->close();
}

public static function eliminarComida($id){
    $con = conectarBDD();
    $sqlPertenece = "DELETE FROM `pertenece` WHERE `IDComida` = '${id}'";
    $sqlComida = "DELETE FROM `comida` WHERE `IDComida` = '${id}'";

   if (sendToBDD($sqlPertenece, $con) && sendToBDD($sqlComida, $con)) {
    return true; 
}else {
    return false;
}
}

public static function listarAll() {
    $con = conectarBDD();
    $sql = "SELECT c.*, d.Tipodieta AS NombreDieta FROM comida c LEFT JOIN pertenece p ON c.IDComida = p.IDComida LEFT JOIN dieta d ON p.IDDieta = d.IDDieta ORDER BY `NombreDieta` DESC ";
    $data = getFromBDD($sql, $con);
    $con->close();

    $comidas = array();
    
    foreach ($data as $row) {
        $comida = new Comida($row['IDComida'], $row['Nombre'], $row['Descripcion'], $row['ImagenURL'], $row['TiempoCocinado'],  $row['NombreDieta']);
        $comidas[] = $comida;
    }

    return $comidas;
}

public function toArray() {
    return array(
        'IDComida' => $this->IDComida,
        'Nombre' => $this->Nombre,
        'Descripcion' => $this->Descripcion,
        'ImagenURL' => $this->ImagenURL,
        'TiempoCocinado' => $this->TiempoCocinado,
        'NombreDieta' => $this->NombreDieta
    );
}

}

?>