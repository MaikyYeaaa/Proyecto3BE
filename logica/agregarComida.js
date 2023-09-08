import { mostrarNotif } from "../scripts/functionsVarias.js";

fetch("../persistencia/getDietas.php")
  .then((r) => r.json())
  .then((r) => {
    let mostrar = "";
    r.forEach((r) => {
      let id = r.IDDieta;
      let tipo = r.Tipodieta;
      mostrar += `
      <option value="${tipo}">${tipo}</option>
      `;
    });
    $("#dietaSelect").html(mostrar);
  });

var formulario = document.getElementById("agregarComida");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  let datos = new FormData(formulario);
  fetch("../persistencia/addComida.php", {
    method: "POST",
    body: datos,
  })
    .then((r) => r.text())
    .then((r) => {
      console.log(r);
      if (r == "correcto") {
        mostrarNotif("correcto", `comida agregada exitosamente!`);
        setInterval(() => {
          location.reload();
        }, 1500);
      } else {
        mostrarNotif("error", `${r}, Intente nuevamente`);
        setInterval(() => {
          location.reload();
        }, 3000);
      }
      // const comidas = Object.values(r);
      // $("h1").html("comida agregada exitosamente!");
    });
});
