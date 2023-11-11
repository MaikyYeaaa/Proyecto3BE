async function obtenerDatos(url) {
  const respuesta = await fetch(url);
  const json = await respuesta.json();
  return json;
}

let datos = [];
async function inicio() {
  const menus = await obtenerDatos("../persistencia/listarMenus.php");
  const integra = await obtenerDatos("../persistencia/getIntegra.php");
  //   console.log(menus, integra);
  menus.forEach((menu) => {
    let id = menu.IDMenu;
    let nombreMenu = menu.Nombre;
    let precioMenu = menu.Precio;
    let stock = menu.StockReal;
    let img = menu.MenuIMG;
    let descuento = menu.Descuento;
    var platosMenu = [];

    integra.forEach((comida) => {
      if (menu.IDMenu == comida.IDMenu) {
        platosMenu.push(comida.IDComida);
      }
    });
    datos.push({
      id,
      nombreMenu,
      precioMenu,
      stock,
      platosMenu,
      img,
    });
  });
  mostrarMenus();
}
inicio();
function mostrarMenus() {
  datos.forEach((dato) => {
    let id = dato.id;
    let nombre = dato.nombreMenu;
    let precio = dato.precioMenu;
    let stock = dato.stock;
    let platosID = dato.platosMenu;
    let img = dato.img;
    let datos = new FormData();
    datos.append("platosIDs", platosID);
    fetch("../persistencia/getComidasFromID.php", {
      method: "post",
      body: datos,
    })
      .then((r) => r.json())
      .then((platos) => {
        // let platosMostrar = "";
        // platos.forEach((plato) => {
        //   platosMostrar += `${plato.Nombre}, `;
        // });
        let comidasNombres = "";
        platos.forEach((nombre, pos) => {
          let separator;
          if (pos == platos.length - 1) {
            separator = "";
          } else {
            separator = ", ";
          }
          comidasNombres += `${nombre.Nombre}${separator}`;
        });

        let mostrar = `
        <article class="menu" id="#menu" data-id="${id}" data-nombre="${nombre}" data-platos="${comidasNombres}" data-precio="${precio}" data-stock="${stock}" onclick="modalMenu(this)">
        <section id="fondo">
        <img src="${img}" class="IMG" alt="../../src/noimgico.png" onerror="this.onerror=null;this.src='../src/noimg.png';"/>
        </section>
        <h1>${nombre.toUpperCase()}</h1>
        </article>
        `;
        $("#listado-menus").append(mostrar);
      });
  });
}

function modalMenu(menu) {
  let id = $(menu).attr("data-id");
  let platos = $(menu).attr("data-platos");
  let nombre = $(menu).attr("data-nombre");
  let stock = $(menu).attr("data-stock");
  let precio = $(menu).attr("data-precio");

  mostrar = `
  <img id="cerrar" src="../src/cross.svg" alt="" />
  <h1>${nombre} </h1>
  
  <p> Platos: ${platos} </p>
  <p> Stock: ${stock} </p>
  <p> $${precio}</p>
  <section id="btnContenedor">
  <input class="btnSecundario" type="submit" value="Eliminar" data-nombre="${nombre}" data-id="${id}" onclick="eliminarMenu(this)"/>
  <input class="btnSecundario" type="submit" value="Modificar" data-precio="${precio}" data-stock="${stock}" data-platos="${platos}" data-nombre="${nombre}" data-id="${id}" onclick="modificarMenu(this)"/>
  </section>
  `;
  $("#modal #modal-content").html(mostrar);
  $("#modal").css({ visibility: "visible" });
}

function eliminarMenu(boton) {
  let id = $(boton).attr("data-id");
  let nombre = $(boton).attr("data-nombre");
  let datos = new FormData();
  datos.append("id", id);

  let confirmar = confirm(`seguro que desea elminar ${nombre}?`);
  if (confirmar) {
    fetch("../persistencia/eliminarMenu.php", {
      method: "post",
      body: datos,
    })
      .then((r) => r.text())
      .then((r) => {
        if (r == 1) {
          location.reload();
        } else {
          alarm("ocurrio un error eliminando el menu");
        }
      });
  }
}

function modificarMenu(boton) {
  let id = $(boton).attr("data-id");
  let nombre = $(boton).attr("data-nombre");
  let platos = $(boton).attr("data-platos");
  let precio = $(boton).attr("data-precio");
  let stock = $(boton).attr("data-stock");

  mostrar = `
  <img id="cerrar" src="../src/cross.svg" alt="" />
  <form id="modificarMenuForm" data-id="${id}">
  <h1> <input type="text" value="${nombre}" name="nombreNuevo" /> </h1>
  <p> Platos: ${platos} </p>
  <p> Stock: <input type="number" value="${stock}" name="stockNuevo" /> </p>
  <p> $<input type="number" value="${precio}" name="precioNuevo" /></p>
  <section id="btnContenedor">
  <input type="submit" class="btnSecundario" value="Modificar" />
  </section>
  `;
  $("#modal #modal-content").html(mostrar);
  escucharFormulario();
}

function escucharFormulario() {
  let formulario = document.getElementById("modificarMenuForm");
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let confirmar = confirm(`seguro que quieres modificar este menu?`);
    if (confirmar) {
      let id = $(formulario).attr("data-id");
      let datos = new FormData(formulario);
      datos.append("id", id);

      fetch("../persistencia/updateMenu.php", {
        method: "post",
        body: datos,
      })
        .then((r) => r.text())
        .then((r) => {
          location.reload();
        });
    }
  });
}
