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
  let rol = await getRol();
  console.log(rol);
  switch (rol) {
    case "gerente":
      return `<article id="containerArticle">
    <h1>Menu Gerente</h1>
    <section id="MenuButtons">
      <a href="stock.html">
        <button>STOCK</button>
      </a>
      <a href="mod-pedidos.html">
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
      </a>
      <a href="parametrizar-index.html">
      <button>PARAMETRIZAR INICIO</button>
      </a>
    </section>
  </article>`;
      break;

    default:
      modalBlock("Error", "Ocurrio un error al verificar su rol, porfavor pruebe iniciando nuevamente.", "Cerrar Sesion", "Pagina Principal");
      break;
  }
}

navbarEmpleado();
