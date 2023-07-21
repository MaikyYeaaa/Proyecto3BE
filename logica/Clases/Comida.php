<?php

class Comida {
    private $id_comida;
    private $nombre_comida;
    private $descripcion;
    private $imagenURL;

    public function __construct($id_comida, $nombre_comida, $descripcion, $imagenURL) {
        $this->id_comida = $id_comida;
        $this->nombre_comida = $nombre_comida;
        $this->descripcion = $descripcion;
        $this->imagenURL = $imagenURL;
    }
    
public function getId_comida() {
    return $this->id_comida;
}

public function setId_comida($id_comida) {
    $this->id_comida = $id_comida;
}

public function getNombre_comida() {
    return $this->nombre_comida;
}

public function setNombre_comida($nombre_comida) {
    $this->nombre_comida = $nombre_comida;
}

public function getDescripcion() {
    return $this->descripcion;
}

public function setDescripcion($descripcion) {
    $this->descripcion = $descripcion;
}

public function getImagenURL() {
    return $this->imagenURL;
}

public function setImagenURL($imagenURL) {
    $this->imagenURL = $imagenURL;
}

}

?>