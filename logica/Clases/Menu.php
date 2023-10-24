<?php
// require "Comida.php";
require_once "../persistencia/helperFunctions.php";

class Menu {
    private $IDMenu;
    private $Nombre;
    private $Precio; 
    private $StockMaximo;
    private $StockColchon;
    private $StockReal;
    private $FechaVencimiento;
    private $MenuIMG;
    private $Descuento;  
    private $comidas = [];

    public function __construct($IDMenu, $Nombre, $Precio, $StockMaximo, $StockColchon, $StockReal, $FechaVencimiento, $MenuIMG, $Descuento) {
        $this->IDMenu = $IDMenu;
        $this->Nombre = $Nombre;
        $this->Precio = $Precio;         
        $this->StockMaximo = $StockMaximo;
        $this->StockColchon = $StockColchon;
        $this->StockReal = $StockReal;
        $this->FechaVencimiento = $FechaVencimiento;
        $this->MenuIMG = $MenuIMG;
        $this->Descuento = $Descuento;   
        // $this->comidas = $comidas;
    }

    public function getIDMenu() {
        return $this->IDMenu;
    }
    public function setIDMenu($IDMenu) {
        $this->IDMenu = $IDMenu;
    }
    
    public function getNombreMenu() {
        return $this->Nombre;
    }
    public function setNombreMenu($Nombre) {
        $this->Nombre = $Nombre;
    }

    public function getStockMaximo() {
        return $this->StockMaximo;
    }
    public function setStockMaximo($StockMaximo) {
        $this->StockMaximo = $StockMaximo;
    }
    
    public function getStockColchon() {
        return $this->StockColchon;
    }
    public function setStockColchon($StockColchon) {
        $this->StockColchon = $StockColchon;
    }
    
    public function getStockReal() {
        return $this->StockReal;
    }
    public function setStockReal($StockReal) {
        $this->StockReal = $StockReal;
    }
    
    public function getFechaVencimiento() {
        return $this->FechaVencimiento;
    }
    public function setFechaVencimiento($FechaVencimiento) {
        $this->FechaVencimiento = $FechaVencimiento;
    }
    
    public function getImg(){
        return $this->MenuIMG;
    }
    public function setImg($MenuIMG){
        $this->MenuIMG = $MenuIMG;
    }

    public function getComidas() {
        return $this->comidas;
    }
    public function setComidas($comidas) {
        $this->comidas = $comidas;
    }

    public function getPrecio() {
        return $this->Precio;
    }

    public function setPrecio($Precio) {
        $this->Precio = $Precio;
    }

    public function getDescuento() {
        return $this->Descuento;
    }

    public function setDescuento($Descuento) {
        $this->Descuento = $Descuento;
    }
    
    public static function listarAll($param) {
        $con = conectarBDD();
        $sql = "SELECT * FROM `menu` " . $param;
        $data = getFromBDD($sql, $con);
        $con->close();
        
        $menus = array();
        
        foreach ($data as $row) {
            $menuData = array(
                'IDMenu' => $row['IDMenu'],
                'Nombre' => $row['Nombre'],
                'Precio' => $row['Precio'],
                'StockMaximo' => $row['StockMaximo'],
                'StockColchon' => $row['StockColchon'],
                'StockReal' => $row['StockReal'],
                'FechaVencimiento' => $row['FechaVencimiento'],
                'MenuIMG' => $row['MenuIMG'],
                'Descuento' => $row['Descuento'],
            );
            $menus[] = $menuData;
        }
    
        return json_encode($menus);
    }

    public static function addNewMenu($Nombre, $Precio, $StockReal, $MenuIMG,$comidas){
        $con = conectarBDD();
        $sqlMenu = "INSERT INTO `menu` (`Nombre`, `Precio`, `StockReal`, `MenuIMG`) VALUES ('${Nombre}','${Precio}','${StockReal}','${MenuIMG}')";
    if (sendToBDD($sqlMenu, $con)) {
    $id = mysqli_insert_id($con);
    $comidas = mysqli_real_escape_string($con, $comidas);
    $comidasArray = explode(',', $comidas);
    foreach($comidasArray as $comida) {
        $sqlIntegra = "INSERT INTO `integra` (`IDComida`, `IDMenu`) VALUES ('${comida}','${id}')";
        if (!sendToBDD($sqlIntegra, $con)) {
            echo "Error en integra query: " . mysqli_error($con);
            break;
        }
    }
} else {
    echo "Error en menu query: " . mysqli_error($con);
}


$con->close();
    }
    
    public function Update($sql) {
        $con = conectarBDD();
        $sql = $sql . " WHERE IDMenu = '{$this->getIDMenu()}'";
        if(sendToBDD($sql, $con)) {
            return true;
        }
        if($con->error) {
            die($con->error);
        }
        $con->close();
    }
    
    public function __toString() {
        return "IDMenu: " . $this->IDMenu . "\n" .
               "Nombre: " . $this->Nombre . "\n" .
               "Precio: " . $this->Precio . "\n" .
               "StockMaximo: " . $this->StockMaximo . "\n" .
               "StockColchon: " . $this->StockColchon . "\n" .
               "StockReal: " . $this->StockReal . "\n" .
               "FechaVencimiento: " . $this->FechaVencimiento . "\n" .
               "MenuIMG: " . $this->MenuIMG . "\n" .
               "Descuento: " . $this->Descuento . "\n" .
               "Comidas: " . implode(', ', $this->comidas);
    }
    


    public static function updateFromId($sql, $id) {
        $con = conectarBDD();
        $sql = $sql . " WHERE IDMenu = '{$id}'";
        if(sendToBDD($sql, $con)) {
            return true;
        }
        if($con->error) {
            die($con->error);
        }
        $con->close();
    }
    
    

    

    
}



?>