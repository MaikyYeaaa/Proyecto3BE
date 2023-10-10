<?php
// require "Comida.php";
require_once "../persistencia/helperFunctions.php";

class Menu {
    public $IDMenu;
    public $Nombre;
    public $Precio; 
    public $StockMaximo;
    public $StockColchon;
    public $StockReal;
    public $FechaVencimiento;
    public $MenuIMG;
    public $Descuento;  
    // public $comidas;

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
            $menu = new Menu($row['IDMenu'], $row['Nombre'], $row['Precio'], $row['StockMaximo'], $row['StockColchon'], $row['StockReal'], $row['FechaVencimiento'], $row['MenuIMG'], $row['Descuento']);
            $menus[] = $menu;
        }
    
        return json_encode($menus);
    }
    
    
    
    

    

    
}



?>