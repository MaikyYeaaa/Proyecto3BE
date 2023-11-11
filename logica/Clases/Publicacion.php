<?php
require_once "../persistencia/helperFunctions.php";

class Publicacion {
    public $IDPublicacion;
    public $Nombre;
    public $FotoURL;
    public $Descripcion;

    public function __construct($IDPublicacion, $Nombre, $FotoURL, $Descripcion) {
        $this->IDPublicacion = $IDPublicacion;
        $this->Nombre = $Nombre;
        $this->FotoURL = $FotoURL;
        $this->Descripcion = $Descripcion;
    }
    
    public function getIDPublicacion() {
        return $this->IDPublicacion;
    }
    public function setIDPublicacion($IDPublicacion) {
        $this->IDPublicacion = $IDPublicacion;
    }

    public function getNombre() {
        return $this->Nombre;
    }
    public function setNombre($Nombre) {
        $this->Nombre = $Nombre;
    }

    public function getFotoURL() {
        return $this->FotoURL;
    }
    public function setFotoURL($FotoURL) {
        $this->FotoURL = $FotoURL;
    }

    public function getDescripcion() {
        return $this->Descripcion;
    }
    public function setDescripcion($Descripcion) {
        $this->Descripcion = $Descripcion;
    }

    public function sendBDD() {
        $con = conectarBDD();
        $sqlPublicacion = "INSERT INTO `publicacion` (`IDPublicacion`, `Nombre`, `FotoURL`, `Descripcion`) VALUES ('{$this->getIDPublicacion()}','{$this->getNombre()}','{$this->getFotoURL()}','{$this->getDescripcion()}')";
        
        if(sendToBDD($sqlPublicacion, $con)) {
            $con->close();
            return true;
        } else {
            die($con->error);
        }
    }

    public static function getLastId() {
        $con = conectarBDD();
        $sql = "SELECT MAX(IDPublicacion) as ultimaID FROM `publicacion`";
        $result = $con->query($sql);

        if ($result && $data = $result->fetch_assoc()) {
            $con->close();
            return $data['ultimaID'];
        }

        $con->close();
        return null; 
    }

    public static function getAllPublicaciones() {
        $con = conectarBDD();
        $sql = "SELECT * FROM `publicacion`";
        $result = $con->query($sql);
    
        $publicaciones = [];
    
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $publicacion = new Publicacion(
                    $row['IDPublicacion'],
                    $row['Nombre'],
                    $row['FotoURL'],
                    $row['Descripcion']
                );
                $publicaciones[] = $publicacion;
            }
        } else {
            die($con->error);
        }
    
        $con->close();
        return $publicaciones; 
    }
    
}

?>
