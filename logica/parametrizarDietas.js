const formuDieta = document.getElementById("dietas-form");
formuDieta.addEventListener("submit", function (e) {
  e.preventDefault();
  const datos = new FormData(formuDieta);
  fetch("../persistencia/addDieta.php", {
    method: "post",
    body: datos,
  }).then(location.reload());
});

fetch("../persistencia/getDietas.php")
  .then((r) => r.json())
  .then((r) => {
    r.forEach((dieta) => {
      const nombre = dieta.Tipodieta;
      const id = dieta.IDDieta;
      const dietaHTML = `
          <article class="dieta">
          <h1>${nombre}</h1>
          <br />
          <section id="botones">
          <button class="btnPrimario" data-nombre="${nombre}" data-id="${id}" onclick="modificarDieta(this)">Modificar</button>
          <button class="btnPrimario" onclick="eliminarDieta(${id})">Eliminar</button>
          </section>
          </article>
          `;
      $("#listado-dietas").append(dietaHTML);
    });
  });

function eliminarDieta(id) {
  const datos = new FormData();
  datos.append("id", id);
  fetch("../persistencia/eliminarDieta.php", {
    method: "post",
    body: datos,
  })
    .then((r) => r.text())
    .then((r) => {
      if (r == "1") {
        location.reload(r);
      } else {
        alert(r);
      }
    });
}

function modificarDieta(element) {
  var nombre = $(element).attr("data-nombre");
  var id = $(element).attr("data-id");
  var article = element.closest(".dieta");
  var h1 = article.querySelector("h1");

  // Create a new input element
  var input = document.createElement("input");
  input.type = "text";
  input.value = nombre;
  input.id = "nombre-input-" + id; // Give a unique ID to the input

  // Replace the h1 with the new input
  article.replaceChild(input, h1);

  // Change the "Modificar" button to a new button
  element.textContent = "Guardar"; // Change the button text to something like 'Guardar Cambios'
  element.onclick = function () {
    sendModificacion(id, input.value);
  }; // Assign a new onclick function
}

function sendModificacion(id, nombreNuevo) {
  const datos = new FormData();
  datos.append("id", id);
  datos.append("dieta", nombreNuevo);
  fetch("../persistencia/modDieta.php", {
    method: "post",
    body: datos,
  }).then(location.reload());
}
