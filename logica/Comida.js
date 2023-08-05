fetch("../../persistencia/listarComidas.php")
  .then((r) => r.json())
  .then((r) => {
    r.forEach((r) => mostrarProducto(r.Nombre, r.ImagenURL, r.IDComida));

    let productos = Array.from($(".producto")); //los hago array para trabajar con todos ellos
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
                mostrarModal(r.Nombre, r.Descripcion, r.ImagenURL, r.IDComida);
              }
            });
          });
      });
    });
  });

$("#btnFiltroComida").click(filtrar);

function filtrar() {
  let filtro = $("#txtFiltroComida").val();
  let filtroCorrecto = false;
  console.log(filtro);
  fetch("../../persistencia/listarComidas.php")
    .then((r) => r.json())
    .then((r) => {
      r.forEach((r) => {
        if (filtro == r.IDComida || filtro == r.Nombre) {
          $("#listado-platos").html("");
          filtroCorrecto = true;
          mostrarProducto(r.Nombre, r.ImagenURL, r.IDComida);
        }
      });
      if (!filtroCorrecto) {
        alert(`no hay nada registrado como ${filtro}`);
      } else {
        let productos = Array.from($(".producto"));

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
                    mostrarModal(r.Nombre, r.Descripcion, r.ImagenURL, r.IDComida);
                  }
                });
              });
          });
        });
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

function mostrarProducto(nombre, img, id) {
  mostrar = `
  <article class="producto" id="#comida" data-idComida="${id}">
  <section id="fondo">
    <img
      src="${img}"
      alt=""
    />
  </section>
  <h1>${nombre.toUpperCase()}</h1>
</article>
        `;
  $("#listado-platos").append(mostrar);
}

function mostrarModal(nombre, desc, img, id) {
  console.log("entra a mostrar modal");
  mostrar = `
  <img id="cerrar" src="../../src/cross.svg" alt="" />
  <h1>${nombre} </h1>
  <img
  id="productoImg"
  src="${img}"
  />
  <p>
  ${desc}
  </p>
  <section id="btnContenedor">
  <form id="eliminar">
  <input class="btnSecundario" type="submit" value="Eliminar" name="${id}" data-nombre="${nombre}"/>
</form>
  </section>
  `;
  $("#modal #modal-content").html(mostrar);
  $("#modal").css({ visibility: "visible" });
}
