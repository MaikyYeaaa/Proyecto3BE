async function listarCarrito() {
  let carrito = obtenerCarrito();
  // const comidasArray = await getComidas();
  // let comidaTxt = "";
  // comidasArray.forEach((comida) => {
  //   comida.forEach((com) => {
  //     comidaTxt += `${com.Nombre}, `;
  //   });
  // });

  carrito.forEach((item) => {
    let id = item.id;
    let nombre = item.nombre;
    let img = item.img;
    let precio = item.precio;
    let cantidad = item.cant;

    let mostrar = `
            <article class="carritoItem">
        <section id="imgCont">
          <img src="${img}" alt="" />
        </section>
        <section id="textop">
          <article id="textosupop">
            <p id="titulo">${nombre}</p>
            <p id="comidas">comidas</p>
          </article>
          <article id="footer">
            <section id="counter-and-trash">
              <img src="../src/trash.svg" class="icono" id="trash" onclick="eliminarItem(${id}, '${nombre}')"/>
              <article id="contador">
                <img src="../src/menos.svg" class="icono" onclick="restarItem(${id}, ${cantidad})"/>
                <p>${cantidad}</p>
                <img src="../src/mas.svg" class="icono" onclick="sumarItem(${id}, ${cantidad})"/>
              </article>
            </section>
            <p id="precio">$${precio}</p>
          </article>
        </section>
      </article>
            `;
    $("#platos").append(mostrar);
  });
}

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
  // returnea un array del carrito que esta guardado en localstorage
}

function eliminarItem(id, nombre) {
  let confirmar = confirm(`seguro que quiere eliminar ${nombre}?`);
  if (confirmar) {
    let carrito = obtenerCarrito();
    let index = carrito.findIndex((item) => item.id == id);
    if (index !== -1) {
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    location.reload();
  }
}

function sumarItem(id, cant) {
  let newCant = cant + 1;
  let carrito = obtenerCarrito();
  let item = carrito.find((item) => item.id == id);

  if (item) {
    item.cant = newCant;
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  location.reload();
}

function restarItem(id, cant) {
  let newCant = cant - 1;
  let carrito = obtenerCarrito();
  let item = carrito.find((item) => item.id == id);

  if (item) {
    item.cant = newCant;
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  location.reload();
}

async function ticket() {
  let numRand = Math.floor(Math.random() * 500);
  $("#ticket h1").html(`>>Carrito #: ${numRand}<<`);
  $("#ticket h2").html(getDateOp());
  let carrito = obtenerCarrito();
  let mostrar = "";
  let precioTotal = 0;

  carrito.forEach((item) => {
    mostrar += `
      -${item.nombre} <br>
    `;
    precioTotal += parseInt(item.precio * item.cant);
  });

  $("#ticket #pMostrar").html(mostrar);
  $("#ticket #precio").html(`TOTAL: $${precioTotal}`);
}

function getDateOp() {
  let fechaActual = new Date();
  let diaActual = fechaActual.getDate();
  let mesActual = fechaActual.getMonth() + 1;
  let anoActual = fechaActual.getFullYear();
  let horaActual = fechaActual.getHours();
  let minutosActual = fechaActual.getMinutes();
  let segundosActual = fechaActual.getSeconds();
  return `${diaActual}/${mesActual}/${anoActual} ${horaActual}/${minutosActual}/${segundosActual}`;
}

async function obtenerDatos(url) {
  const respuesta = await fetch(url);
  const json = await respuesta.json();
  return json;
}

async function getComidas() {
  let comidas = [];
  const menus = obtenerCarrito();
  const integra = await obtenerDatos("../persistencia/getIntegra.php");

  const promises = menus.map(async (menu) => {
    let id = menu.id;
    var platosMenu = [];

    integra.forEach((comida) => {
      if (id == comida.IDMenu) {
        platosMenu.push(comida.IDComida);
      }
    });

    var datos = new FormData();
    datos.append("platosIDs", platosMenu);

    const response = await fetch("../persistencia/getComidasFromID.php", {
      method: "post",
      body: datos,
    });
    const r = await response.json();
    comidas.push(r);
  });

  await Promise.all(promises);
  return comidas;
}

ticket();
listarCarrito();
