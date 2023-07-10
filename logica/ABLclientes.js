const obtenerDatos = () => {
  fetch("../logica/ABLclientes.php")
    .then((r) => r.json())
    .then((r) => crearTabla(r));
};

const crearTabla = (r) => {
  let tabla = "<table> <th>CLIENTE</th> <th>CONFIRMAR</th>";

  r.forEach((r) => {
    tabla += `<tr> <td> ${r} </td> <td> <input type="submit" value="confirmar" name="${r}" /> <input type="submit" value="denegar" name="${r}" /> </td> </tr>`;
  });

  tabla += "</table>";

  $("#solicitudes").html(tabla);
};

obtenerDatos();

$(document).on("click", "#solicitudes input[type='submit']", function (e) {
  e.preventDefault();

  var nombre = $(this).attr("name");
  var valor = $(this).attr("value");

  fetch("../logica/confirmarClientes.php", {
    method: "POST",
    headers: {
      "Content-Type": `application/x-www-form-urlencoded`,
    },
    body: `nombre=${encodeURIComponent(nombre)}&valor=${encodeURIComponent(
      valor
    )}`,
  })
    .then((r) => r.text())
    .then((r) => console.log(r));
});
