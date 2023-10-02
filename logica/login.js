import { modalBlock, getRol } from "../scripts/functionsVarias.js";

if (userID) {
  const rol = await getRol(userID);
  let aDondeVamos = "";
  switch (rol) {
    case "gerente":
      aDondeVamos = "Menu Gerente";
      break;
    default:
      aDondeVamos = "Pagina Principal";
      break;
  }

  modalBlock("Ya estas ingresado", "Si deseas ingresar con otra cuenta tendras que cerrar sesion.", aDondeVamos, "Cerrar Sesion");
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
        FeedBack("psswrdError", "80px");
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
    .then(async (r) => {
      r = r[0].Nro; // hago q r sea solo el numero
      console.log(r);
      localStorage.setItem("id", r);
      const rol = await getRol(r);
      switch (rol) {
        case "gerente":
          window.location.href = "parametrizardatos.html";
          break;

        default:
          window.location.href = "index.html";
          console.log(rol);
          break;
      }
      // localStorage.getItem("id"); TE MUESTRA LA ID DEL LOCO
    });
}

// localStorage.clear();
// sessionStorage.clear();
console.log(localStorage.getItem("id"));

$("#togglePassword").click(function () {
  let inputType = $("#inputPass").attr("type");
  if (inputType === "password") {
    $("#inputPass").attr("type", "text");
    $(this).attr("src", "../src/eye.svg");
  } else {
    $("#inputPass").attr("type", "password");
    $(this).attr("src", "../src/eye-slash.svg");
  }
});
