<?php
require "../persistencia/helperFunctions.php";

class Cliente {
    
    public $Nro;
    public $Mail;
    public $Autoriado;
    public $Telefono;
    public $Dir;

    public function __construct($Nro = null, $Mail = null, $Autoriado = null, $Telefono = null, $Dir = null) {
        $this->Nro = $Nro;
        $this->Mail = $Mail;
        $this->Autoriado = $Autoriado;
        $this->Telefono = $Telefono;
        $this->Dir = $Dir;
    }

    public function getNro() {
        return $this->Nro;
    }

    public function setNro($Nro) {
        $this->Nro = $Nro;
    }

    public function getMail() {
        return $this->Mail;
    }

    public function setMail($Mail) {
        $this->Mail = $Mail;
    }

    public function getAutoriado() {
        return $this->Autoriado;
    }

    public function setAutoriado($Autoriado) {
        $this->Autoriado = $Autoriado;
    }

    public function getTelefono() {
        return $this->Telefono;
    }

    public function setTelefono($Telefono) {
        $this->Telefono = $Telefono;
    }

    public function getDir() {
        return $this->Dir;
    }

    public function setDir($Dir) {
        $this->Dir = $Dir;
    }

    public function actualizarAutorizado($valor) {
        $con = conectarBDD();
        $mailEnviado = mysqli_real_escape_string($con, $this->Mail);
        $sql = "UPDATE `cliente` SET `Autorizado`='$valor' WHERE Mail = '${mailEnviado}'";

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
        $sql = "SELECT * FROM `cliente` WHERE Mail = '${mailEscapado}'";
        $result = $con->query($sql);
    
        if ($result && $result->num_rows > 0) {
            $data = $result->fetch_assoc();
            $cliente = new Cliente($data['Nro'], $data['Mail'], $data['Autorizado'], $data['Telefono'], $data['Dir']);
            return $cliente;
        } else {
            return null;  
        }
    }
    
    public static function getById($id) {
        $con = conectarBDD();  
        $idEscapado = mysqli_real_escape_string($con, $id);
        $sql = "SELECT * FROM `cliente` WHERE Nro = '${idEscapado}'";
        $result = $con->query($sql);
    
        if ($result && $result->num_rows > 0) {
            $data = $result->fetch_assoc();
            $cliente = new Cliente($data['Nro'], $data['Mail'], $data['Autorizado'], $data['Telefono'], $data['Dir']);
            return json_encode($cliente);
        } else {
            return null;  
        }
    }
    
    public static function listarAll($param) {
        $con = conectarBDD();
        
            $sql = "SELECT * FROM `cliente`" . $param;
        
        $data = getFromBDD($sql, $con);
        $con->close();
    
        $clientes = array();
        
        foreach ($data as $row) {
            $cliente = new Cliente($row['Nro'], $row['Mail'], $row['Autorizado'], $row['Dir'], $row['Telefono']);
            $clientes[] = $cliente;
        }
    
        return json_encode($clientes);
    }
}

?>
