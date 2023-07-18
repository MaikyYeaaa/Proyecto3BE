fetch("../../persistencia/comidas.json")
  .then((r) => r.json())
  .then((r) => {
    for (let i = 0; i < r.length; i++) {
      let id_comida = r[i].id_comida;
      let nombre_comida = r[i].nombre_comida;
      let descripcion = r[i].descripcion;
      let imgURL = r[i].imgURL;

      mostrar = `
          <article>
          <h1>${nombre_comida}</h1>
          <p>Descripcion: ${descripcion}</p>
          <image src="${imgURL}" width="100px">
        </article>
            `;
      $("#mostrar").append(mostrar);
    }
  });
