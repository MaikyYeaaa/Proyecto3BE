$(document).on("click", "#cerrar", function () {
  $("#modal").css({ visibility: "hidden" });
});

export function modalBlock(titulo, texto, opt1, opt2) {
  const botonesInicio = '<a  type="button"';
  let boton1 = botonesInicio;
  let boton2 = botonesInicio;

  switch (opt1) {
    case "Pagina Principal":
      boton1 += 'href="./index.html"';
      break;

    case "Menu Gerente":
      boton1 += 'href="./parametrizardatos.html"';
      break;

    case "Cerrar Sesion":
      boton1 += 'onclick="localStorage.clear();" href="./login.html"';
      break;

    case "Intentar Nuevamente":
      boton1 += 'onclick="location.reload()"';
      break;
  }
  switch (opt2) {
    case "Pagina Principal":
      boton2 += 'href="./index.html"';
      break;

    case "Menu Gerente":
      boton2 += 'href="./parametrizardatos.html"';
      break;

    case "Cerrar Sesion":
      boton2 += 'onclick="localStorage.clear();" href="./login.html"';
      break;

    case "Intentar Nuevamente":
      boton2 += 'onclick="location.reload()"';
      break;
  }

  boton1 += `class="history">${opt1}</a>`;
  boton2 += `class="track">${opt2}</a>`;

  $("body").append(`
  <link rel="stylesheet" href="../styles/cardBad.css" />

  <section id="modalLogin">
      <article id="content">
        <section class="card">
          <article class="header">
            <section class="image">
              <img src="../src/cross.svg" alt="" />
            </section>
            <section class="content">
              <span class="title">${titulo}</span>
              <p class="message">${texto}</p>
            </section>
            <section class="actions">
             ${boton1}
             ${boton2}
            </section>
          </article>
        </section>
      </article>
    </section>
    `);
  $("#modalLogin").css("display", "flex");
}
export async function getRol(id) {
  if (!id) {
    id = localStorage.getItem("id");
  }
  console.log(`id de usuario: ${id}`);
  let datos = new FormData();
  datos.append("id", id);
  const respuesta = await fetch("../persistencia/getRol.php", { method: "post", body: datos });
  const retorno = await respuesta.json();

  return retorno.Rol;
}
export function mostrarNotif(tipo, mensaje, tiempo) {
  if (tiempo == undefined) {
    tiempo = 3000;
  }
  console.log(tipo, mensaje, tiempo);

  const modalHTML = `
  <link rel="stylesheet" href="../styles/notifs.css">

  <section id="notif" class="notif">
    <article class="notif-content" style="opacity: 0">
      <p id="mensajeNotif"></p>
    </article>
  </section>
`;
  $("body").prepend(modalHTML);

  let modal = $("#notif");
  let mensajeModal = $("#mensajeNotif");

  mensajeModal.html(mensaje);

  switch (tipo) {
    case "correcto":
      $(".notif-content").css({ "background-color": "green" });

      break;
    case "error":
      $(".notif-content").css({ "background-color": "orangered" });

      break;
    case "aviso":
      $(".notif-content").css({ "background-color": "orange" });
      break;
  }
  $(".notif-content").animate({ opacity: "1" }, 140);
  modal.css({ display: "flex" });

  setTimeout(() => {
    $(".notif-content").animate({ opacity: "0" }, 140);
    setTimeout(() => {
      modal.css({ display: "none" });
    }, 150);
  }, tiempo);
}
