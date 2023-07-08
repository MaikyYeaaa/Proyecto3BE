var formulario = document.getElementById("form-registrar");
var verificador = document.getElementById("form-verificacion");

var valida = (datos) => {
  let mail = datos.get("mail");
  let contra = datos.get("contrasena");
  let contraRepit = datos.get("contrasenaRepit");

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

  var mailV =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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
};

var codigo = null;
formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  let datos = new FormData(formulario);

  if (valida(datos)) {
    fetch("../logica/registro.php", {
      method: "POST",
      body: datos,
    })
      .then((r) => r.json())
      .then((r) => {
        codigo = r;
        console.log(codigo);
        $("#verificar-codigo").css({ display: "block" });
      });
  }
});

verificador.addEventListener("submit", function (e) {
  e.preventDefault();

  let codigoIngresado = Number($("#codigo-ingresado").val());

  if (codigoIngresado == codigo) {
    console.log("verificado!");
  }
});
