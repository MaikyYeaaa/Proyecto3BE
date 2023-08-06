const obtenerDatos = () => {
  fetch("../persistencia/Lclientes.php")
    .then((r) => r.json())
    .then((r) => crearTabla(r));
};

const crearTabla = (r) => {
  if (r.length != 0) {
    let tabla = "<table> <th>CLIENTE</th> <th>CONFIRMAR</th>";

    r.forEach((r) => {
      let mail = r.Mail;
      tabla += `<tr> <td> ${mail} </td> <td> <input type="submit" value="confirmar" name="${mail}" /> <input type="submit" value="denegar" name="${mail}" /> </td> </tr>`;
    });

    tabla += "</table>";

    $("#solicitudes").html(tabla);
  } else {
    $("#solicitudes").html("No hay ninguna solicitud en el momento");
  }
};

obtenerDatos();

$(document).on("click", "#solicitudes input[type='submit']", function (e) {
  e.preventDefault();

  var id = $(this).attr("name");
  var valor = $(this).attr("value");

  if (valor === "denegar") {
    let confirmacion = confirm(`seguro que quiere  a ${id}`);
    if (confirmacion) {
      fetch("../persistencia/confirmarClientes.php", {
        method: "POST",
        headers: {
          "Content-Type": `application/x-www-form-urlencoded`,
        },
        body: `id=${encodeURIComponent(id)}&valor=${encodeURIComponent(valor)}`,
      })
        .then((r) => r.text())
        .then(location.reload());
    }
  } else {
    fetch("../persistencia/confirmarClientes.php", {
      method: "POST",
      headers: {
        "Content-Type": `application/x-www-form-urlencoded`,
      },
      body: `id=${encodeURIComponent(id)}&valor=${encodeURIComponent(valor)}`,
    })
      .then((r) => r.text())
      .then(location.reload());
  }
});
