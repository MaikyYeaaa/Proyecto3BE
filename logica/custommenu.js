var comidas = [];
var comidasTope = 0;
$("#btnCompra").prop("disabled", "disabled");

$("#pedido").on('change', function() {
    var valor = $(this).val();
    dibujarTabla(getNumero(valor));
});

$("#btnCompra").click(getPagoDatos);

function getNumero(tipo) {
    switch (tipo) {
        case "Semanal":
            comidasTope = 5;
            return 5;
        case "Mensual":
            comidasTope = 20;
            return 20;
        case "Quincenal":
            comidasTope = 15;
            return 15;
        default:
            return 0;
    }
}

function dibujarTabla(numero) {
    $("#menu-editor").html("");
    comidas = [];
    for (var i = 0; i < numero; i++) {
        $("#menu-editor").append(`<tr> <br> <td>Comida ${i + 1}</td><td id="comida_${i}">Empty</td> <td><input type="submit" value="Modificar Comida" class="modificar-comida" data-index="${i}"></input></td><br>`);
    }
}

$(document).on("click", ".modificar-comida", function() {
    var rowIndex = $(this).data("index");
    dibujarTablaComidas(rowIndex);
});

$(document).on("click", ".confirmado-button", function() {
    var comidaId = $(this).attr("name");
    var rowIndex = $(this).data("index");
    var comidaNombre = $(this).data("nombre");
    $("#comida_" + rowIndex).text(comidaNombre);
    comidas[rowIndex] = comidaNombre;
    $("#comida-editor").html("");
    console.log(comidas);
});

function dibujarTablaComidas(rowIndex) {
    $("#feedback").html("");
    $("#comida-editor").html("");
    fetch("../../logica/getComidas.php")
        .then((r) => r.json())
        .then((response) => {
            const comidaArray = Object.values(response);
            comidaArray.forEach((comida, index) => {
                $("#comida-editor").append(`<tr> <br> <td> ${comida.nombre_comida}</td> <td> ${comida.descripcion} <td> <input type="submit" value="Agregar" class="confirmado-button" name="${comida.id_comida}" data-index="${rowIndex}" data-nombre="${comida.nombre_comida}"></tr> <br>`);
            });
        });
}

$("#confirmar").click(crearMenu);

function crearMenu() {
    if (esPosible()) {
        $("#btnCompra").prop("disabled", false);

    } else {
    }
  }

function esPosible() {
    if(comidas.length<=1){
        return false;
    }
    for (var i = 0; i < comidasTope; i++) {
        if (comidas[i] == null) {
            return false;
        }
    }
    return true;
}







function getPagoDatos(){
    let metodoPago = $("#Tipo").val();
    let tarjeta = Number($("#tarjeta").val());
    let pin = Number($("#pin").val());

    if(validarCompra(tarjeta,pin)){
        $("#compra-feedback").html("Compra realizada!");
        let multiplicador = $("#multi").val();
        var data = new FormData();
        console.log(comidas);
        data.append("platos",comidas); 
        data.append("multi",multiplicador); 
          fetch("../../logica/crearPedido.php", {
            method: "POST",
            body:data,
          })
            .then((r) => r.text())
            .then((response) => {
              const pedidos = Object.values(response);
              $("h1").html("Comida agregada exitosamente!");
            });
    }else{
        $("#compra-feedback").html("Rellena todos los campos");
    }

}

function validarCompra(tarjeta,pin){
    let validación = true;//La validación de la compra se hace por medio de la API del metodo de pago
    if((tarjeta == 0) || (pin == 0)){
        return false;
    }else if(validación){
        return true;
    }
}