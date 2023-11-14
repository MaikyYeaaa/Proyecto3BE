fetch("../../persistencia/menus.json")
  .then((r) => r.json())
  .then((r) => {
    for (let i = 0; i < r.length; i++) {
      let id_menu = r[i].id_menu;
      let nombre_menu = r[i].nombre_menu;
      let descripcion = r[i].descripcion;
      let comidas = r[i].comidas;
      let imgURL = r[i].imgURL;

      mostrar = `
          <article>
          <h1>${nombre_menu}</h1>
          <p>Descripcion: ${descripcion}</p>
          <img src="${imgURL}" alt="img no encontrada!" width="100px">
          <p>Incluye: ${comidas}</p>
          <button id="${id_menu}" onclick="eliminarMenu(this)"> Eliminar menu</button>
        </article>
            `;
      $("#mostrar").append(mostrar);
    }
  });

function eliminarMenu(button) {
  const id = button.getAttribute("id");
  var data = new FormData();
  data.append("id", id);

  fetch("../../logica/removeMenu.php", {
    method: "POST",
    body: data,
  })
    .then((r) => r.text())
    .then((r) => {
    });
}
