const userID = localStorage.getItem("id");

function showNav() {
  if (!navClickeada) {
    $("#navbar").css({ height: "100vh" });
    navClickeada = true;
  } else {
    $("#navbar").css({ height: "90px" });
    navClickeada = false;
  }
}

let perfil = "";
let carrito = "";
if (!userID) {
  perfil = `<a href="login.html">Iniciar Sesion</a>`;
} else {
  carrito = `<a href="carrito.html">Carrito</a>`;
  perfil = `<a href="perfil.html">Perfil</a>`;
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
<a href="index.html">Home</a>
<a href="listado-menus.html">Menus</a>
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
  console.log(texto);
});

var navClickeada = false;
