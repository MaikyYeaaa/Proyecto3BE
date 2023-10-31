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
        $result = getFromBDD($sql,$con);
        echo json_encode($result);
    }

    public static function updatePedido($state,$id){
        $con = conectarBDD();
        $sql = "UPDATE `tiene` SET `NombreEstado`='$state' WHERE `ID` = $id";
        $resultos = sendToBDD($sql,$con);
        echo json_encode($resultos);
    }

    public static function getPedidoFromUser($userID){
        $con = conectarBDD();
        $sql = "SELECT * FROM vistapedidos where ID_Cliente = $userID";
        $result = getFromBDD($sql,$con);
        echo json_encode($result);
    }
}
?>