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

    public function __construct($IDMenu, $Nombre, $Precio, $StockMaximo, $StockColchon, $StockReal, $FechaVencimiento, $MenuIMG, $Descuento, $comidas) {
        $this->IDMenu = $IDMenu;
        $this->Nombre = $Nombre;
        $this->Precio = $Precio;
        $this->StockMaximo = $StockMaximo;
        $this->StockColchon = $StockColchon;
        $this->StockReal = $StockReal;
        $this->FechaVencimiento = $FechaVencimiento;
        $this->MenuIMG = $MenuIMG;
        $this->Descuento = $Descuento;
        $this->comidas = $comidas;
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
            $menu = new Menu($row['IDMenu'], $row['Nombre'], $row['Precio'], $row['StockMaximo'], $row['StockColchon'], $row['StockReal'], $row['FechaVencimiento'], $row['MenuIMG'], $row['Descuento'], $row['comidas']);
            $menus[] = $menu;
        }
    
        return $menus;
    }
    
    public function toArray() {
        return array(
            'IDMenu' => $this->IDMenu,
            'Nombre' => $this->Nombre,
            'Precio' => $this->Precio,
            'StockMaximo' => $this->StockMaximo,
            'StockColchon' => $this->StockColchon,
            'StockReal' => $this->StockReal,
            'FechaVencimiento' => $this->FechaVencimiento,
            'MenuIMG' => $this->MenuIMG,
            'Descuento' => $this->Descuento,
            'comidas' => $this->comida 
        );
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