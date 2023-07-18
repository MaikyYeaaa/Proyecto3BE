var formulario = document.getElementById("agregarComida");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  let datos = new FormData(formulario);
  fetch("../../logica/addComida.php", {
    method: "POST",
    body: datos,
  })
    .then((r) => r.json())
    .then((r) => {
      const comidas = Object.values(r);
      $("h1").html("comida agregada exitosamente!");
    });
});
