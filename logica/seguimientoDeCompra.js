
let pedidosCache = [];
let pedidos = [];




function Pedido(_pedidos, _fecha, _estado, _id) {
  this.pedidos = _pedidos;
  this.fecha = _fecha;
  this.estado = _estado;
  this.id = _id;
  this.obtenerInfo = function () {
    return this.nombre + ' ' + this.edad + ' ' + this.nacionalidad;
  };
}


var userid=localStorage.getItem("id");
console.log(userid);

var data = new FormData();
data.append("userId",userid);
fetch("../persistencia/getComprasFromUser.php",{
  method: "POST",
  body: data
})
.then((r)=> r.json())
.then((response)=> {

  response.forEach((pedidoOP) => {
    const foundPedido = pedidos.find((pedido) => pedido.id == pedidoOP.ID);
    if (foundPedido) {
      foundPedido.pedidos = `${foundPedido.pedidos}, ${pedidoOP.MenuNombre}`;
    } else {
      pedidosCache.push(pedidoOP.ID);
      let _p1 = new Pedido(
        `${pedidoOP.MenuNombre}`,
        `${pedidoOP.Fecha}`,
        `${pedidoOP.NombreEstado}`,
        `${pedidoOP.ID}`
      );
      pedidos.push(_p1);
    }
  });
  pedidos.forEach((pedido =>{
    let disabled = "";
    if(pedido.estado === "Cancelado"){
      disabled = "disabled";
    }

    $("#mostrar").append(`     
    
      <br>
      <article id="pedido">
        <section id="info">
          <article id="listName">Pedido: ${pedido.pedidos} 
            </article>
            <article id="listContent">Estado: ${pedido.estado} Fecha: ${pedido.fecha}</article>
            <article id="listExtraContent">Numero de seguimiento #${pedido.id} </article>
          </section>
        <button id="cancelarcompra" class="cancelarcompra" value="${pedido.id}" ${disabled}>Cancelar compra</button>
        <p class="Feedback${pedido.id}"></p>
      </article>`
    
    );
    
  }))
});


$("#mostrar").on("click", ".cancelarcompra", function() {
  const pedidoId = $(this).val();
  let data = new FormData();
  data.append("ID", pedidoId);
  fetch("../persistencia/cancelarCompra.php", {
    method: "POST",
    body: data
  })
  .then((r) => r.text())
  .then((respuesta) => {
    const feedbackSelector = `.Feedback${pedidoId}`; // Construct the correct selector
    console.log(`${respuesta} === "Si"`);
    if (respuesta === `"Si"`) {
      $(feedbackSelector).text("Pudiste");
    } else {
      $(feedbackSelector).text("No pudiste");
    }
  });
});



/*
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
*/