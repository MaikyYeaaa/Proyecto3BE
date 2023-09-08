import { mostrarNotif } from "../scripts/functionsVarias.js";

const formulario = document.getElementById("cambiarDir-form");
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  const datos = new FormData(formulario);
  const id = localStorage.getItem("id");
  datos.append("id", id);

  fetch("../persistencia/actualizarDir.php", {
    method: "post",
    body: datos,
  })
    .then((r) => r.text())
    .then((r) => {
      console.log(r);
      if (r == "true") {
        mostrarNotif("correcto", "Direccion actualizada correctamente", 500);
        setTimeout(() => {
          window.open("perfil.html");
          window.close();
        }, 500);
      } else {
        mostrarNotif("error", r, 3000);
      }
    });
});
