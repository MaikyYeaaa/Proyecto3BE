<?php
require_once "../persistencia/helperFunctions.php";

class Realiza {

    public $NReclamo;
    public $Nro;

    public function __construct($NReclamo, $Nro) {
        $this->NReclamo = $NReclamo;
        $this->Nro = $Nro;
    }

    public function getNReclamo() {
        return $this->NReclamo;
    }

    public function setNReclamo($NReclamo) {
        $this->NReclamo = $NReclamo;
    }

    public function getNro() {
        return $this->Nro;
    }

    public function setNro($Nro) {
        $this->Nro = $Nro;
    }

    public function sendBDD() {
        $con = conectarBDD();
        $sql = "INSERT INTO `realiza`(`NReclamo`, `Nro`) VALUES ('{$this->getNReclamo()}','{$this->getNro()}')";
        if(sendToBDD($sql, $con)) {
            return true;
        }
    }

    public static function listarAll($param) {
        $con = conectarBDD();
        
        $sql = "SELECT * FROM `realiza` " . $param;
    
    $data = getFromBDD($sql, $con);
    $con->close();

    $realizaArray = array();
    
    foreach ($data as $row) {
        $realiza = new Realiza($row['NReclamo'], $row['Nro']);
        $realizaArray[] = $realiza;
    }

    return json_encode($realizaArray);
    }
}

?>
