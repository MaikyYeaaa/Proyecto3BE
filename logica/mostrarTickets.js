fetch("../persistencia/tickets.json")
  .then((r) => r.json())
  .then((r) => {
    r.forEach((r) => {
      let id = r.id;
      let razon = r.razon;
      let desc = r.descripcion;

      mostrar = `
      <article>
      <p>id: ${id}</p>
      <p>Razon: ${razon}</p>
      <p>descripcion: ${desc}</p>
        <input type="submit" value="atender" onclick="abrirTicket()">
      </article>
        `;
      $("#mostrar").append(mostrar);
    });
  });

function abrirTicket() {
  console.log("ticket abiertado");
}
