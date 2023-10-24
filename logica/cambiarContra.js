import { mostrarNotif } from "../scripts/functionsVarias.js";

const formulario = document.getElementById("cambiarContra-form");
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  const datos = new FormData(formulario);
  const id = localStorage.getItem("id");
  datos.append("id", id);


  
  let contraNueva = datos.get("contraNueva");
  let contraNueva2 = datos.get("contraNueva2");

  if (verificador(contraNueva, contraNueva2)) {
    fetch("../persistencia/verificarContra.php", {
      method: "post",
      body: datos,
    })
      .then((r) => r.text())
      .then((r) => {
  console.log(r);

        if (r == "anda") {
          actualizarContra(datos);
        } else {
          mostrarNotif("error", `${r}`);
        }
      });
  } else {
  }

});

async function verifica(datos) {
  let contraNuevaIgual = false;
  let contraViejaVerificada = await fetch("../persistencia/getCuentaFromId.php", { method: "post", body: datos })
    .then((r) => r.json())
    .then((r) => {
      console.log(r);
      if (r[0].Contrasena == datos.get("contraVieja")) {
        return true;
      } else {
        mostrarNotif("error", "La contraseña actual es incorrecta", 1500);
        return false;
      }
    });

  if (datos.get("contraNueva") == datos.get("contraNuevaConfirm")) {
    if (validaContra(datos)) {
      // mostrarNotif("error", "La contraseña no es segura (debe tener al menos 1 Mayuscula y 1 numero)", 4000);
      contraNuevaIgual = true;
    }
  } else {
    mostrarNotif("error", "Las contraseñas no coinciden.", 1500);
  }

  console.log(`contraVieja: ${contraViejaVerificada}, contraNueva: ${contraNuevaIgual}`);

  if (contraNuevaIgual && contraViejaVerificada) {
    return true;
  }
}

function actualizarContra(datos) {
  fetch("../persistencia/actualizarContra.php", {
    method: "post",
    body: datos,
  })
    .then((r) => r.text())
    .then((r) => {
      if (r) {
        alert("listo!");
      } else {
        alert("no funco");
      }
    });

}
