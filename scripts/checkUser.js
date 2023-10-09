import { modalBlock } from "../scripts/functionsVarias.js";

const ID_user = localStorage.getItem("id");
console.log(ID_user);
if(ID_user) {
    verifAuth();
} else {
    modalBlock("Usuario no registrado", "Debe estar registrado para acceder al contenido.", "Pagina Principal", "Intentar Nuevamente");
}
async function verifAuth() {
    let datos = new FormData();
    datos.append("id", ID_user);
  fetch("../persistencia/getClienteFromId.php",{ 
    method: "post", 
    body: datos, 
    })
    .then((r) => r.text())
    .then((user) => {
      console.log(user);
      if(user[0].Autorizado == "NULL") {
        modalBlock("Usuario no autorizado", "Espere a que se autorize o contacte con soporte", "Pagina Principal", "Intentar Nuevamente");
      }
    })
  }