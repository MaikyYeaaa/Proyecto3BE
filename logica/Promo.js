let promos = [];

fetch("../persistencia/getPublicaciones.php")
  .then((r) => r.json())
  .then(async (r) => {
    console.log(r);

    for (let i = 0; i < r.length; i++) {
      let idPubli = r[i].IDPublicacion;
      let idMenuArray = await getIdMenu(idPubli);
      console.log(idMenuArray);
      let idMenu = idMenuArray[0].IDMenu;
      console.log(`idMenu: ${idMenu}`);
      let menu = await getMenu(idMenu);
      console.log(menu);
      let precioOrig = menu[0].Precio;
      let descuento = menu[0].Descuento;

      let precioDescuento = Math.floor(precioOrig - (precioOrig * descuento) / 100);

      let nombre = r[i].Nombre;
      let img = r[i].FotoURL;
      let descripcion = r[i].Descripcion;
      const mostrar = `
      <article class="Promo ">
      <section id="Info">
      <article id="texto-info">

      <section id="Titulo">${nombre}</section>
      <section id="Descripcion">${descripcion}</section>
      <section id="precios">
      <p id="precioOrig">$${precioOrig}</p>
      <p>$${precioDescuento}</p>
      </section>
      </article>
      </section>
      <button class="callToAction" data-descuento="${descuento}" data-img="${img}" data-precio="${precioDescuento}" data-id="${idMenu}" data-nombre="${nombre}" onclick="agregarAlCarrito(this)">¡Lo quiero!</button>
      <section class="promo-container">
      <article class="img-cont">
      <img src="${img}" alt="" />
      </article>
      <article class="promo-green-cont">
      <h1 id="descuento">${descuento}%</h1>
      </article>
      </section>
      </article>`;

      $("#promos-listado").append(mostrar);
    }
    promos.push(Array.from(document.getElementsByClassName("Promo")));
    promos.forEach((promo) => {
      $(promo).hover(function () {
        $(this).find(".promo-green-cont").css({ transform: "translate(0) rotate(0)", padding: "300px" });
      });
      $(promo).mouseleave(function () {
        setTimeout((promo) => {
          $(this).find(".promo-green-cont").css({ transform: "translate(400px, -200px) rotate(50deg) scale(0.3)", padding: "0" });
        }, 500);
      });
    });
  });

async function getMenu(id) {
  let datos = new FormData();
  datos.append("id", id);
  const respuesta = await fetch("../persistencia/getMenuFromID.php", { method: "post", body: datos });
  const json = await respuesta.json();
  return json;
}
async function getIdMenu(idPubli) {
  let datos = new FormData();
  datos.append("idPubli", idPubli);
  const respuesta = await fetch("../persistencia/getMenuFromIncluye.php", { method: "post", body: datos });
  const json = await respuesta.json();
  return json;
}
