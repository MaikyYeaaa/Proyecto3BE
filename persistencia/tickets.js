fetch("../persistencia/verTickets.php")
  .then((r) => r.json())
  .then((r) => {
    r.forEach((r) => {
      let id = r.Reclamo.NReclamo;
      let razon = r.Incorpora.NombreRazon;
      let desc = r.Reclamo.DescripcionReclamo;
      let mail = r.Cliente.Mail;
      let idUser = r.id;

      mostrar = `
      <article id="ticketSection">

  <section id="ticketBody">
    <article id="upper">
      <section id="nro">#${id}</section>
    </article>
    <article id="bottom">
      <article id="col1">
        <section id="Motivo">Motivo: ${razon}</section> <!-- En el php, hacer joint para traer el motivo también!!! -->
        <section id="Correo">Correo: ${mail}</section>
        <section id="Mensaje">Mensaje: ${desc}</section>
      </article>
      <article id="col2">
        <button class="callToAction" onclick="finalizarTicket(${id})">Finalizado</button></article>
    </section>
    </article>

        `;
      $("#mostrar").append(mostrar);
    });
  });

function finalizarTicket(id) {
  const confirmar = confirm("seguro que ha finalizado el reclamo?");
  const datos = new FormData();
  datos.append("id", id);
  if (confirmar) {
    fetch("../persistencia/deleteTicketFromId.php", {
      method: "post",
      body: datos,
    })
      .then((r) => r.text())
      .then((r) => {
        if (r) {
          location.reload();
        }
      });
  }
}

// <p>Razon: ${razon}</p>
