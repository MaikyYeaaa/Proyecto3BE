<?php
require "Comida.php";

class Menu {

    private $ID_menu;
    private $nombre_menu;
    private $stockMaximo;
    private $stockColchon;
    private $stockReal;
    private $fechaVencimiento;
    private $comidas;
    private $descripción;
    private $img;

    public function __construct($ID_menu, $nombre_menu, $stockMaximo, $stockColchon, $stockReal, $fechaVencimiento, $comidas,$descripción,$img) {
        $this->ID_menu = $ID_menu;
        $this->nombre_menu = $nombre_menu;
        $this->stockMaximo = $stockMaximo;
        $this->stockColchon = $stockColchon;
        $this->stockReal = $stockReal;
        $this->fechaVencimiento = $fechaVencimiento;
        $this->comidas = $comidas;
        $this-> descripción = $descripción;
        $this-> img = $img;
    }

    public function getIDMenu() {
        return $this->ID_menu;
    }
    public function getNombreMenu() {
        return $this->nombre_menu;
    }
    public function getStockMaximo() {
        return $this->stockMaximo;
    }
    public function getStockColchon() {
        return $this->stockColchon;
    }
    public function getStockReal() {
        return $this->stockReal;
    }
    public function getFechaVencimiento() {
        return $this->fechaVencimiento;
    }
    public function getDescripcion(){
    return $this->descripción;
    }

    public function getImg(){
        return $this->img;
    }

    public function getComidas() {
        return $this->comidas;
    }

    public function setIDMenu($ID_menu) {
        $this->ID_menu = $ID_menu;
    }
    public function setNombreMenu($nombre_menu) {
        $this->nombre_menu = $nombre_menu;
    }
    public function setStockMaximo($stockMaximo) {
        $this->stockMaximo = $stockMaximo;
    }
    public function setStockColchon($stockColchon) {
        $this->stockColchon = $stockColchon;
    }
    public function setStockReal($stockReal) {
        $this->stockReal = $stockReal;
    }
    public function setFechaVencimiento($fechaVencimiento) {
        $this->fechaVencimiento = $fechaVencimiento;
    }
    public function setComidas($comidas) {
        $this->comidas = $comidas;
    }

    public function setDescripcion($Descripcion){
        $this->descripción = $descripcion;
    }

    public function setImg($img){
        $this->img = $img;
    }
}



?>