import { mostrarNotif } from "../scripts/functionsVarias.js";

fetch("../persistencia/listarComidas.php")
  .then((r) => r.json())
  .then((r) => {
    r.forEach((r) => mostrarProducto(r.Nombre, r.ImagenURL, r.IDComida));

    let productos = Array.from($(".producto")); //los hago array para trabajar con todos ellos
    productos.forEach((producto) => {
      producto.addEventListener("click", function () {
        let idcomida = $(producto).attr("data-idComida");
        fetch("../persistencia/listarComidas.php")
          .then((r) => r.json())
          .then((r) => {
            r.forEach((r) => {
              if (idcomida == r.IDComida) {
                mostrarModal(r.Nombre, r.Descripcion, r.ImagenURL, r.TiempoCocinado, r.IDComida);
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
  fetch("../persistencia/listarComidas.php")
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
        mostrarNotif("aviso", `no hay nada registrado como ${filtro}`);
      } else {
        let productos = Array.from($(".producto"));

        productos.forEach((producto) => {
          producto.addEventListener("click", function () {
            let idcomida = $(producto).attr("data-idComida");
            fetch("../persistencia/listarComidas.php")
              .then((r) => r.json())
              .then((r) => {
                r.forEach((r) => {
                  if (idcomida == r.IDComida) {
                    mostrarModal(r.Nombre, r.Descripcion, r.ImagenURL, r.TiempoCocinado, r.IDComida);
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
    fetch("../persistencia/eliminarComida.php", {
      method: "POST",
      body: datos,
    })
      .then((r) => r.text())
      .then((r) => location.reload());
  }
});

$(document).on("click", "#modificar input[type='submit']", function (e) {
  e.preventDefault();
  let nombreInput = $("#modificar input").attr("data-nombre");
  let descInput = $("#modificar input").attr("data-desc");
  let tiempoInput = $("#modificar input").attr("data-tiempo");
  let img = $("#modificar input").attr("data-img");
  let id = $("#modificar input").attr("data-id");

  let mostrar = `
  <img id="cerrar" src="../src/cross.svg" alt="" />
  <form id="modificarMandar" data-id="${id}">
  <h1> <input type="text" placeholder="${nombreInput}" name="nombreNuevo" /> </h1>
  <img
  id="productoImg"
  src="${img}"
  />
  <p>
  <input type="text" placeholder="${descInput}" name="descNuevo" />
  </p>
  <p>Tiempo de cocinado: <input type="number" placeholder="${tiempoInput}" name="tiempoNuevo" /> </p>
  <section id="btnContenedor">
    <input type="submit" value="Modificar" class="btnSecundario">
  </section>
  </form>
  `;
  $("#modal #modal-content").html(mostrar);
});

$(document).on("click", "#modificarMandar input[type='submit']", function (e) {
  e.preventDefault();
  let datos = new FormData($("#modificarMandar")[0]);
  let id = $("#modificarMandar").attr("data-id");
  datos.append("id", id);
  fetch("../persistencia/modificarComida.php", {
    method: "post",
    body: datos,
  })
    .then((r) => r.text())
    .then((r) => {
      if (r) {
        location.reload();
      } else {
        mostrarNotif("error", "error al modificar datos");
      }
    });
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

function mostrarModal(nombre, desc, img, tiempo, id) {
  mostrar = `
  <img id="cerrar" src="../src/cross.svg" alt="" />
  <h1>${nombre} </h1>
  <img
  id="productoImg"
  src="${img}"
  />
  <p>
  ${desc}
  </p>
  <p>Tiempo de cocinado: ${tiempo} </p>
  <section id="btnContenedor">
  <form id="eliminar">
  <input class="btnSecundario" type="submit" value="Eliminar" name="${id}" data-nombre="${nombre}"/>
</form>
<form id="modificar">
<input class="btnSecundario" type="submit" value="Modificar" name="${id}" data-img="${img}" data-id="${id}" data-desc="${desc}" data-tiempo="${tiempo}" data-nombre="${nombre}"/>
</form>
  </section>
  `;
  $("#modal #modal-content").html(mostrar);
  $("#modal").css({ visibility: "visible" });
}
