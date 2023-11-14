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
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
  // returnea un array del carrito que esta guardado en localstorage
}
