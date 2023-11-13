<?php
require_once "../persistencia/helperFunctions.php";

class Publicacion {
    public $Nombre;
    public $FotoURL;
    public $Descripcion;

    public function __construct($Nombre, $FotoURL, $Descripcion) {
        $this->Nombre = $Nombre;
        $this->FotoURL = $FotoURL;
        $this->Descripcion = $Descripcion;
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
    public function mostrar() {
        $resultado = "Nombre: " . $this->Nombre . " ";
        $resultado .= "Foto URL: " . $this->FotoURL . " ";
        $resultado .= "Descripción: " . $this->Descripcion . " ";
        return $resultado;
    }
    public function sendBDD() {
        $con = conectarBDD();
        $sqlPublicacion = "INSERT INTO `publicacion` (`Nombre`, `FotoURL`, `Descripcion`) VALUES ('{$this->getNombre()}','{$this->getFotoURL()}','{$this->getDescripcion()}')";
        
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
        $sql = "SELECT publicacion.*, menu.Descuento, Menu.Precio, Menu.IDMenu FROM publicacion JOIN incluye ON publicacion.IDPublicacion = incluye.IDPublicacion JOIN menu ON incluye.IDMenu = menu.IDMenu";
        $resultado = getFromBDD($sql, $con);
        foreach ($resultado as $index => $publicacion) {
            $porcentaje = $publicacion["Descuento"] * $publicacion["Precio"] / 100;
            $resultado[$index]["PrecioPorcentaje"] = $porcentaje;
        }
        $con->close();
        return json_encode($resultado); 
    }

    public static function deleteFromId($id) {
        $con = conectarBDD();
        
        $sqlMenuId = "SELECT IDMenu FROM `incluye` WHERE `IDPublicacion` = {$id}";
        $menuId = getFromBDD($sqlMenuId, $con);
        $menuId = $menuId[0]["IDMenu"];
        
        $sqlIncluye = "DELETE FROM `incluye` WHERE `IDPublicacion` = {$id}";
        $sqlPublicacion = "DELETE FROM `publicacion` WHERE `IDPublicacion` = {$id}";
        $sqlMenu = "UPDATE `menu` SET `Descuento`='0' WHERE `IDMenu` = {$menuId}";
        
        $incluyeSend = sendToBDD($sqlIncluye, $con);
        $publiSend = sendToBDD($sqlPublicacion, $con);
        $menuSend = sendToBDD($sqlMenu, $con);
        
        $con->close();
        
        if($incluyeSend == 1 && $publiSend == 1 && $menuSend == 1) {
            return true;
        } else {
            return false;
        }

    }
    
}





?>
