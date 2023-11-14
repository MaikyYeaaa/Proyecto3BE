import { modalBlock } from "../scripts/functionsVarias.js";

const ID_user = localStorage.getItem("id");
if (ID_user) {
  verifAuth();
} else {
  modalBlock("Usuario no registrado", "Debe estar registrado para acceder al contenido.", "Pagina Principal", "Intentar Nuevamente");
}
async function verifAuth() {
  let datos = new FormData();
  datos.append("id", ID_user);
  fetch("../persistencia/getClientFromId.php", {
    method: "post",
    body: datos,
  })
    .then((r) => r.json())
    .then((user) => {
      if (user.Autorizado == "NULL") {
        modalBlock("Usuario no autorizado", "Espere a que se autorize o contacte con soporte", "Pagina Principal", "Cerrar Sesion");
      }
    });
}
