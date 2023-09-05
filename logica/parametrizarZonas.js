const formulario = document.getElementById("zonas-form");
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  let datos = new FormData(formulario);
  fetch("../persistencia/addZona.php", {
    method: "post",
    body: datos,
  })
    .then((r) => r.text())
    .then((r) => {
      if (r == 1) {
        location.reload();
      }
    });
});

fetch("../persistencia/getZonas.php")
  .then((r) => r.json())
  .then((r) => {
    r.forEach((zona) => {
      const nombre = zona.Nombre;
      const direccion = zona.Direccion;
      const idSucursal = zona.IDSucursal;
      const zonaHTML = `
      <article class="zona">
        <h1>Nombre: ${nombre}</h1>
        <h2>Direccion: ${direccion}</h2>
          <br />
        <section id="botones">
        <button class="btnPrimario" data-id="${idSucursal}" onclick="modificarZona(this)">Modificar</button>
        <button class="btnPrimario" onclick="eliminarZona(${idSucursal})">Eliminar</button>
        </section>
      </article>
      `;
      $("#listado-zonas").append(zonaHTML);
    });
  });

function eliminarZona(id) {
  const confirmar = confirm("seguro que quiere eliminar esta sucursal?");
  if (confirmar) {
    let datos = new FormData();
    datos.append("id", id);
    fetch("../persistencia/eliminarZona.php", {
      method: "post",
      body: datos,
    })
      .then((r) => r.text())
      .then((r) => {
        console.log(r);
        if (r == 1) {
          location.reload();
        }
      });
  }
}

function modificarZona(boton) {
  const id = $(boton).attr("data-id");

  $("#listado-zonas").html("");

  fetch("../persistencia/getZonas.php")
    .then((r) => r.json())
    .then((r) => {
      r.forEach((zona) => {
        const nombre = zona.Nombre;
        const direccion = zona.Direccion;
        const idSucursal = zona.IDSucursal;
        let zonaHTML = "";
        if (idSucursal == id) {
          zonaHTML = `
          <article class="zona">
          <form id="mod-form">
          <h1>Nombre:</h1> <input type="text" placeholder="${nombre}" name="nombreChange" />
          <h2>Direccion:</h2> <input type="text" placeholder="${direccion}" name="dirChange" />
          <br />
          <section id="botones">
          <input type="submit" class="btnPrimario" value="Confirmar" data-id="${id}" id="botonMod"/>
          </section>
          </form>
          </article>
          `;
        } else {
          zonaHTML = `
          <article class="zona">
          <h1>Nombre: ${nombre}</h1>
          <h2>Direccion: ${direccion}</h2>
          <br />
          <section id="botones">
          <button class="btnPrimario" data-nombre="${nombre}" data-dir="${direccion}" data-id="${idSucursal}" onclick="modificarZona(this)">Modificar</button>
          <button class="btnPrimario" onclick="eliminarZona(${idSucursal})">Eliminar</button>
          </section>
          </article>
          `;
        }
        $("#listado-zonas").append(zonaHTML);
      });

      const modForm = document.getElementById("mod-form");
      modForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = $("#botonMod").attr("data-id");
        let datos = new FormData(modForm);
        datos.append("id", id);

        fetch("../persistencia/modZona.php", {
          method: "post",
          body: datos,
        })
          .then((r) => r.text())
          .then((r) => {
            console.log(r);
            if (r == 1) {
              location.reload();
            }
          });
      });
    });
}
