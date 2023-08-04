fetch("../persistencia/pedidos.json")
  .then((r) => r.json())
  .then((r) => {
    let mostrar = " ";

    for (let i = 0; i < r.length; i++) {
      let id = r[i].Id;
      let nombre = r[i].Nombre;
      let creador = r[i].Creador;
      let estado = r[i].Estado;
      let coste = r[i].Creador;
      let fechaInicio = r[i].FechaInicio;
      let fechaFin = r[i].FechaFin;
      let comidas = r[i].Comidas;

      mostrar += `
        id: ${id}
        <br>
        nombre: ${nombre}
        <br>
        estado: ${estado}
        <br>
        creador: ${creador}
        <br>
        coste: ${coste}
        <br>
        fechaInicio: ${fechaInicio}
        <br>
        fechaFin: ${fechaFin}
        <br>
        comidas: ${comidas}
        <br>
        <br>
         `;
    }

    $("#mostrar").html(mostrar);
  });

$("button").click(filtrar);
function filtrar() {
  let filtro = $("#filtro").val();
  fetch("../persistencia/pedidos.json")
    .then((r) => r.json())
    .then((r) => {
      let mostrar = " ";

      for (let i = 0; i < r.length; i++) {
        let id = r[i].Id;
        let nombre = r[i].Nombre;
        let creador = r[i].Creador;
        let estado = r[i].Estado;
        let coste = r[i].Creador;
        let fechaInicio = r[i].FechaInicio;
        let fechaFin = r[i].FechaFin;
        let comidas = r[i].Comidas;
        if (
          filtro == id ||
          filtro == nombre ||
          filtro == creador ||
          filtro == estado ||
          filtro == coste ||
          filtro == fechaInicio ||
          filtro == fechaFin
        ) {
          mostrar += `
        id: ${id}
        <br>
        nombre: ${nombre}
        <br>
        estado: ${estado}
        <br>
        creador: ${creador}
        <br>
        coste: ${coste}
        <br>
        fechaInicio: ${fechaInicio}
        <br>
        fechaFin: ${fechaFin}
        <br>
        comidas: ${comidas}
        <br>
        <br>
         `;
        }
      }

      $("#mostrar").html(mostrar);
    });
}
