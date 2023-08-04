fetch("../../persistencia/listarComidas.php")
  .then((r) => r.json())
  .then((r) => {
    for (let i = 0; i < r.length; i++) {
      let nombre_comida = r[i].Nombre;
      let imgURL = r[i].ImagenURL;
      let idComida = r[i].IDComida;

      mostrar = `
      <article class="producto" id="#comida" data-idComida="${idComida}">
      <section id="fondo">
        <img
          src="${imgURL}"
          alt=""
        />
      </section>
      <h1>${nombre_comida}</h1>
    </article>
            `;
      $("#listado-platos").append(mostrar);
    }
    let productos = Array.from($(".producto"));
    console.log(productos);

    productos.forEach((producto) => {
      producto.addEventListener("click", function () {
        let idcomida = $(producto).attr("data-idComida");
        console.log(idcomida);
        fetch("../../persistencia/listarComidas.php")
          .then((r) => r.json())
          .then((r) => {
            r.forEach((r) => {
              if (idcomida == r.IDComida) {
                console.log(r.IDComida);
                let nombre = r.Nombre;
                let desc = r.Descripcion;
                let img = r.ImagenURL;

                mostrar = `
                <img id="cerrar" src="../../src/cross.svg" alt="" />
                <h1>${nombre} $400</h1>
                <img
                id="productoImg"
                src="${img}"
                />
                <p>
                ${desc}
                </p>
                <section id="btnContenedor">
                <form id="eliminar">
                <input class="btnSecundario" type="submit" value="Eliminar" name="${idcomida}" data-nombre="${nombre}"/>
              </form>
                </section>
                `;
                $("#modal #modal-content").html(mostrar);
                $("#modal").css({ visibility: "visible" });
              }
            });
          });
      });
    });
  });

$("#btnFiltroComida").click(filtrar);

function filtrar() {
  $("#mostrar").html("");
  let filtro = $("#txtFiltro").val();
  fetch("../../persistencia/listarComidas.php")
    .then((r) => r.json())
    .then((r) => {
      r.forEach((r) => {
        let id_comida = r.IDComida;
        let nombre_comida = r.Nombre;
        let descripcion = r.Descripcion;
        let imgURL = r.ImagenURL;

        if (filtro == id_comida || filtro == nombre_comida) {
          mostrar = `
          <article>
          <h1>${nombre_comida}</h1>
          <p>Descripcion: ${descripcion}</p>
          <image src="${imgURL}" width="200px">
          <form id="eliminar">
          <input type="submit" value="Eliminar" name="${id_comida}" data-nombre="${nombre_comida}"/>
        </form>
        </article>
            `;
          $("#mostrar").append(mostrar);
        }
      });
      let valorMostrar = $("#mostrar").val();
      console.log(valorMostrar);
      if (valorMostrar == " ") {
        $("#mostrar").html(`no hay nada registrado como ${filtro}`);
      }
    });
}

$(document).on("click", "#eliminar input[type='submit']", function (e) {
  e.preventDefault();

  var nombreComida = $(this).attr("data-nombre");
  let confirmacion = confirm(`seguro que desea eliminar ${nombreComida}?`);

  if (confirmacion) {
    var id = $(this).attr("name");
    var datos = new FormData();
    datos.append("id", id);
    console.log(id);

    //eliminar de BDD;
    fetch("../../persistencia/eliminarComida.php", {
      method: "POST",
      body: datos,
    })
      .then((r) => r.text())
      .then((r) => location.reload());
  }
});
