var formulario = document.getElementById("form-registrar");
var verificador = document.getElementById("form-verificacion");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  let datos = new FormData(formulario);

  fetch("../php/registro.php", {
    method: "POST",
    body: datos,
  })
    .then((r) => r.json())
    .then((r) => {
      console.log(r);
      globalR = r;
      if (r.toString().length == 5) {
        $("#verificar-codigo").css({ display: "block" });
      }
    });
});

verificador.addEventListener("submit", function (e) {
  e.preventDefault();

  if (globalR == Number($("#codigo-ingresado").val())) {
    console.log("verificado");
  } else {
    console.log("no verifica");
  }
});
