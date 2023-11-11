<?php
 class Sucursal{

    private $IDSucursal;
    private $Nombre;
    private $Direccion;
    private $tiempoTurno;
    private $cocinas;


    //Getters
    public function getIdSucursal(){
        return $this-> IDSucursal;
    }

    public function getNombre(){
        return $this-> Nombre;
    }

    public function getDireccion(){
        return $this-> Direccion;
    }

    public function getTiempoTurno(){
        return $this-> tiempoTurno;
    }

    public function getCocinas(){
        return $this-> cocinas;
    }

    //Setters
    public function setIDSucursal($newId){
        $this-> IDSucursal = $newId;
    }

    public function setNombre($newNombre){
        $this-> Nombre = $newNombre;
    }

    public function setDireccion($newDireccion){
        $this-> Direccion = $newDireccion;
    }

    public function setTiempoTurno($newTiempoTurno){
        $this-> tiempoTurno = $newTiempoTurno;
    }

    public function setCocina($newCocinas){
        $this-> cocinas = $newCocinas;
    }

    public function __construct($newID,$newNombre,$newDireccion,$newTiempoTurno,$newCocinas){
        $this -> IDSucursal = $newID;
        $this -> Nombre = $newNombre;
        $this -> Direccion = $newDireccion;
        $this -> tiempoTurno = $newTiempoTurno;
        $this-> cocinas = $newCocinas;
    } 
    // Esta función es indispensable para poder usar el console.log de la clase
    public function __toString() {
        return "Sucursal ID: {$this->IDSucursal}, Nombre: {$this->Nombre}, Direccion: {$this->Direccion}, Tiempo de Turno: {$this->tiempoTurno}, Cocinas: {$this->cocinas}";
    }

}


?>