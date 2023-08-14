async function obtenerDatos(url) {
  const respuesta = await fetch(url);
  const json = await respuesta.json();
  return json;
}

let datos = [];
async function inicio() {
  const menus = await obtenerDatos("../../persistencia/listarMenus.php");
  const integra = await obtenerDatos("../../persistencia/getIntegra.php");
  //   console.log(menus, integra);
  menus.forEach((menu) => {
    let id = menu.IDMenu;
    let nombreMenu = menu.Nombre;
    let precioMenu = menu.Precio;
    let stock = menu.StockReal;
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
    let datos = new FormData();
    datos.append("platosIDs", platosID);
    fetch("../../persistencia/getComidasFromID.php", {
      method: "post",
      body: datos,
    })
      .then((r) => r.json())
      .then((platos) => {
        let platosMostrar = "";
        platos.forEach((plato) => {
          platosMostrar += `${plato.Nombre}, `;
        });
        console.log(platos);
        let num = Math.floor(Math.random() * 3);
        console.log(num);
        let mostrar = `
        <article class="menu" id="#menu" data-id="${id}" data-nombre="${nombre}" data-platos="${platosMostrar}" data-precio="${precio}" data-stock="${stock}" onclick="modalMenu(this)">
        <section id="fondo">
        <img src="../../src/3dvianda${num}.png" />
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
  <img id="cerrar" src="../../src/cross.svg" alt="" />
  <h1>${nombre} </h1>
  
  <p> Platos: ${platos} </p>
  <p> Stock: ${stock} </p>
  <p> $${precio}</p>
  <section id="btnContenedor">
  <input class="btnSecundario" type="submit" value="Eliminar" data-nombre="${nombre}" data-id="${id}" onclick="eliminarMenu(this)"/>
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
    fetch("../../persistencia/eliminarMenu.php", {
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
