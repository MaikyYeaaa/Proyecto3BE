async function listarCarrito() {
  let carrito = obtenerCarrito();
  console.log(carrito);
  let menus = await getMenus(carrito);

  for (let i = 0; i < carrito.length; i++) {
    const id = carrito[i].id;
    const nombre = carrito[i].nombre;
    const img = carrito[i].img;
    const precio = carrito[i].precio;
    const cantidad = carrito[i].cant;
    const comidasID = carrito[i].comidas;
    const tipo = carrito[i].tipo;
    const comidasNombre = await getComidasNombre(comidasID);

    let comidasNombres = "";
    comidasNombre.forEach((nombre, pos) => {
      let separator;
      if (pos == comidasNombre.length - 1) {
        separator = "";
      } else {
        separator = ", ";
      }
      comidasNombres += `${nombre.Nombre}${separator}`;
    });

    const article = `
            <article class="carritoItem">
        <section id="imgCont">
          <img src="${img}" alt="" />
        </section>
        <section id="textop">
          <article id="textosupop">
            <p id="titulo">${nombre}</p>
            <p id="comidas">${comidasNombres}</p>
          </article>
          <article id="footer">
            <section id="counter-and-trash">
              <img src="../src/trash.svg" class="icono" id="trash" onclick="eliminarItem(${id}, '${nombre}')"/>
              <article id="contador">
                <img src="../src/menos.svg" class="icono" onclick="restarItem(${id}, ${cantidad})"/>
                <p id="${id}">${cantidad}</p>
                <img src="../src/mas.svg" class="icono" onclick="sumarItem(${id}, ${cantidad})"/>
              </article>
            </section>
            <p id="precio">$${precio}</p>
          </article>
        </section>
      </article>
            `;
    $("#platos").append(article);
  }
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
function eliminarItemNoConfirm(id) {
  let carrito = obtenerCarrito();
  let index = carrito.findIndex((item) => item.id == id);
  if (index !== -1) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  location.reload();
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

  if (newCant == 0) {
    eliminarItemNoConfirm(id);
  } else if (item) {
    item.cant = newCant;
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  location.reload();
}

let precioTotal = 0;
async function ticket() {
  let numRand = Math.floor(Math.random() * 500);
  $("#ticket h1").html(`>>Carrito #: ${numRand}<<`);
  $("#ticket h2").html(getDateOp());
  let carrito = obtenerCarrito();
  let mostrar = "";

  for (let i = 0; i < carrito.length; i++) {
    mostrar += `
      -${carrito[i].nombre}: (x${carrito[i].cant}) <br>
      `;
    precioTotal += parseInt(carrito[i].precio * carrito[i].cant);

    const comidasID = carrito[i].comidas;
    const comidasNombre = await getComidasNombre(comidasID);

    let comidasNombres = "";
    comidasNombre.forEach((nombre) => {
      comidasNombres += `<li>${nombre.Nombre} </li>`;
    });
    mostrar += `${comidasNombres} <br>`;
  }

  $("#ticket #pMostrar").html(mostrar);
  $("#ticket #precio").html(`TOTAL: $${precioTotal}`);

  if (precioTotal == 0) {
    $("#btnComprar").attr("disabled", "disabled");
  }
}

function getVencimientoOp() {
  let fechaActual = new Date();
  fechaActual.setDate(fechaActual.getDate() + 40); // para la fecha de vencimiento
  let diaActual = fechaActual.getDate();
  let mesActual = fechaActual.getMonth() + 1;
  let anoActual = fechaActual.getFullYear();
  return `${diaActual}/${mesActual}/${anoActual}`;
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

async function getMenus(menus) {
  let comidas = [];
  console.log(menus);
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
    return comidas.reverse();
  });

  await Promise.all(promises);
  return comidas;
}

ticket();
listarCarrito();

async function getComidasNombre(arrayIDs) {
  let datos = new FormData();
  datos.append("ids", arrayIDs);
  let comidasNombres = await fetch("../persistencia/getComidasNombreFromIDs.php", {
    method: "post",
    body: datos,
  })
    .then((r) => r.json())
    .then((r) => {
      return r;
    });
  return comidasNombres;
}

async function crearPedido() {
  console.log("pedidos");
  const carrito = await obtenerCarrito();
  let pedidoIDs = [];

  carrito.forEach((menu) => {
    let cant = menu.cant;
    let id = menu.id;

    for (let i = 0; i < cant; i++) {
      pedidoIDs.push(id);
    }
  });

  console.log(pedidoIDs);

  $("#modal-pedido").css({ display: "flex" });

  let formulario = document.getElementById("pedido-form");
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    let datos = new FormData(formulario);
    let fecha = getDateOp();
    let vencimiento = getVencimientoOp();
    datos.append("vencimiento", vencimiento);
    datos.append("fecha", fecha);
    datos.append("monto", precioTotal);
    datos.append("menuIDs", pedidoIDs);

    let idUser = localStorage.getItem("id");
    datos.append("idUser", idUser);

    fetch("../persistencia/crearPedido.php", {
      method: "post",
      body: datos,
    })
      .then((r) => r.text())
      .then((r) => {
        console.log(r);
        if (r == "Good") {
          $("#modal-listo").css({ display: "flex" });
          $("#modal-pedido").css({ display: "none" });
          localStorage.removeItem("carrito");
        }
      });
  });
}

$("#modal-pedido #content #cerrar-img").click(() => {
  $("#modal-pedido").css({ display: "none" });
});

function cerrarCoso() {
  $("#modal-listo").css({ display: "none" });
}
