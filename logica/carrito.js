fetch("../persistencia/menus.json")
  .then((r) => r.json())
  .then((r) => {
    for (let i = 0; i < r.length; i++) {
      let id_menu = r[i].id_menu;
      let nombre_menu = r[i].nombre_menu;
      let descripcion = r[i].descripcion;
      let imgURL = r[i].imgURL;
      fetch("../persistencia/carrito.json")
        .then((r2) => r2.json())
        .then((r2) => {
          r2.forEach((r2) => {
            if (r2.id == id_menu) {
              mostrar = `
          <article>
          <h1>${nombre_menu}</h1>
          <p>Descripcion: ${descripcion}</p>
          <image src="${imgURL}" width="100px">
          <br>
          <button id="${id_menu}" onclick="eliminarDelCarrito(this)"> Eliminar</button>
        </article>
            `;
              $("#mostrar").append(mostrar);
            }
          });
        });
    }
  });

function eliminarDelCarrito(button) {
  const id = button.getAttribute("id");
  var data = new FormData();
  data.append("id", id);

  fetch("../logica/eliminarCarrito.php", {
    method: "POST",
    body: data,
  })
    .then((r) => r.text())
    .then((r) => {
      console.log(r);
    });
}
