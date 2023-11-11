<?php

require_once 'Cliente.php';

class Web extends Cliente {
    public $CI;
    public $Nombre;
    public $Apellido;

    public function __construct($Nro, $Mail, $Autoriado, $tel, $dir, $CI, $Nombre, $Apellido) {
        parent::__construct($Nro, $Mail, $Autoriado, $tel, $dir);
        $this->CI = $CI;
        $this->Nombre = $Nombre;
        $this->Apellido = $Apellido;
    }

    // Getters y setters para CI
    public function getCI() {
        return $this->CI;
    }

    public function setCI($CI) {
        $this->CI = $CI;
    }

    // Getters y setters para Nombre
    public function getNombre() {
        return $this->Nombre;
    }

    public function setNombre($Nombre) {
        $this->Nombre = $Nombre;
    }

    // Getters y setters para Apellido
    public function getApellido() {
        return $this->Apellido;
    }

    public function setApellido($Apellido) {
        $this->Apellido = $Apellido;
    }

    public function sendBDD() {
        $con = conectarBDD();
        $sql = "INSERT INTO `web`(`Nro`, `CI`, `Nombre`, `Apellido`) VALUES ('{$this->getNro()}','{$this->getCI()}','{$this->getNombre()}','{$this->getApellido()}')";
        if(sendToBDD($sql, $con)) {
            return true;
        }
    }
}

?>
