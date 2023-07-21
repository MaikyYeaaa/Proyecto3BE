let formulario = document.getElementById("ticket");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  let datos = new FormData(formulario);

  fetch("../persistencia/userInstance.json")
    .then((r) => r.json())
    .then((r) => {
      var user = r.Nombre;
      datos.append("user", user);

      fetch("../logica/ticket.php", {
        method: "POST",
        body: datos,
      });
    });
});
