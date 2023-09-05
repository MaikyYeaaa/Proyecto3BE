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
        alert("Direccion actualizado correctamente");
        window.open("perfil.html");
        window.close();
      } else {
        alert(`error!! -> ${r}`);
      }
    });
});
