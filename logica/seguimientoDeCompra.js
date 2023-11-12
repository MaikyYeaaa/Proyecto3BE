var userid = localStorage.getItem("id");
console.log(userid);

$("#filtroCancelados").change(function () {
  if ($(this).prop("checked")) {
    getAllPedidosFromUser(userid, true);
  } else {
    getAllPedidosFromUser(userid, false);
  }
});

function getAllPedidosFromUser(userID, checkbox) {
  $("#mostrar").html("");
  if (checkbox === undefined) {
    checkbox = false;
  }
  var idAux = -2;
  var iterations = 0;
  let data = new FormData();
  data.append("userID", userID);
  fetch("../persistencia/getPedidosFromUserID.php", {
    method: "POST",
    body: data,
  })
    .then((r) => r.json())
    .then((r) => {
      r.forEach((pedido) => {
        let disabled = "";
        if (pedido.Estado_Pedido === "Cancelado") {
          disabled = "disabled";
        }

        if (idAux == pedido.ID_Pedido) {
          if (iterations <= 2) {
            iterations++;
            $(`#PedidoPedidosList${idAux}`).append(`, ${pedido.Nombre_Menu}`);
            console.log("repetidoop on " + `#PedidoPedidosList${idAux} adding ${pedido.Nombre_Menu} to the list`);
          }
        } else {
          iterations = 0;
          idAux = pedido.ID_Pedido;
          console.log(pedido.Estado_Pedido);
          console.log(checkbox);
          if (pedido.Estado_Pedido !== "Cancelado") {
            $("#mostrar").append(`
            <section id="PedidoBody">
            <article id="col1">
            <section id="PedidoIMG"><img src="${pedido.Imagen_Menu}" alt="" srcset="" id="pimg"></section>
            <article id="pedidoInfo">Pedido#${pedido.ID_Pedido}</article>
            <article id="pedidoDate">${pedido.Fecha_Inicio_Estado}</article>
            </article>
            <article id="col2">
            <section id="PedidoStateVar">
            <artcile id="PedidoState">${pedido.Estado_Pedido}</artcile>
            <article id="PedidoSvg"><img src="${getIcon(pedido.Estado_Pedido)}" alt="icon" srcset="" id="svg"></article>
            </section>
            <section id="PedidoPedidosList${pedido.ID_Pedido}">${pedido.Nombre_Menu}</section>
            </article>
            <artcile id="col3"><button class="cancelButton" onClick="cancelCompra(${pedido.ID_Pedido},'holanda')"${disabled}>cancelar pedido</button></artcile>
            </section> 
            `);
          }
          if (pedido.Estado_Pedido == "Cancelado" && checkbox) {
            $("#mostrar").append(`
            <section id="PedidoBody">
            <article id="col1">
            <section id="PedidoIMG"><img src="${pedido.Imagen_Menu}" alt="" srcset="" id="pimg"></section>
            <article id="pedidoInfo">Pedido#${pedido.ID_Pedido}</article>
            <article id="pedidoDate">${pedido.Fecha_Inicio_Estado}</article>
            </article>
            <article id="col2">
            <section id="PedidoStateVar">
            <artcile id="PedidoState">${pedido.Estado_Pedido}</artcile>
            <article id="PedidoSvg"><img src="${getIcon(pedido.Estado_Pedido)}" alt="icon" srcset="" id="svg"></article>
            </section>
            <section id="PedidoPedidosList${pedido.ID_Pedido}">${pedido.Nombre_Menu}</section>
            </article>
            <artcile id="col3"><button class="cancelButton" onClick="cancelCompra(${pedido.ID_Pedido},'holanda')"${disabled}>cancelar pedido</button></artcile>
            </section> 
            `);
          }
        }
      });
    });
}

getAllPedidosFromUser(userid);

function getIcon(state) {
  switch (state) {
    case "Solicitado":
      return `../src/Clock.svg`;
      break;
    case "Confirmado":
      return `../src/checkmark.svg`;
      break;
    case "Enviado":
      return `../src/DeliveryTruck.svg`;
      break;
    case "Entregado":
      return `../src/Package.svg`;
      break;
    case "Rechazado":
      return `../src/cross.svg`;
      break;
    case "Cancelado":
      return `../src/cross.svg`;
      break;
  }
}

/* CODIGO SEGUNDA ENTREGA!



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
            <p class="Feedback${pedido.id}" id="feedback"></p>
          </section>
        <button id="cancelarcompra" class="cancelarcompra" value="${pedido.id}" ${disabled} >Cancelar compra</button>
        
      </article>`
    
    );
    
  }))
});









*/

function cancelCompra(pedidoId, currentState) {
  if (confirm("¿Estás seguro que quieres cancelar el pedido?")) {
    console.log("holanda " + currentState);
    let data = new FormData();
    data.append("ID", pedidoId);
    data.append("currentState", currentState);
    console.log(pedidoId);
    fetch("../persistencia/cancelarCompra.php", {
      method: "POST",
      body: data,
    })
      .then((r) => r.text())
      .then((respuesta) => {
        const feedbackSelector = `.Feedback${pedidoId}`; // Construct the correct selector
        console.log(`${respuesta} === "Si"`);
        if (respuesta === `"Si"`) {
          location.reload();
          console.log("SSSSSSSIIIIIIIIIIII");
        } else {
          $(feedbackSelector).text("No es posible cancelar el pedido ya que fue realizado hace más de 24 horas");
        }
      });
  }
}

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
*/
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
