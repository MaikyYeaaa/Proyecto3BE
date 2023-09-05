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
      .then((r) => r.text())
      .then((r) => {
        console.log(r);
        if (r == "true") {
          alert("Mail actualizado correctamente");
          window.open("perfil.html");
          window.close();
        } else {
          alert(`error!! -> ${r}`);
        }
      });
  } else {
    alert(`to mal`);
  }
});

async function noExiste(datos) {
  const respuesta = await fetch("../persistencia/getCuentas.php");
  const json = await respuesta.json();
  let retorno = true;
  json.forEach((user) => {
    if (user.Mail == datos.get("mail")) {
      retorno = false;
    }
  });
  return retorno;
}

function esValido(datos) {
  const mail = datos.get("mail");

  const mailV = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const mailVerif = mailV.test(mail);
  return mailVerif;
}
