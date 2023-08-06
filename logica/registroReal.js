let formulario = document.getElementById("registro-form");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  let data = new FormData(formulario);
  if (await valida(data)) {
    fetch("../persistencia/registrarUsuario.php", {
      method: "post",
      body: data,
    })
      .then((r) => r.text())
      .then((r) => {
        alert("Usuario registrado correctamente!");
      });
  } else {
    // alert("error");
  }
});

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

  let mailRepetido = r.some((record) => record.Mail === mail);

  let contrasenaVerif = contra === contraRepit;

  let contrasenaSecure = /[A-Z]/.test(contra) && /[a-z]/.test(contra) && /[\d]/.test(contra) && !/^\s+$/.test(contra);

  let mailV = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let mailVerif = mailV.test(mail);

  if (!contrasenaVerif || !contrasenaSecure || !mailVerif || mailRepetido) {
    if (!contrasenaVerif) alert("Contraseñas no coinciden");
    if (!contrasenaSecure) alert("La contraseña no es segura (debe tener al menos 1 Mayuscula y 1 numero)");
    if (!mailVerif) alert("El mail es incorrecto");
    if (mailRepetido) alert("El mail ya existe en nuestro sistema");
    return false;
  } else {
    return true;
  }
}
