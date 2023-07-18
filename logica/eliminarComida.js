var formulario = document.getElementById("form");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  fetch("../../persistencia/comidas.json")
    .then((r) => r.json())
    .then((r) => {
      var mostrado = false;
      for (let i = 0; i < r.length; i++) {
        let id_comida = r[i].id_comida;
        let nombre_comida = r[i].nombre_comida;
        let descripcion = r[i].descripcion;
        let imgURL = r[i].imgURL;

        if ($("#txtNombre").val() == nombre_comida) {
          mostrado = true;
          mostrar = `
          <article>
          <h1>${nombre_comida}</h1>
          <p>Descripcion: ${descripcion}</p>
          <image src="${imgURL}" width="100px">
          <form id="eliminar">
          <input type="submit" value="Eliminar" name="${id_comida}"/>
        </form>
        </article>
            `;
          $("p").html(mostrar);
        }
      }
      if (!mostrado) {
        $("p").html(
          `${$("#txtNombre").val()} no esta registrado como una comida.`
        );
      }
    });
});

$(document).on("click", "#eliminar input[type='submit']", function (e) {
  e.preventDefault();

  //eliminar de BDD;
  console.log(`${$(this).attr("name")} eliminado`);
});
