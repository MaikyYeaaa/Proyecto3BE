var formulario = document.getElementById("form-login");
formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  let datos = new FormData(formulario);
  let mail = datos.get("mail");
  let contra = datos.get("cont");
  var mailV =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (mailV.test(mail)) {
    //Mando la info del form a php por medio de un json, los datos del formulario seran mandados en el body
    fetch("../logica/login.php", {
      method: "POST",
      body: datos,
    })
      //La info es devuelta una vez que el codigo php termina su ejecucion, y guardo el resultado en la variable r
      .then((r) => r.text())
      .then((r) => {
        if (r) {
          $("#resp").html(
            `Correcto! ingresado el correo: ${mail} <br> y la contrasenia: ${contra}`
          );
        } else {
          $("#resp").html(`Error, ingrese los datos nuevamente`);
        }
      });
  }
});
