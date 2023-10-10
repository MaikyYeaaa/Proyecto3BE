<?php
require_once "../persistencia/helperFunctions.php";

class Incorpora {

    public $NReclamo;
    public $NombreRazon;

    public function __construct($NReclamo, $NombreRazon) {
        $this->NReclamo = $NReclamo;
        $this->NombreRazon = $NombreRazon;
    }

    public function getNReclamo() {
        return $this->NReclamo;
    }

    public function setNReclamo($NReclamo) {
        $this->NReclamo = $NReclamo;
    }

    public function getNombreRazon() {
        return $this->NombreRazon;
    }

    public function setNombreRazon($NombreRazon) {
        $this->NombreRazon = $NombreRazon;
    }

    public function sendBDD() {
        $con = conectarBDD();
        $sql = "INSERT INTO `incorpora`(`NReclamo`, `NombreRazon`) VALUES ('{$this->getNReclamo()}','{$this->getNombreRazon()}')";
        var_dump($sql);
        if(sendToBDD($sql, $con)) {
            return true;
        }
    }

    public static function listarAll($param) {
        $con = conectarBDD();
        
        $sql = "SELECT * FROM `incorpora` " . $param;
    
    $data = getFromBDD($sql, $con);
    $con->close();

    $incorporaArray = array();
    
    foreach ($data as $row) {
        $incorpora = new Incorpora($row['NReclamo'], $row['NombreRazon']);
        $incorporaArray[] = $incorpora;
    }

    return json_encode($incorporaArray);
    }
}

?>