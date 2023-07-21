// fetch("../persistencia/userInstance.json")
//   .then((r) => r.json())
//   .then((r) => {
//     r.forEach((pedido) => {
//         user = r.Nombre;
//     })
//   });

fetch("../persistencia/userInstance.json")
  .then((r) => r.json())
  .then((r) => {
    var user = r.Nombre;

    fetch("../persistencia/pedidos.json")
      .then((pedidos) => pedidos.json())
      .then((pedidos) => {
        pedidos.forEach((p) => {
          userPedido = p.Creador;
          fechaInicio = p.FechaInicio;
          let mostrar = "";
          if (user == userPedido) {
            mostrar += `
            Pedido: ${p.Nombre} <br>
            estado del pedido: ${p.Estado}
            <br>
            <input type="submit" value="cancelar compra" data-fecha="${fechaInicio}" onclick="cancelarCompra(this)"/>
            <br><br>
            `;
          }
          $("#mostrar").append(mostrar);
        });
      });
  });

function cancelarCompra(boton) {
  let fechaInicio = $(boton).attr("data-fecha");
  let fechaActual = getDateOp();

  console.log(fechaInicio, fechaActual);

  if (fechaInicio == fechaActual) {
    console.log("aca se puede");
  } else {
    console.log("aca no pq se paso de las 24horas");
  }
}

//function made by german:
function getDateOp() {
  let fechaActual = new Date();
  let diaActual = fechaActual.getDate();
  let mesActual = fechaActual.getMonth() + 1;
  let añoActual = fechaActual.getFullYear();
  return diaActual + "/" + mesActual + "/" + añoActual;
}
