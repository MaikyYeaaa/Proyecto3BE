async function agregarAlCarrito(button) {
  const id = $(button).attr("data-id");
  const nombre = $(button).attr("data-nombre");
  const img = $(button).attr("data-img");
  const precio = $(button).attr("data-precio");
  const descuento = $(button).attr("data-descuento");

  let tipo = "normal";
  if (descuento) {
    tipo = "descuento";
  }

  let platosMenu = [];
  const integra = await obtenerDatos("../persistencia/getIntegra.php");

  integra.forEach((comida) => {
    if (id == comida.IDMenu) {
      platosMenu.push(comida.IDComida);
    }
  });

  console.log(platosMenu);

  let carritoPrevio = obtenerCarrito();

  if (!revisarRepeticion(id, carritoPrevio)) {
    let item = { id: id, nombre: nombre, img: img, precio: precio, cant: 1, comidas: platosMenu, tipo: tipo };
    carritoPrevio.push(item);
    alert("agregado correctamente!");
  } else {
    let itemExistente = carritoPrevio.find((item) => item.id == id);
    if (itemExistente) {
      itemExistente.cant++;
    }
  }
  localStorage.setItem("carrito", JSON.stringify(carritoPrevio));
}

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function revisarRepeticion(id, carritoPrevio) {
  let repete = false;
  carritoPrevio.forEach((item) => {
    let itemID = item.id;

    if (itemID == id) {
      repete = true;
    }
  });
  return repete;
}

async function obtenerDatos(url) {
  const respuesta = await fetch(url);
  const json = await respuesta.json();
  return json;
}
