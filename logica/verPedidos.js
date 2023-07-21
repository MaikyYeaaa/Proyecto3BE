
mostrarTabla();
function mostrarTabla() {
    $("#Pedidos").html("");
    fetch("../../logica/ObtenerPedidos.php")
        .then((r) => r.json())
        .then((r) => {
            const pedidos = Object.values(r);
            let cont = 0;
            pedidos.forEach((pedido) => {
                if(pedido.Estado === "Solicitado"){
                    $("#Pedidos").append(`<tr> <br> <td> ${pedido.Nombre}</td> <td> ${pedido.FechaInicio} <td> <input type="submit" value="Confirmado" name="${pedido.Id}">  <input type="submit" value="Rechazado"  name="${pedido.Id}"> <br> </tr> <br>`);
                }
                
            });
            if(cont == 0){
                $("#feedback").html("No quedan pedidos en revisión");
            }
        });
}

$(document).on("click", "#tabla-pedidos input[type='submit']", function(e) {
    e.preventDefault();
    let nombre = $(this).attr("name");
    let accion = $(this).attr("value");
    let  fechaActual = new Date();
    let diaActual = fechaActual.getDay()+1;
    let mesActual = fechaActual.getMonth() + 1;
    let añoActual = fechaActual.getFullYear();
  let dateOutput = diaActual + "/" + mesActual + "/" + añoActual;
    $.ajax({
        url: "../../logica/ModificarPedidos.php", // Update the URL to the correct PHP file
        type: "POST",
        data: { posicion: nombre, accion: accion,date: dateOutput},
    });
    mostrarTabla();
});