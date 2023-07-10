$("#btn").click(mostrarTabla);

function mostrarTabla() {
    $("#Pedidos").html("");
    fetch("../../logica/ObtenerPedidos.php")
        .then((r) => r.json())
        .then((r) => {
            const pedidos = Object.values(r);
            let cont = 0;
            pedidos.forEach((pedido) => {
                if(pedido.Estado === "DESCONOCIDO"){
                    $("#Pedidos").append(`<tr> <br> <td> ${pedido.Nombre}</td> <td> ${pedido.Creador} <td> <input type="submit" value="Aceptar" name="${pedido.Id}">  <input type="submit" value="Rechazar"  name="${pedido.Id}"> <br> </tr> <br>`);
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
    $.ajax({
        url: "../../logica/ModificarPedidos.php", // Update the URL to the correct PHP file
        type: "POST",
        data: { posicion: nombre, accion: accion },
    });
    mostrarTabla();
});