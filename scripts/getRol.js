import { getRol } from "../scripts/functionsVarias.js";

const userID = localStorage.getItem("id");
const rol = await getRol(userID);
console.log(`rol: ${rol}`);
switch (rol) {
  case "gerente":
    $("#nav").prepend(`<a id="txtInterno" href="ver-pedidos.html">Interno</a>`);
    break;
  case "CService":
    $("#nav").prepend(`<a id="txtInterno" href="vertickets.html">Interno</a>`);
    break;
  case "admin":
    $("#nav").prepend(`<a id="txtInterno" href="ver-pedidos.html">Interno</a>`);
    break;
  case "jefe":
    $("#nav").prepend(`<a id="txtInterno" href="mod-pedidos.html">Interno</a>`);
    break;
  default:
    break;
}
