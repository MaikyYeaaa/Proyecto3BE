const userID = localStorage.getItem("id");

let perfil = "";
let carrito = "";
if (!userID) {
  perfil = `<a href="login.html">Iniciar Sesion</a>`;
} else {
  carrito = `<a href="carrito.html">Carrito</a>`;
  perfil = `<a href="perfil.html">Perfil</a>`;
}

const navbar = `
<link rel="stylesheet" href="../styles/nav.css" />
<section id="navbar">
<article id="logo">
  <a href="index.html">
    <img src="../src/logo.png" alt="" width="200px" />
  </a>
</article>
<article id="nav">
  <a href="index.html">Home</a>
  <a href="#">Menus</a>
  ${perfil}
  ${carrito}
  <article class="textfield">
    <input id="filtro" type="text" placeholder="Buscar" />
    <img src="../src/ic-search.svg" alt="" />
  </article>
</article>
</section>
`;
$("body").append(navbar);

$("#filtro").on("input", function (e) {
  let texto = $("#filtro").val();
  console.log(texto);
});
