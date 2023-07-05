var formulario = document.getElementById("form-registrar");
var verificador = document.getElementById("form-verificacion");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  let datos = new FormData(formulario);

  fetch("../logica/registro.php", {
    method: "POST",
    body: datos,
  })
    .then((r) => r.json())
    .then((r) => {
      console.log(r);

      if (r.toString().length == 5) {
        $("#verificar-codigo").css({ display: "block" });
      }
    });
});

verificador.addEventListener("submit", function (e) {
  e.preventDefault();

  let codigoIngresado = Number($("#codigo-ingresado").val());

  fetch("../persistencia/usuarios.json")
    .then((r) => r.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i]["codigo de verificacion"] == codigoIngresado) {
          data[i]["mail-verificado"] = true;
          console.log("mail verificado!!");
        }
      }
      let jsonNuevo = JSON.stringify(data);
      console.log(jsonNuevo);
    })
    .catch((error) => console.error(error));
});
