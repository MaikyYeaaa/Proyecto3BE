<?php
require "helperFunctions.php";
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true); 
$id = $data["id"]; 

writeToJSON("menuIndex.json", $id);

echo json_encode($id); 
?>