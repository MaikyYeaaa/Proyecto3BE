let comidasArray = [];

var menuFrom = document.getElementById("agregarMenu");

menuFrom.addEventListener("submit", function (e) {
  e.preventDefault();

  if (comidasArray.length == 5) {
    var datos = new FormData(menuFrom);
    datos.append("comidas", comidasArray);
    fetch("../../persistencia/addMenu.php", {
      method: "post",
      body: datos,
    });
    alert(`Menu agregado correctamente!`);
  } else {
    alert("faltan comidas");
  }
});
function addMenu() {
  var datos = new FormData(menuFrom);

  fetch("../../logica/addMenu.php", {
    method: "POST",
    body: datos,
  })
    .then((r) => r.json())
    .then((r) => {
      const nombre = r[r.length - 1].nombre_menu; //ACCEDER AL NOMBRE DEL MENU EN EL JSON
      $("#pMensaje").html(`Menu ${nombre} agregado correctamente!`);
    });
}

fetch("../../persistencia/listarComidas.php")
  .then((r) => r.json())
  .then((r) => {
    r.forEach((r) => mostrarProducto(r.Nombre, r.ImagenURL, r.IDComida));

    let productos = Array.from($(".producto"));
    productos.forEach((prod) => {
      prod.addEventListener("click", () => {
        let idcomida = $(prod).attr("data-idComida");
        if (comidasArray.includes(idcomida)) {
          //lo elimino
          $(prod).css({ transition: "filter .5s", filter: "none" });
          let index = comidasArray.indexOf(idcomida);
          if (index > -1) {
            comidasArray.splice(index, 1);
          }
        } else {
          if (comidasArray.length < 5) {
            //lo agrego
            $(prod).css({ transition: "filter .5s", filter: "drop-shadow(0 4px 16px rgba(0, 255, 0, 1))" });
            comidasArray.push(idcomida);
          } else {
            alert("te pasaste bro");
          }
        }
        $("#upper h1").html(`Comidas ${comidasArray.length}/5`);
        console.log(comidasArray);
      });
    });
  });

function mostrarProducto(nombre, img, id) {
  mostrar = `
    <article class="producto" id="#comida" data-idComida="${id}">
    <section id="fondo">
      <img
        src="${img}"
        alt=""
      />
    </section>
    <h1>${nombre.toUpperCase()}</h1>
  </article>
          `;
  $("#listado-platos").append(mostrar);
}
