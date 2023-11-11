<?php
require "../persistencia/helperfunctions.php";

class Vianda {
    private $NroVianda;
    private $FechaVencimiento;

    // Constructor
    public function __construct($NroVianda, $FechaVencimiento) {
        $this->NroVianda = $NroVianda;
        $this->FechaVencimiento = $FechaVencimiento;
    }

    // Getter para NroVianda
    public function getNroVianda() {
        return $this->NroVianda;
    }

    // Setter para NroVianda
    public function setNroVianda($NroVianda) {
        $this->NroVianda = $NroVianda;
    }

    // Getter para FechaVencimiento
    public function getFechaVencimiento() {
        return $this->FechaVencimiento;
    }

    // Setter para FechaVencimiento
    public function setFechaVencimiento($FechaVencimiento) {
        $this->FechaVencimiento = $FechaVencimiento;
    }

    public function getAllViandasEnStock?(){
        $con = conectarBDD();
        $sql = "";
    }


}



?>