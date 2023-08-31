const userID = localStorage.getItem("id");
if (userID) {
  $("#modalLogin").css("display", "flex");
}

var formulario = document.getElementById("form-login");
formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  FeedBack("mailError", "0");
  FeedBack("psswrdError", "0");
  let datos = new FormData(formulario);
  fetch("../persistencia/login.php", {
    method: "post",
    body: datos,
  })
    .then((r) => r.text())
    .then((r) => {
      if (r == "mailError") {
        FeedBack("mailError", "45px");
        console.log("mail");
      } else if (r == "contraError") {
        FeedBack("psswrdError", "45px");
        console.log("contra");
      } else {
        FeedBack("mailError #psswrdError", "0");
        getID(datos);
      }
    });
});

function FeedBack(obj, amount) {
  $(`#${obj}`).css({ transform: `translate(${amount})` });
}

function getID(datos) {
  fetch("../persistencia/getUserID.php", {
    method: "post",
    body: datos,
  })
    .then((r) => r.json())
    .then((r) => {
      r = r[0].Nro; // hago q r sea solo el numero
      console.log(r);
      localStorage.setItem("id", r);
      window.location.href = "index.html";
      // localStorage.getItem("id"); TE MUESTRA LA ID DEL LOCO
    });
}

// localStorage.clear();
// sessionStorage.clear();
console.log(localStorage.getItem("id"));

function cerrarSesion() {
  const confirmar = confirm("Estas seguro que quieres cerrar sesion?");
  if (confirmar) {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
  }
}

$("#togglePassword").click(function () {
  let inputType = $("#inputPass").attr("type");
  if (inputType === "password") {
    $("#inputPass").attr("type", "text");
    $(this).text("Esconder");
  } else {
    $("#inputPass").attr("type", "password");
    $(this).text("Mostrar");
  }
});
