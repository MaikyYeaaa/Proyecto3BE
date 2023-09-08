import { getRol, modalBlock } from "./functionsVarias.js";

async function navbarEmpleado() {
  const navGerente = `
  <link rel="stylesheet" href="../styles/navGerente.css" />
  <section id="adminMenu">
  ${await mostrarSegunRol()}
  </section>
  `;

  $("body").prepend(navGerente);
}
// async function navGerenteFunction() {
//   const idUser = localStorage.getItem("id");
//   let rol = await getRol(idUser);
//   if (rol == "gerente") {
//     console.log("soy gerente pa");
//   }
// }

// navGerenteFunction();

async function mostrarSegunRol() {
  switch (await getRol()) {
    case "gerente":
      return `<article id="containerArticle">
    <h1>Menu Gerente</h1>
    <section id="MenuButtons">
      <a href="stock.html">
        <button>STOCK</button>
      </a>
      <a href="">
        <button>PEDIDOS</button>
      </a>
      <a href="productos.html">
        <button>PRODUCTOS</button>
      </a>
      <a href="parametrizardatos.html">
      <button>PARAMETRIZAR DATOS</button>
      </a>
      <a href="parametrizarFAQ.html">
      <button>PARAMETRIZAR FAQ</button>
      </a>
    </section>
  </article>`;
      break;

    default:
      modalBlock("Error", "Ocurrio un error al verificar su rol, porfavor pruebe iniciando nuevamente.", "Cerrar Sesion", "Intentar Nuevamente");
      break;
  }
}

navbarEmpleado();