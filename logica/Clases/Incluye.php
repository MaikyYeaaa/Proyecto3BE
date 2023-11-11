<?php
require_once "../persistencia/helperFunctions.php";

class Incluye {

    public $IDPublicacion;
    public $IDMenu;

    public function __construct($IDPublicacion, $IDMenu) {
        $this->IDPublicacion = $IDPublicacion;
        $this->IDMenu = $IDMenu;
    }

    public function getIDPublicacion() {
        return $this->IDPublicacion;
    }

    public function setIDPublicacion($IDPublicacion) {
        $this->IDPublicacion = $IDPublicacion;
    }

    public function getIDMenu() {
        return $this->IDMenu;
    }

    public function setIDMenu($IDMenu) {
        $this->IDMenu = $IDMenu;
    }

    public function sendBDD() {
        $con = conectarBDD();
        $sql = "INSERT INTO `incluye`(`IDPublicacion`, `IDMenu`) VALUES ('{$this->getIDPublicacion()}','{$this->getIDMenu()}')";

        if(sendToBDD($sql, $con)) {
            return true;
        }
    }

    public static function listarAll($param) {
        $con = conectarBDD();
        
        $sql = "SELECT * FROM `incluye` " . $param;
    
    $data = getFromBDD($sql, $con);
    $con->close();

    $incluyeArray = array();
    
    foreach ($data as $row) {
        $incluye = new Incluye($row['IDPublicacion'], $row['IDMenu']);
        $incluyeArray[] = $incluye;
    }

    return json_encode($incluyeArray);
    }
}

?>