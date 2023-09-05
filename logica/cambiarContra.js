const formulario = document.getElementById("cambiarContra-form");
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  const datos = new FormData(formulario);
  const id = localStorage.getItem("id");
  datos.append("id", id);

  if (await verifica(datos)) {
    fetch("../persistencia/actualizarContra.php", {
      method: "post",
      body: datos,
    })
      .then((r) => r.text())
      .then((r) => {
        console.log(r);
        if (r == "true") {
          alert("Contraseña actualizada correctamente");
          window.open("perfil.html");
          window.close();
        } else {
          alert(`${r}`);
        }
      });
  } else {
    alert(`to mal`);
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
        return false;
      }
    });

  if (datos.get("contraNueva") == datos.get("contraNuevaConfirm")) {
    if (validaContra(datos)) {
      contraNuevaIgual = true;
    }
  }

  console.log(`contraVieja: ${contraViejaVerificada}, contraNueva: ${contraNuevaIgual}`);

  if (contraNuevaIgual && contraViejaVerificada) {
    return true;
  }
}

function validaContra(datos) {
  let contra = datos.get("contraNueva");

  let contrasenaSecure = /[A-Z]/.test(contra) && /[a-z]/.test(contra) && /[\d]/.test(contra) && !/^\s+$/.test(contra);

  if (contrasenaSecure) {
    return true;
  }
}
