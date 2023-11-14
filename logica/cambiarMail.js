import { mostrarNotif } from "../scripts/functionsVarias.js";

const formulario = document.getElementById("cambiarMail-form");
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  const datos = new FormData(formulario);
  const id = localStorage.getItem("id");
  datos.append("id", id);

  if ((await noExiste(datos)) && esValido(datos)) {
    fetch("../persistencia/actualizarMail.php", {
      method: "post",
      body: datos,
    })
      .then((r) => r.json())
      .then((r) => {
        if (r == true) {
          mostrarNotif("correcto", "Mail actualizado correctamente", 500);
          setTimeout(() => {
            window.open("perfil.html");
            window.close();
          }, 500);
        } else {
          mostrarNotif("error", r);
        }
      });
  }
});

async function noExiste(datos) {
  const respuesta = await fetch("../persistencia/getCuentas.php");
  const json = await respuesta.json();
  let retorno = true;
  json.forEach((user) => {
    if (user.Mail == datos.get("mail")) {
      mostrarNotif("error", "El mail ingresado ya esta registrado en nuestro sistema.");
      retorno = false;
    }
  });
  return retorno;
}

function esValido(datos) {
  const mail = datos.get("mail");

  const mailV = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const mailVerif = mailV.test(mail);
  if (!mailVerif) {
    mostrarNotif("error", "El mail ingresado no es valido.");
  }
  return mailVerif;
}
