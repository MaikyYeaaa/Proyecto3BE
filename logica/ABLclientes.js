import { mostrarNotif } from "../scripts/functionsVarias.js";

function confirmarCliente(mail) {
  let datos = new FormData();
  datos.append("mail", mail);
  datos.append("valor", "confirmar");
  fetch("../persistencia/modCliente.php", {
    method: "post",
    body: datos,
  })
    .then((r) => r.text())
    .then((r) => {
      if (r == "success") {
        location.reload();
      } else {
        mostrarNotif("error", `${r}`);
      }
    });
}

function denegarCliente(mail) {
  const confirmar = confirm(`¿Seguro quiere denegar a ${mail}?`);
  if (confirmar) {
    let datos = new FormData();
    datos.append("mail", mail);
    datos.append("valor", "none");
    fetch("../persistencia/modCliente.php", {
      method: "post",
      body: datos,
    })
      .then((r) => r.text())
      .then((r) => {
        if (r == "success") {
          location.reload();
        } else {
          mostrarNotif("error", `${r}`);
        }
      });
  }
}

fetch("../persistencia/Lclientes.php")
  .then((r) => r.json())
  .then((r) => crearCliente(r));

function crearCliente(r) {
  r.forEach((cliente) => {
    console.log(cliente);
    const elementoHTML = `
    <section class="cliente">
              <p id="mail">${cliente.Mail}</p>
              <article id="botones">
                <img src="../src/mdi_cancel-outline.svg" onclick="denegarCliente('${cliente.Mail}')"/>
                <img src="../src/typcn_tick-outline.svg" onclick="confirmarCliente('${cliente.Mail}')"/>
              </article>
            </section>
    `;
    $("#listado").append(elementoHTML);
  });
}
window.confirmarCliente = confirmarCliente;
window.denegarCliente = denegarCliente;
