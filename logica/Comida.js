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
                let nombre = r.Nombre;
                let desc = r.Descripcion;
                let img = r.ImagenURL;

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
  let filtro = $("#txtFiltroComida").val();
  let filtroCorrecto = false;
  console.log(filtro);
  fetch("../../persistencia/listarComidas.php")
    .then((r) => r.json())
    .then((r) => {
      r.forEach((r) => {
        let id_comida = r.IDComida;
        let nombre_comida = r.Nombre;
        let imgURL = r.ImagenURL;

        if (filtro == id_comida || filtro == nombre_comida) {
          $("#listado-platos").html("");
          filtroCorrecto = true;
          mostrar = `
          <article class="producto" id="#comida" data-idComida="${id_comida}">
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
                    let nombre = r.Nombre;
                    let desc = r.Descripcion;
                    let img = r.ImagenURL;

                    mostrar = `
                    <img id="cerrar" src="../../src/cross.svg" alt="" />
                    <h1>${nombre}</h1>
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
