<?php
require_once "../persistencia/helperFunctions.php";

class Reclamo {

    public $NReclamo;
    public $DescripcionReclamo;
    public $Resuelto;

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

    public function sendBDD() {
        $con = conectarBDD();
        $sql = "INSERT INTO `reclamo`(`NReclamo`, `DescripcionReclamo`, `Resuelto`) VALUES ('{$this->getNReclamo()}','{$this->getDescripcionReclamo()}','{$this->getResuelto()}')";
        if(sendToBDD($sql, $con)) {
            return true;
        }
    }

    public static function listarAll($param) {
        $con = conectarBDD();
        
            $sql = "SELECT reclamo.*, cliente.Mail FROM reclamo JOIN realiza ON reclamo.NReclamo = realiza.NReclamo JOIN cliente ON realiza.Nro = cliente.Nro " . $param;
        $data = getFromBDD($sql, $con);
        $con->close();

        $reclamos = array();
        
        foreach ($data as $row) {
            $reclamo = new Reclamo($row['NReclamo'], $row['DescripcionReclamo'], $row['Resuelto']);
            $reclamos[] = $reclamo;
        }
        return $reclamos;
    }

    public static function getById($id) {
        $con = conectarBDD();  
        $idEscapado = mysqli_real_escape_string($con, $id);
        $sql = "SELECT * FROM `reclamo` WHERE NReclamo = '${idEscapado}'";
        $result = $con->query($sql);
        $con->close();

        if ($result && $result->num_rows > 0) {
            $data = $result->fetch_assoc();
            $reclamo = new Reclamo($data['NReclamo'], $data['DescripcionReclamo'], $data['Resuelto']);
            return json_encode($reclamo);
        } else {
            return null;  
        }
    }

    public static function deleteById($id) {
        $con = conectarBDD();
        $idEscapado = mysqli_real_escape_string($con, $id);
        $sql = "UPDATE `reclamo` SET `Resuelto`= '1' WHERE NReclamo = '${idEscapado}'";
        
        $result = $con->query($sql);
    
        $con->close();
    
        if ($result) {
            return true;
        } else {
            return false;
        }
    }
}

?>

