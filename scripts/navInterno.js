import { getRol, modalBlock } from "./functionsVarias.js";

async function navbarEmpleado() {
  const navGerente = `
  <link rel="stylesheet" href="../styles/navGerente.css" />
  <section id="menuCont">
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
      return `
      
      <article id="mobile-nav">
      <section id="settings">
        <button id="intBtn" style="background-color: rgba(0,0,0,0); border:none;"><img src="../src/int_menu.svg" alt="" srcset="" id="imgBtn"></button>
        </section>
  </article>

  <section id="adminMenu">
      <article id="containerArticle">
          <h1 id="title">Menu Gerente</h1>
          <section id="MenuButtons">
              <a href="stock.html" class="MenuButton" id="stockbtn">
                <button>STOCK</button>
              </a>
              <a href="mod-pedidos.html" class="MenuButton" id="pedidosbtn">
                <button>PEDIDOS</button>
               
              </a>
              <a href="productos.html" class="MenuButton">
                <button>PRODUCTOS</button>
              </a>
              <a href="parametrizardatos.html" class="MenuButton">
              <button>PARAMETRIZAR DATOS</button>
              </a>
              <a href="parametrizarFAQ.html" class="MenuButton">
              <button>PARAMETRIZAR FAQ</button>
              </a>
              </a>
              <a href="parametrizar-index.html" class="MenuButton">
              <button>PARAMETRIZAR INICIO</button>
              </a>
            </section>
        </article>
  </section>
  <script src="../scripts/navIntBtn.js"></script>
  <script src="../logica/obtenerPedidosNuevos.js"></script>
    <script src="../logica/getNotificacionesStock.js"></script>
  `;
      break;
    case "admin":
      return `<article id="containerArticle">
      <h1>Menu Administrador</h1>
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
        <a href="ABLclientes.html">
        <button>ACEPTAR CLIENTES</button>
        </a>
      </section>
    </article>`;
    default:
      modalBlock("Error", "Ocurrio un error al verificar su rol, porfavor pruebe iniciando nuevamente.", "Cerrar Sesion", "Pagina Principal");
      break;
  }
}

navbarEmpleado();
