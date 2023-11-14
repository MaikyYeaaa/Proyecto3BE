function modModalPromos(display) {
  $("#modal-promos").css("display", display);
}

$("#nombre-select").change(() => {
  let valor = $("#nombre-select").val();
  menus.forEach((menu) => {
    if (valor == menu.id) {
      $("#nombre").val(menu.nombre);
      $("#imgURL").val(menu.img);
      // $("#precio").val(menu.precio);
      $("#precio").attr("precioViejo", menu.precio);
    }
  });
});

let menus = [];
fetch("../persistencia/getMenus.php")
  .then((r) => r.json())
  .then((r) => {
    r.forEach((menu) => {
      let nombre = menu.Nombre;
      let id = menu.IDMenu;
      let precio = menu.Precio;
      let img = menu.MenuIMG;
      let datos = { nombre: nombre, precio: precio, img: img, id: id };
      menus.push(datos);
      let option = "";
      if (menu.Descuento == "0") {
        option = `
        <option value="${id}">${nombre}</option>
        `;
      }
      $("#nombre-select").append(option);
    });
  });

function eliminarPublicacion(id) {
  let datos = new FormData();
  datos.append("id", id);
  fetch("../persistencia/eliminarPublicacion.php", {
    method: "post",
    body: datos,
  })
    .then((r) => r.text())
    .then((r) => {
      if (r == "1") {
        location.reload();
      } else {
        alert(`error: ${r}`);
      }
    });
}

let formulario = document.getElementById("formulario");
formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  const datos = new FormData(formulario);
  let precioViejo = Number($("#precio").attr("precioViejo"));
  datos.append("precioViejo", precioViejo);

  fetch("../persistencia/addPublicacion.php", {
    method: "post",
    body: datos,
  })
    .then((r) => r.text())
    .then((r) => {
      if (r == "1") {
        location.reload();
      } else {
        alert(r);
      }
    });
});
