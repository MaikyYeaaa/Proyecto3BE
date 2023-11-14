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
                mostrarModal(r.Nombre, r.Descripcion, r.ImagenURL, r.TiempoCocinado, r.IDComida, r.Dieta.Tipodieta, r.Dieta.IDDieta);
              }
            });
          });
      });
    });
  });

$("#btnFiltroComida").click(filtrar);
const filtroComida = document.getElementById("txtFiltroComida");
filtroComida.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    filtrar();
  }
});
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
                    mostrarModal(r.Nombre, r.Descripcion, r.ImagenURL, r.TiempoCocinado, r.IDComida, r.Dieta.Tipodieta, r.Dieta.IDDieta);
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

    //eliminar de BDD;
    fetch("../persistencia/eliminarComida.php", {
      method: "POST",
      body: datos,
    })
      .then((r) => r.text())
      .then((r) => {
        if (r == "eliminado correctamente") {
          location.reload();
        }
      });
  }
});

$(document).on("click", "#modificar input[type='submit']", function (e) {
  e.preventDefault();
  let nombreInput = $("#modificar input").attr("data-nombre");
  let descInput = $("#modificar input").attr("data-desc");
  let tiempoInput = $("#modificar input").attr("data-tiempo");
  let img = $("#modificar input").attr("data-img");
  let dieta = $("#modificar input").attr("data-dieta");
  let idDieta = $("#modificar input").attr("data-idDieta");
  let id = $("#modificar input").attr("data-id");

  let mostrar = `
  <img id="cerrar" src="../src/cross.svg" alt="" />
  <form id="modificarMandar" data-id="${id}">
  <h1> <input type="text" value="${nombreInput}" name="nombreNuevo" /> </h1>
  <img
  id="productoImg"
  src="${img}" alt="Girl in a jacket"
  />
  <p>
  <input type="text" value="${descInput}" name="descNuevo" />
  </p>
  <p>
  <select name="dieta" id="dietaSelect" required>
  <option value="${idDieta}">${dieta}</option>
    
  </select>

  </p>
  <p>Tiempo de cocinado: <input type="number" value="${tiempoInput}" name="tiempoNuevo" /> </p>
  <section id="btnContenedor">
    <input type="submit" value="Modificar" class="btnSecundario">
  </section>
  </form>
  `;
  $("#modal #modal-content").html(mostrar);

  fetch("../persistencia/getDietas.php")
    .then((r) => r.json())
    .then((r) => {
      let dietaSection = "";
      r.forEach((r) => {
        let id = r.IDDieta;
        let tipo = r.Tipodieta;
        if (id !== idDieta) {
          dietaSection += `
          <option value="${id}">${tipo}</option>
          `;
        }
      });
      $("#dietaSelect").append(dietaSection);
    });
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
      location.reload();
    });
});

function mostrarProducto(nombre, img, id) {
  let mostrar = `
  <article class="producto" id="#comida" data-idComida="${id}">
  <section id="fondo">
    <img
    class="IMG"
      src="${img}"
      alt="../src/noimg.png"
      onerror="this.onerror=null;this.src='../src/noimg.png';"
    />
  </section>
  <h1>${nombre.toUpperCase()}</h1>
</article>
        `;
  $("#listado-platos").append(mostrar);
}

function mostrarModal(nombre, desc, img, tiempo, id, dieta, idDieta) {
  let mostrar = `
  <img id="cerrar" src="../src/cross.svg" alt="" onerror="this.onerror=null;this.src='../src/noimg.png';" />
  <h1>${nombre} </h1>
  <img
  id="productoImg"
  class="IMG"
  src="${img}"
  />
  <p>
  ${desc}
  </p>
  <p>${dieta}</p>
  <p>Tiempo de cocinado: ${tiempo} </p>
  <section id="btnContenedor">
  <form id="eliminar">
  <input class="btnSecundario" type="submit" value="Eliminar" name="${id}" data-nombre="${nombre}"/>
</form>
<form id="modificar">
<input class="btnSecundario" type="submit" value="Modificar" name="${id}" data-img="${img}" data-id="${id}" data-desc="${desc}" data-tiempo="${tiempo}" data-nombre="${nombre}" data-dieta="${dieta}" data-idDieta="${idDieta}"/>
</form>
  </section>
  `;
  $("#modal #modal-content").html(mostrar);
  $("#modal").css({ visibility: "visible" });
}
