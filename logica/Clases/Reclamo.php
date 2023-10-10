<?php
require "../persistencia/helperFunctions.php";

class Reclamo {

    private $NReclamo;
    private $DescripcionReclamo;
    private $Resuelto;

    public function __construct($NReclamo, $DescripcionReclamo, $Resuelto) {
        $this->NReclamo = $NReclamo;
        $this->DescripcionReclamo = $DescripcionReclamo;
        $this->Resuelto = $Resuelto;
    }

    public function getNReclamo() {
        return $this->NReclamo;
    }

    public function setNReclamo($NReclamo) {
        $this->NReclamo = $NReclamo;
    }

    public function getDescripcionReclamo() {
        return $this->DescripcionReclamo;
    }

    public function setDescripcionReclamo($DescripcionReclamo) {
        $this->DescripcionReclamo = $DescripcionReclamo;
    }

    public function getResuelto() {
        return $this->Resuelto;
    }

    public function setResuelto($Resuelto) {
        $this->Resuelto = $Resuelto;
    }

    public static function sendReclamo() {
        $con = conectarBDD();
        $sql = "INSERT INTO `reclamo`(`NReclamo`, `DescripcionReclamo`, `Resuelto`) VALUES ('{$this->getNReclamo()}','{$this->DescripcionReclamo()}','{$this->Resuelto()}')";
        var_dump($sql);
        if(sendToBDD($sql, $con)) {
            return true;
        }
    }
}

?>

