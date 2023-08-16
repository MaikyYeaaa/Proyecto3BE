let cambiarContraForm = document.getElementById("cambiarContra-form");
cambiarContraForm.addEventListener("submit", (evento) => {
  evento.preventDefault();

  let datos = new FormData(cambiarContraForm);
  let contraNueva = datos.get("contraNueva");
  let contraNueva2 = datos.get("contraNueva2");

  if (verificador(contraNueva, contraNueva2)) {
    fetch("../persistencia/verificarContra.php", {
      method: "post",
      body: datos,
    })
      .then((respuesta) => respuesta.text())
      .then((r) => {
        if (r) {
          actualizarContra(datos);
        } else {
          alert("la contra no es correcta");
        }
      });
  } else {
    console.log("no verifica");
  }
});

function verificador(contraNueva, contraNueva2) {
  if (contraNueva == contraNueva2) {
    return true;
  }
}

function actualizarContra(datos) {
  fetch("../persistencia/actualizarContra.php", {
    method: "post",
    body: datos,
  })
    .then((r) => r.text())
    .then((r) => {
      if (r) {
        alert("listo!");
      } else {
        alert("no funco");
      }
    });
}
