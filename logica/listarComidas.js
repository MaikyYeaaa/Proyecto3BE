fetch("../../persistencia/listarComidas.php")
  .then((r) => r.json())
  .then((r) => {
    for (let i = 0; i < r.length; i++) {
      let id_comida = r[i].IDComida;
      let nombre_comida = r[i].Nombre;
      let descripcion = r[i].Descripcion;
      let imgURL = r[i].ImagenURL;
      mostrar = `
      <article class="comida-list">
      <h1>${nombre_comida}</h1>
      <p>${descripcion}</p>
      <image src="${imgURL}">
    </article>
            `;
      $("#listado-platos").append(mostrar);
    }
  });
