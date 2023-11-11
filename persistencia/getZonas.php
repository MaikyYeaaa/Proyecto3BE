<?php
require "helperFunctions.php";
require "../logica/clases/Sucursal.php";

$con = conectarBDD();

$sql = "SELECT * FROM `sucursal`";
$respuesta = getFromBDD($sql, $con);

$sucursales = array(); // Crear un array para almacenar las instancias de Sucursal

$sucursales = array(); // Crear un array para almacenar las instancias de Sucursal

foreach ($respuesta as $fila) {
    // Crear una nueva instancia de Sucursal para cada fila de resultados
    $sucursal = new Sucursal(
        $fila['IDSucursal'],
        $fila['Nombre'],
        $fila['Direccion'],
        $fila['TiempoTurno'],
        $fila['Cocinas']
    );
    $sucursalData = array(
        'IDSucursal' => $sucursal->getIdSucursal(),
        'Nombre' => $sucursal->getNombre(),
        'Direccion' => $sucursal->getDireccion(),
        'TiempoTurno' => $sucursal->getTiempoTurno(),
        'Cocinas' => $sucursal->getCocinas()
    );
    $sucursales[] = $sucursalData; // Agregar el array de datos al array de sucursales
}

// Usar json_encode para convertir el array de datos en JSON
echo json_encode($sucursales);


$con->close();
?>