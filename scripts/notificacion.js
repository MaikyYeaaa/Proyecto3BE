export function mostrarNotif(tipo, mensaje, tiempo) {
  console.log(tipo, mensaje);

  if (tiempo == undefined) {
    tiempo = 3000;
  }

  const modalHTML = `
  <link rel="stylesheet" href="../styles/notifs.css">

  <div id="notif" class="notif">
  
  <div class="notif-content" style="opacity: 0">
      <p id="mensajeNotif"></p>
    </div>
  </div>
`;
  document.body.innerHTML += modalHTML;

  let modal = $("#notif");
  let mensajeModal = $("#mensajeNotif");

  mensajeModal.html(mensaje);

  switch (tipo) {
    case "correcto":
      $(".notif-content").css({ "background-color": "green" });
      break;
    case "error":
      $(".notif-content").css({ "background-color": "orangered" });
      $(".notif-content").animate({ opacity: "1" }, 140);
      break;
    case "aviso":
      $(".notif-content").css({ "background-color": "orange" });
      break;
  }
  modal.css({ display: "flex" });

  setTimeout(() => {
    $(".notif-content").animate({ opacity: "0" }, 140);
    setTimeout(() => {
      modal.css({ display: "none" });
    }, 150);
  }, tiempo);
}
