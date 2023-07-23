var menuFrom = document.getElementById("agregarMenu");

menuFrom.addEventListener("submit", function (e) {
  e.preventDefault();

  //enviar datos a php
  var datos = new FormData(menuFrom);

  let comida1 = datos.get("comida1");
  let comida2 = datos.get("comida2");
  let comida3 = datos.get("comida3");
  let comida4 = datos.get("comida4");
  let comida5 = datos.get("comida5");

  let comidasGuardadas = [comida1, comida2, comida3, comida4, comida5];

  fetch("../../persistencia/comidas.json")
    .then((r) => r.json())
    .then((r) => {
      //GUARDO TODOS LOS NOMBRES DE LAS COMIDAS EN UN ARRAY
      let comidasTotal = [];
      for (let i = 0; i < r.length; i++) {
        comidasTotal.push(r[i].nombre_comida);
      }
      console.log(comidasTotal);
      let cont = 0;
      for (let o = 0; o < comidasGuardadas.length; o++) {
        for (let a = 0; a < comidasTotal.length; a++) {
          if (comidasGuardadas[o] == comidasTotal[a]) {
            cont++;
          }
        }
      }
      if (cont < 5) {
        alert(`NO LLEGA: ${cont}/5`);
      } else {
        addMenu();
      }
    });
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
