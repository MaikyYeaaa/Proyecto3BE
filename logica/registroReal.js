import { mostrarNotif, modalBlock, getRol } from "../scripts/functionsVarias.js";

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

let formulario = document.getElementById("registro-form");

let tipo = document.getElementById("tipo");
tipo.addEventListener("change", (e) => {
  let queEs = e.target.value;
  console.log(queEs);
  let mostrar = "";
  if (queEs == "persona") {
    mostrar = "CI";
  } else {
    mostrar = "RUT";
  }
  console.log(mostrar);
  $("#ident").attr("placeholder", `${mostrar}`);
});

async function valida(datos) {
  let response = await fetch("../persistencia/Lclientes.php");
  let r = await response.json();

  let mail = datos.get("mail");
  let contra = datos.get("contra");
  let contraRepit = datos.get("contra2");

  let mailRepetido = r.some((record) => record.Mail === mail); //NO ANDA

  let contrasenaVerif = contra === contraRepit;

  let contrasenaSecure = /[A-Z]/.test(contra) && /[a-z]/.test(contra) && /[\d]/.test(contra) && !/^\s+$/.test(contra);

  let mailV = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let mailVerif = mailV.test(mail);

  if (!contrasenaVerif || !contrasenaSecure || !mailVerif || mailRepetido) {
    if (!contrasenaVerif) mostrarNotif("error", "Contraseñas no coinciden");
    if (!contrasenaSecure) mostrarNotif("error", "La contraseña no es segura (debe tener al menos 1 Mayuscula y 1 numero)", 1000);
    if (!mailVerif) mostrarNotif("error", "El mail es incorrecto");
    if (mailRepetido) mostrarNotif("error", "El mail ya existe en nuestro sistema");
    return false;
  } else {
    return true;
  }
}

let slide = 1;

// SIGUIENTE SLIDE
$("#continuar").click((e) => {
  e.preventDefault();
  slide++;
  mostrarSlide();
});

$("#atras").click((e) => {
  e.preventDefault();
  slide--;
  mostrarSlide();
});

function mostrarSlide() {
  switch (slide) {
    case 1:
      $("#second, #third, #forth, #atras").css({ display: "none" });
      $("#first").css({ display: "flex" });
      $("#botonContinue").css({ "justify-content": "end" });
      $("#follower > :nth-child(1)").css({ background: "black" });
      $("#follower").css({ background: "black" });
      break;

    case 2:
      $("#first, #third, #forth").css({ display: "none" });
      $("#second, #atras").css({ display: "flex" });
      $("#botonContinue").css({ "justify-content": "space-between" });
      $("#follower > :nth-child(1)").css({ background: "radial-gradient(circle, rgba(34,195,96,1) 0%, rgba(45,253,72,1) 100%)" });
      $("#follower > :nth-child(2)").css({ background: "black" });
      $("#follower").css({ background: "black" });

      break;

    case 3:
      $("#first, #second, #forth").css({ display: "none" });
      $("#third").css({ display: "flex" });
      $("#follower > :nth-child(2)").css({ background: "radial-gradient(circle, rgba(34,195,96,1) 0%, rgba(45,253,72,1) 100%)" });
      $("#follower > :nth-child(3)").css({ background: "black" });
      $("#follower").css({ background: "linear-gradient(90deg, rgb(6, 186, 6) 35%, black 35%)" });

      break;

    case 4:
      $("#first, #second, #third").css({ display: "none" });
      $("#forth").css({ display: "flex" });
      $("#follower > :nth-child(3)").css({ background: "radial-gradient(circle, rgba(34,195,96,1) 0%, rgba(45,253,72,1) 100%)" });
      $("#follower > :nth-child(4)").css({ background: "black" });
      $("#continuar").html("Registrarse");
      $("#follower").css({ background: "linear-gradient(90deg, rgb(6, 186, 6) 67%, black 67%)" });

      break;

    case 5:
      $("#first, #second, #third, #forth").css({ display: "none" });
      $("#follower > :nth-child(4)").css({ background: "radial-gradient(circle, rgba(34,195,96,1) 0%, rgba(45,253,72,1) 100%)" });
      $("#follower").css({ background: "rgb(6, 186, 6)" });
      registrarUsuario();
      break;
  }
}

async function registrarUsuario() {
  let data = new FormData(formulario);
  if (await valida(data)) {
    fetch("../persistencia/registrarUsuario.php", {
      method: "post",
      body: data,
    })
      .then((r) => r.text())
      .then((r) => {
        if (r == "correcto") {
          window.open("login.html");
          window.close();
        } else {
          mostrarNotif("error", `${r}`);
        }
      });
  }
}
