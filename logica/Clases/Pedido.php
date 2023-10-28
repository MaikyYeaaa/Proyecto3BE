<?php

require_once "../persistencia/helperfunctions.php";

class Pedido{
    private $id;
    
    public function __constructor($newID){
        $this-> id = $newID;
    }

    //Getters
     
    public function getId(){
        return $this-> id;
    }

    //Setters

    public function setId(){
        return $this-> id;
    }


    public static function GetAllPedidos(){
        $con = conectarBDD();
        $sql = "SELECT * FROM vistapedidos";
        $result = getFromBDD($con,$sql);
        echo json_encode($result);
    }
}
?>