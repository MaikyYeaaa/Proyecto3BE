import { modalBlock, getRol } from "./functionsVarias.js";

const id = localStorage.getItem("id");
console.log(id);
if ((await getRol(id)) !== "gerente") {
  modalBlock("Acceso Denegado", "La cuenta con la que ingreso no tiene rol de gerente.", "Cerrar Sesion", "Pagina Principal");
}
