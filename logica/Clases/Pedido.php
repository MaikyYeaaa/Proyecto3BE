<?php

ini_set('display_errors', 0);
ini_set('log_errors', 1);

Class pedido{
    private $id = -1;
    private $nombre = "DESCONOCIDO";
    private $creador = "DESCONOCIDO";
    private $estado = "DESCONOCIDO";
    private $coste = -1;
    private $fechaInicio = "---";
    private $fechaFin = "---";
    private $comidas = [];


    //Getters

    function getId(){
        return $this -> id;
    }
    function getNombre(){
        return $this -> nombre;
    }
    function getCreador(){
        return $this-> creador;
    }

    function getEstado(){
        return $this -> estado;
    }

    function getCoste(){
        return $this -> coste;
    }

    function getFechaInicio(){
        return $this -> fechaInicio;
    }

    function getFechaFin(){
        return $this -> fechaFin;
    }

    function getComidas(){
        return $this-> comidas;
    }

    //Setters

    function setId($nuevaID){
        $this -> id = $nuevaID;
    }

    function setNombre($nuevoNombre){
        $this -> nombre = $nuevoNombre;
    }

    function setCreador($nuevoCreador){
        $this -> creador = $nuevoCreador;
    }

    function setEstado($nuevoEstado){
        $this -> estado = $nuevoEstado;
    }

    function setCoste($nuevoCoste){
        $this -> coste = $nuevoCoste;
    }

    function setFechaInicio($nuevafechaInicio){
        $this -> fechaInicio = $nuevafechaInicio;
    }

    function setFechaFin($nuevaFechaFin){
        $this -> fechaFin = $nuevaFechaFin;
    }

    function setComidas($comidas){
        $this -> comidas = $comidas;
    }

    //Constructor

    public function __construct($Id,$nombre,$creador,$estado,$coste,$fechaInicio,$fechaFin,$comidas){
        $this -> Id=$Id;
        $this -> Nombre = $nombre;
        $this -> Creador = $creador;
        $this -> Estado = $estado;
        $this -> Coste = $coste;
        $this -> FechaInicio = $fechaInicio;
        $this -> FechaFin = $fechaFin;
        $this -> Comidas = $comidas;
    }

    public function mostrarInfo(){
        return "El pedido(".$this->id.") pedido por ".$this->creador." está en estado ".$this->estado." aplicado el ".$this -> fechaInicio. " y con un fin en ". $this-> fechaFin;
    }

}

?>