const userID = localStorage.getItem("id");

function showNav() {
  if (!navClickeada) {
    $("#navbar").css({ height: "100vh" });
    navClickeada = true;
  } else {
    $("#navbar").css({ height: "0" });
    navClickeada = false;
  }
}

let perfil = "";
let carrito = "";
if (!userID) {
  perfil = `<a id="txtLogin" href="login.html">Iniciar Sesion</a>`;
} else {
  carrito = `<a id="txtCarrito" href="carrito.html">Carrito</a>`;
  perfil = `<a id="txtPerfil" href="perfil.html">Perfil</a>`;
}

const navbarAuth = `
<script src="../scripts/checkUser.js" type="module"></script>

<link rel="stylesheet" href="../styles/nav.css" />
<nav id="navbar">
<article id="logo">
<a href="index.html">
<img src="../src/logo.png" alt="" width="200px" />
</a>
</article>
<article id="nav">
<a id="txtIndex" href="index.html">Home</a>
<a id="txtListado" href="listado-menus.html">Menus</a>
${perfil}
${carrito}
<article class="textfield">
<input id="filtro" type="text" placeholder="Buscar" />
<img src="../src/ic-search.svg" alt="" />
</article>
</article>
</nav>
<nav id="smallbar">
<article id="logo-small">
<a href="index.html">
<img src="../src/logo-small.png" alt="" width="100px" />
</a>
</article>
<article id="buttonWrapper" onclick="showNav()">
<img src="../src/ep_menu.svg">
</article>
</nav>
<script src="../scripts/getRol.js" type="module"></script>
`;
$("body").append(navbarAuth);

$("#filtro").on("input", function (e) {
  let texto = $("#filtro").val();
});

var navClickeada = false;

const url = window.location.href;
const pagina = cortarUrl(url);

function cortarUrl(url) {
  const corte = url.split("/");
  const parteFinal = corte[corte.length - 1];
  return parteFinal;
}

let txt = "";
switch (pagina) {
  case "login.html":
    txt = $("#txtLogin");
    break;
  case "carrito.html":
    txt = $("#txtCarrito");
    break;
  case "perfil.html":
    txt = $("#txtPerfil");
    break;
  case "index.html":
    txt = $("#txtIndex");
    break;
  case "listado-menus.html":
    txt = $("#txtListado");
    break;
}
if (txt) {
  //$(txt).css("text-shadow", "0 0 30px #49e600, 0 0 40px #77e600, 0 0 50px #00e67b");
  $(txt).css({ background: "#dcf798ab", padding: "10px", "border-radius": "8px", "padding-inline": "20px" });
}
