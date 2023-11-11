<?php
require "helperFunctions.php";
$faq= $_POST["faq"];
$jsonURL= '../persistencia/faq.json';
$faqs= $faq;

if(writeToJSON($jsonURL, $faqs)){
    echo $faq ." añadida correctamente.";
} else{
    echo "FAQ no se puede añadir";
}



?>