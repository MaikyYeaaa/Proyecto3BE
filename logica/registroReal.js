let formulario = document.getElementById("registro-form");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = new FormData(formulario);
  if (valida(data)) {
    fetch("../persistencia/registrarUsuario.php", {
      method: "post",
      body: data,
    })
      .then((r) => r.text())
      .then((r) => console.log(r));
  } else {
    console.log("no pasa bro");
  }
});

let tipo = document.getElementById("tipo");
tipo.addEventListener("change", (e) => {
  let queEs = e.target.value;
  console.log(queEs);
  let mostrar = "";
  if (queEs == "web") {
    mostrar = "ci";
  } else {
    mostrar = "rut";
  }
  console.log(mostrar);
  $("#ident").attr("placeholder", `${mostrar}`);
});

function valida(datos) {
  let mail = datos.get("mail");
  let contra = datos.get("contra");
  let contraRepit = datos.get("contra2");

  //verificadores
  let contrasenaVerif = false;
  let contrasenaSecure = false;
  let mailVerif = false;

  if (contra === contraRepit) {
    contrasenaVerif = true;
  }

  var espacioBlanco = new RegExp("/^s+$/");
  if (
    /[A-Z]/.test(contra) && //mayuscula
    /[a-z]/.test(contra) && //minuscula
    /[\d]/.test(contra) && //numero
    !espacioBlanco.test(contra)
  ) {
    contrasenaSecure = true;
  }

  var mailV = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (mailV.test(mail)) {
    mailVerif = true;
  }

  if (!contrasenaVerif || !contrasenaSecure || !mailVerif) {
    if (!contrasenaVerif) {
      console.log("contraseñas no coinciden");
    }
    if (!contrasenaSecure) {
      console.log("la contraseña no es segura");
    }
    if (!mailVerif) {
      console.log("mail no verifica");
    }
  } else {
    return true;
  }
}
