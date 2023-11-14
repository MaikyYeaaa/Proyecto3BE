mostrarTabla();

$(document).ready(function () {
  $("#Notif").on("click", ".change", function (event) {
    event.preventDefault();

    let name = $(this).val();
    var data = new FormData();
    data.append("menuName", name);
    fetch("../persistencia/RecuperarStockColchon.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.text())
      .then((data) => {
        location.reload();
      });
  });
});

function mostrarTabla() {
  $("#Notif").html("");
  fetch("../persistencia/getMenusAReponer.php")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((notif) => {
        $("#Notif").append(`  <section id="NotifBody">
          <article id="notifimg">
          <img id="imgTremenda" src="${notif.MenuIMG}" alt="" srcset="">
          </article>
          <article id="info">
            <section id="notifTitle">${notif.Nombre}</section>
            <section id="Info">Stock actual: ${notif.StockReal}</section>
          </article>
          <button id="Update" class="change" value="${notif.Nombre}">
            <object data="../src/reload.svg" type="image/svg+xml" id="svg" ></object>
        </button>
        </section>`);
      });
    });
}
