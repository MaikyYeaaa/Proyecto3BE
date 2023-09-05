let datos = new FormData();
let id = localStorage.getItem("id");
datos.append("id", id);
console.log(id);

fetch("../persistencia/getPedidosHistorial.php", {
  method: "post",
  body: datos,
})
  .then((r) => r.json())
  .then((r) => {
    r.forEach((pedido) => {
      let idPedido = pedido.ID;
      let fecha = pedido.Fecha;
      let monto = pedido.Monto;
      let tipoPago = pedido.TipoPago;

      let mostrar = `
      <article class="pedido-historial">
      <p id="id">#${idPedido}</p>
      <p id="fecha">${fecha}</p>
      <p id="monto">$${monto}</p>
      <p id="metodo">Metodo de pago: ${tipoPago}</p>
    </article>
      `;
      $("#historial").append(mostrar);
    });
  });
