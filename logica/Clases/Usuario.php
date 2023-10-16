<?php
require "../persistencia/helperFunctions.php";

class Usuario {

    public $IDUser;
    public $Nombre;
    public $Contrasena;
    public $Rol;
    public $Mail;

    public function __construct($IDUser, $Nombre, $Contrasena, $Rol, $Mail) {
        $this->IDUser = $IDUser;
        $this->Nombre = $Nombre;
        $this->Contrasena = $Contrasena;
        $this->Rol = $Rol;
        $this->Mail = $Mail;
    }

    public function getIDUser() {
        return $this->IDUser;
    }

    public function setIDUser($IDUser) {
        $this->IDUser = $IDUser;
    }

    public function getNombre() {
        return $this->Nombre;
    }

    public function setNombre($Nombre) {
        $this->Nombre = $Nombre;
    }

    public function getContrasena() {
        return $this->Contrasena;
    }

    public function setContrasena($Contrasena) {
        $this->Contrasena = $Contrasena;
    }

    public function getRol() {
        return $this->Rol;
    }

    public function setRol($Rol) {
        $this->Rol = $Rol;
    }

    public function getMail() {
        return $this->Mail;
    }

    public function setMail($Mail) {
        $this->Mail = $Mail;
    }

    public function sendBDD() {
        $con = conectarBDD();
        $sql = "INSERT INTO `usuario`(`IDUser`, `Nombre`, `Contrasena`, `Rol`, `Mail`) VALUES ('NULL','{$this->getNombre()}','{$this->getContrasena()}','NULL','{$this->getMail()}')";
        if(sendToBDD($sql, $con)) {
            return true;
        }
    }

    public function actualizarUsuario($sql){
        $con = conectarBDD();
        $sql = $sql . " WHERE IDUser = '{$this->getIDUser()}'";
        if(sendToBDD($sql, $con)) {
            return true;
        }
        if($con->error) {
            die($con->error);
        }
        $con->close();
    }

    public function actualizarRol($nuevoRol) {
        $con = conectarBDD();
        $mailEscapado = mysqli_real_escape_string($con, $this->Mail);
        $sql = "UPDATE `usuario` SET `Rol`='$nuevoRol' WHERE Mail = '${mailEscapado}'";

        if (sendToBDD($sql, $con)) {
        }
    
        if ($con->error) {
            die($con->error);
        }
    
        $con->close();
    }

    public static function getByMail($mail) {
        $con = conectarBDD();
        $mailEscapado = mysqli_real_escape_string($con, $mail);
        $sql = "SELECT * FROM `usuario` WHERE Mail = '${mailEscapado}'";
        $result = $con->query($sql);
    
        if ($result && $result->num_rows > 0) {
            $data = $result->fetch_assoc();
            $usuario = new Usuario($data['IDUser'], $data['Nombre'], $data['Contrasena'], $data['Rol'], $data['Mail']);
            return $usuario;
        } else {
            return null;
        }
    }

    public static function getById($id) {
        $con = conectarBDD();
        $idEscapado = mysqli_real_escape_string($con, $id);
        $sql = "SELECT * FROM `usuario` WHERE IDUser = '${idEscapado}'";
        $result = $con->query($sql);
    
        if ($result && $result->num_rows > 0) {
            $data = $result->fetch_assoc();
            $usuario = new Usuario($data['IDUser'], $data['Nombre'], $data['Contrasena'], $data['Rol'], $data['Mail']);
            return $usuario;
        } else {
            return null;
        }
    }
    
    public static function listar() {
        $con = conectarBDD(); 
        $sql = "SELECT * FROM `usuario`";
        $result = $con->query($sql);
    
        $usuarios = array();
    
        while ($data = $result->fetch_assoc()) {
            $usuario = new Usuario($data['IDUser'], $data['Nombre'], $data['Contrasena'], $data['Rol'], $data['Mail']);
            $usuarios[] = $usuario;
        }
    
        $con->close();
        return json_encode($usuarios);
    }

    public static function getLastId() {
        $con = conectarBDD();
        $sql = "SELECT MAX(IDUser) as ultimaID FROM `usuario`";
        $result = $con->query($sql);
    
        if ($result && $data = $result->fetch_assoc()) {
            $con->close();
            return $data['ultimaID'];
        }
    
        $con->close();
        return null;  
    }
    
}
?>
