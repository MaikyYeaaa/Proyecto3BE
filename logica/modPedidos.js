console.log("holanda");
function mostrarTabla() {
  $("#pedidos").html("");

  fetch("../persistencia/getPedidos.php")
    .then((r) => r.json())
    .then((r) => {
      console.log(r);
      const pedidos = Object.values(r);
      pedidos.forEach((pedido, index) => {
        let pedidoData = new FormData();
        pedidoData.append("ID", pedido.ID);
        fetch("../persistencia/getNombrePedidos.php", {
          method: "POST",
          body: pedidoData,
        })
          .then((q) => q.json())
          .then((q) => {
            console.log(q);
            $("#pedidos").append(`
            
                <section id="pedidoBody">
            <article id="pedidoImg"><img id="imgico" src="${q[0].MenuIMG}"></article>
            <article id="pedidoInfo">
                <section id="nroPedido">Pedido#${pedidos[index].ID}</section>
                <section id="menusPedido">${q[0].Nombre}</section>
                <section id="menuFecha">${pedido.FechaInicio}</section>
            </article>
            <article id="pedidoInputs">
              <button class="aceptar" id="aceptar" value="${pedido.ID}"><img class="svgbutton" src="../src/checkmark.svg" alt="aceptar" srcset=""></button>
              <button class="rechazar" id="rechazar" value="${pedido.ID}"> <img class="svgbutton" src="../src/remove.svg" alt="" srcset=""> </button>
            </article>
          </section>
             `);
          });
      });
    });
}

$("#stockcontainer").on("click", ".aceptar", function () {
  const pedidoId = $(this).val();
  console.log("Aceptar el pedido #" + pedidoId);
  modificarEstado("Confirmado", pedidoId);
});

$("#stockcontainer").on("click", ".rechazar", function () {
  const pedidoId = $(this).val();
  console.log("Rechazar el pedido #" + pedidoId);
  modificarEstado("Rechazado", pedidoId);
});

mostrarTabla();

$(document).on("change", "#pedido", function () {
  let pos = $(this).attr("name");
  let accion = $(this).val();
  let condicionID;
  switch (accion) {
    case "Confirmado":
      condicionID = 2;
      break;
    case "Rechazado":
      condicionID = 6;
      break;
  }

  console.log(condicionID);
});

function getBoxValues(value, pedido) {
  console.log(value);
  switch (value) {
    case "DESCONOCIDO":
      return `<select name="${pedido.ID}" id="pedido">
        <option value="Solicitado">Solicitado</option>
        <option value="Confirmado">Confirmado</option>
        <option value="Enviado">Enviado</option>
        <option value="Entregado">Entregado</option>
        <option value="Rechazado">Rechazado</option>
      </select>`;
      break;

    case "Solicitado":
      return `<select name="${pedido.ID}" id="pedido">
        <option value="Solicitado" data-value-vianda="0" >Solicitado</option>
        <option value="Confirmado" data-value-vianda="2" >Confirmado</option>
        <option value="Rechazado" data-value-vianda="6">Rechazado</option>
      </select>`;
      break;

    case "Confirmado":
      return `<select name="${pedido.ID}" id="pedido">
        <option value="Confirmado">Confirmado</option>
      </select>`;
      break;

    case "Enviado":
      return `<select name="${pedido.ID}" id="pedido">
        <option value="Enviado">Enviado</option>
      </select>`;
      break;

    case "Entregado":
      return `<select name="${pedido.ID}" id="pedido">
        <option value="Entregado">Entregado</option>
      </select>`;
      break;

    case "Rechazado":
      return `<select name="${pedido.ID}" id="pedido">
        <option value="Rechazado">Rechazado</option>
      </select>`;
      break;

    default:
      return `<select name="${pedido.ID}" id="pedido">
        <option value="Solicitado">Solicitado</option>
        <option value="En-Stock">En Stock</option>
        <option value="En-Producción">En producción</option>
        <option value="Envasado">Envasado</option>
        <option value="Entregado">Entregado</option>
        <option value="Devuelto">Devuelto</option>
        <option value="Desechado">Desechado</option>
      </select>`;
  }
}

function modificarEstado() {
  fetch("../persistencia/getStock.php")
    .then((r) => r.text())
    .then((r) => {
      console.log(r);
    });
}

/*
function modificarEstado(estado, pos) {
  var data = new FormData();
  data.append("posicion", pos);
  data.append("accion", estado);

  le
  fetch("../persistencia/getStockById.php")


  fetch("../persistencia/ModPedidos.php", {
    method: "POST",
    body: data,
  })
    .then((r) => r.text())
    .then((data) => {
      console.log(data);
      var dataVianda = new FormData();
      dataVianda.append("posicion", pos);
      dataVianda.append("conID", estado);
      fetch("../persistencia/ModVianda.php", {
        method: "POST",
        body: dataVianda,
      })
        .then((r) => r.text())
        .then((data) => {
          console.log(data);
          //mostrarTabla();
        });
    });
}*/
