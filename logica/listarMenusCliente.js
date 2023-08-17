fetch("../persistencia/listarMenus.php")
  .then((r) => r.json())
  .then((r) => {
    r.forEach((r) => {
      let estrellas = Math.floor(Math.random() * 5) + 1;

      const calcularEstrellas = (estrellas) => {
        let mostrarEstrellas = "";
        for (let i = estrellas; i > 0; i--) {
          mostrarEstrellas += `<img src="../src/star_.svg" alt="" />`;
        }
        for (let a = estrellas; a < 5; a++) {
          mostrarEstrellas += `<img src="../src/blackStar_.svg" alt="" />`;
        }
        return mostrarEstrellas;
      };
      let img = r.ImgURL;
      let titulo = r.Nombre;
      let precio = r.Precio;
      let id = r.IDMenu;
      let mostrar = `
      <article class="menu">
      <section id="imgContainer">
      <img src="${img}" alt="" />
        </section>
        <section id="footer">
          <article id="textop">
          <h3>${titulo}</h3>
          <p>$${precio}</p>
          <section id="estrellitas">
          ${calcularEstrellas(estrellas)}
          </section>
          </article>
          <button class="btnPrimario" data-img="${img}" data-precio="${precio}" data-id="${id}" data-nombre="${titulo}" onclick="agregarAlCarrito(this)">Agregar a carrito</button>
          </section>
          </article>
      `;
      $("#mostrar").append(mostrar);
    });
  });

console.log(obtenerCarrito());

function agregarAlCarrito(button) {
  const id = $(button).attr("data-id");
  const nombre = $(button).attr("data-nombre");
  const img = $(button).attr("data-img");
  const precio = $(button).attr("data-precio");

  let carritoPrevio = obtenerCarrito();

  if (!revisarRepeticion(id, carritoPrevio)) {
    let item = { id: id, nombre: nombre, img: img, precio: precio, cant: 1 };
    carritoPrevio.push(item);
  } else {
    let itemExistente = carritoPrevio.find((item) => item.id == id);
    if (itemExistente) {
      itemExistente.cant++;
    }
  }

  localStorage.setItem("carrito", JSON.stringify(carritoPrevio));
  alert(nombre + " añadido correctamente");
}

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

// localStorage.clear();
// sessionStorage.clear();

function revisarRepeticion(id, carritoPrevio) {
  let repete = false;
  carritoPrevio.forEach((item) => {
    let itemID = item.id;
    console.log(`itemID: ${itemID}`);
    console.log(`id: ${id}`);

    if (itemID == id) {
      repete = true;
    }
  });
  return repete;
}
