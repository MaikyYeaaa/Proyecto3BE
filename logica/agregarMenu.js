import { mostrarNotif } from "../scripts/functionsVarias.js";

let comidasArray = [];
let cantComidas = 20;
let tipoMenu = "";

fetch("../persistencia/getTipoMenu.php")
  .then((r) => r.json())
  .then((r) => {
    let mostrar = "";
    console.log(r);
    r.forEach((r) => {
      let tipo = r.NombreTipoMenu;
      mostrar += `
      <option value="${tipo}">${tipo}</option>
      `;
    });
    $("#tipoSelect").html(mostrar);
  });

var menuFrom = document.getElementById("agregarMenu");

menuFrom.addEventListener("submit", function (e) {
  e.preventDefault();

  const datos = new FormData(menuFrom);

  if (comidasArray.length == cantComidas) {
    datos.append("comidas", comidasArray);
    fetch("../persistencia/addMenu.php", {
      method: "post",
      body: datos,
    })
      .then((r) => r.text())
      .then((r) => {
        console.log(r);
        if (!r) {
          mostrarNotif("correcto", `Menu agregado correctamente!`, 1000);
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      });
  } else {
    mostrarNotif("aviso", `¡Faltan comidas!`, 1500);
  }
});

fetch("../persistencia/listarComidas.php")
  .then((r) => r.json())
  .then((r) => {
    r.forEach((r) => mostrarProducto(r.Nombre, r.ImagenURL, r.IDComida));

    let productos = Array.from($(".producto"));
    productos.forEach((prod) => {
      prod.addEventListener("click", () => {
        let idcomida = $(prod).attr("data-idComida");
        if (comidasArray.includes(idcomida)) {
          //lo elimino
          $(prod).css({ outline: "none" });
          let index = comidasArray.indexOf(idcomida);
          if (index > -1) {
            comidasArray.splice(index, 1);
          }
        } else {
          if (comidasArray.length < cantComidas) {
            //lo agrego
            $(prod).css({ outline: "3px solid #45c936" });
            comidasArray.push(idcomida);
          } else {
            mostrarNotif("aviso", "No puedes agregar mas comidas a este menu.", 1500);
          }
        }
        $("#upper h1").html(`Comidas ${comidasArray.length}/<comidasCant>${cantComidas}</comidasCant>`);
        console.log(comidasArray);
      });
    });
  });

function mostrarProducto(nombre, img, id) {
  let productoHTML = `
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
  $("#listado-platos").append(productoHTML);
}

$("#tipoSelect").change(() => {
  tipoMenu = $("#tipoSelect").val();

  if (tipoMenu == "Mensual") {
    cantComidas = 20;
  } else if (tipoMenu == "Semanal") {
    cantComidas = 5;
  } else if (tipoMenu == "Quincenal") {
    cantComidas = 15;
  }

  $("comidasCant").html(cantComidas);
});
