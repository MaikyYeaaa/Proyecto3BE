import { getRol } from "../scripts/functionsVarias.js";

const userID = localStorage.getItem("id");
const rol = await getRol(userID);
console.log(`rol: ${rol}`);
switch (rol) {
  case "gerente":
    $("#nav").prepend(`<a href="mod-pedidos.html">Interno</a>`);
    break;
  case "CService":
    $("#nav").prepend(`<a href="vertickets.html">Interno</a>`);
    break;
  case "admin":
    $("#nav").prepend(`<a href="mod-pedidos.html">Interno</a>`);
    break;
  case "jefe":
    $("#nav").prepend(`<a href="mod-pedidos.html">Interno</a>`);
    break;
  default:
    break;
}
