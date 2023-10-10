import { mostrarNotif } from "../scripts/functionsVarias.js";

let formulario = document.getElementById("ticket");

formulario.addEventListener("submit", async function (e) {
  e.preventDefault();

  let datos = new FormData(formulario);
  const id = localStorage.getItem("id");
  datos.append("id", id);

  fetch("../persistencia/ticket.php", {
    method: "POST",
    body: datos,
  })
    .then((r) => r.text())
    .then((r) => {
      console.log(r);
      mostrarNotif("correcto", "Ticket creado correctamente");
    });
});

async function agarrarOPT() {
  const respuesta = await fetch("../persistencia/getTicketOPT.php");
  const r = await respuesta.json();
  console.log(r);
  let retorno = "";
  r.forEach((r) => {
    retorno += `<option value="${r.NombreRazon}">${r.NombreRazon}</option>`;
  });
  return retorno;
}

agarrarOPT().then((mostrar) => {
  $("select").html(mostrar);
});

// <!-- <option value="valor1">Seleccione la razon</option> -->
// <option value="pedido">Problemas con un pedido</option>
// <option value="cuenta">Problemas con la cuenta</option>
// <option value="otro">Otra</option>
