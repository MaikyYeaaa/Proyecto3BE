$("#btnNotif").click(mostrarTabla);




function mostrarTabla() {
    $("#Notif").html("");
    fetch("../../logica/obtenerNotif.php")
        .then((r) => r.json())
        .then((r) => {
            const Notificaciones = Object.values(r);
            Notificaciones.forEach((notif) => {
                    $("#Notif").append(`<tr> <br> <td> ${notif.Nombre}</td> <td> ${notif.FechaInicio} <td> <button>Reponer</button>
                   <br> </tr> <br>`);
            });
        });
}


$(document).on("change", "#Notif", function() {
    let nombre = $(this).attr("name");
    let accion = "Respondido";
    let  fechaActual = new Date();
    let diaActual = fechaActual.getDate()+1;
    let mesActual = fechaActual.getMonth() + 1;
    let añoActual = fechaActual.getFullYear();
    let dateOutput = diaActual + "/" + mesActual + "/" + añoActual;
    $.ajax({
        url: "../../logica/responderNotif.php",
        type: "POST",
        data: { posicion: nombre, accion: accion,date: dateOutput},
    });
    mostrarTabla();
    
});
