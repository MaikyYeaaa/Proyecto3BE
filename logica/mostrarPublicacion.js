fetch("../persistencia/getPublicaciones.php")
  .then((r) => r.json())
  .then(async (r) => {
    console.log(r);

    for (let i = 0; i < r.length; i++) {
      let idPubli = r[i].IDPublicacion;
      let idMenuArray = await getIdMenu(idPubli);
      console.log(idMenuArray);
      let idMenu = idMenuArray[0].IDMenu;
      console.log(`idMenu: ${idMenu}`);
      let menu = await getMenu(idMenu);
      console.log(menu);
      let precioOrig = menu[0].Precio;
      let descuento = menu[0].Descuento;

      let precioDescuento = Math.floor(precioOrig - (precioOrig * descuento) / 100);

      let nombre = r[i].Nombre;
      let img = r[i].FotoURL;
      let descripcion = r[i].Descripcion;
      let mostrar = `
        <article class="publicacion">
        <section id="img-cont">
        <img src="${img}" alt="" />
        </section>
        <section id="textop">
        <h1 id="nombre">${nombre}</h1>
        <h2 id="descripcion">${descripcion}</h2>
        <p id="precio">$${precioDescuento}</p>
        <button onClick="eliminarPublicacion(${idPubli})">Eliminar</button>
        </section>
        </article>
        `;
      $("#publicaciones #listado").append(mostrar);
    }
  });

async function getMenu(id) {
  let datos = new FormData();
  datos.append("id", id);
  const respuesta = await fetch("../persistencia/getMenuFromID.php", { method: "post", body: datos });
  const json = await respuesta.json();
  return json;
}

async function getIdMenu(idPubli) {
  let datos = new FormData();
  datos.append("idPubli", idPubli);
  const respuesta = await fetch("../persistencia/getMenuFromIncluye.php", { method: "post", body: datos });
  const json = await respuesta.json();
  return json;
}