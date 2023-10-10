<?php

require_once 'Cliente.php';

class Empresa extends Cliente {
    private $Nombre;
    private $Rut;

    public function __construct($Nro, $Mail, $Autoriado, $tel, $dir, $Nombre, $Rut) {
        parent::__construct($Nro, $Mail, $Autoriado, $tel, $dir);
        $this->Nombre = $Nombre;
        $this->Rut = $Rut;
    }

    // Getters y setters para Nombre
    public function getNombre() {
        return $this->Nombre;
    }

    public function setNombre($Nombre) {
        $this->Nombre = $Nombre;
    }

    // Getters y setters para Rut
    public function getRut() {
        return $this->Rut;
    }

    public function setRut($Rut) {
        $this->Rut = $Rut;
    }
}

?>
