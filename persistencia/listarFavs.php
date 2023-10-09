<?php
require "helperFunctions.php";

$array = getArrayFromJSON("menuIndex.json");

echo json_encode($array);
?>