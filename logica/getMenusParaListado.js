fetch("../persistencia/getMenus.php")
  .then((r) => r.json())
  .then((r) => {
    r.forEach((menu) => {
      let mostrar = `
        <option value="${menu.IDMenu}">${menu.Nombre}</option>
        `;
      $("#p1").append(mostrar);
      $("#p2").append(mostrar);
      $("#p3").append(mostrar);
    });
  });

let formulario = document.getElementById("modificarMenusInicio-form");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  let datos = new FormData(formulario);
  fetch("../persistencia/modificarMenusInicio.php", {
    method: "post",
    body: datos,
  });
});
