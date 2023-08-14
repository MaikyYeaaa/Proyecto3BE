fetch("../persistencia/getTickets.php")
  .then((r) => r.json())
  .then((r) => {
    console.log(r);
    r.forEach((r) => {
      let id = r.NReclamo;
      // let razon = r.razon;
      let desc = r.DescripcionReclamo;
      let mail = r.Mail;

      mostrar = `
      <article>
      <p>#${id}</p>
      <p>Mail: ${mail}</p>
      <p>Descripcion: ${desc}</p>
        <input type="submit" value="RESPONDER" onclick="abrirTicket()">
      </article>
        `;
      $("#mostrar").append(mostrar);
    });
  });

function abrirTicket() {
  console.log("ticket abiertado");
}

// <p>Razon: ${razon}</p>
