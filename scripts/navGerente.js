const navGerente = `
<link rel="stylesheet" href="../styles/navGerente.css" />
<section id="adminMenu">
  <article id="containerArticle">
    <h1>Menu Gerente</h1>
    <section id="MenuButtons">
      <a href="stock.html">
        <button>STOCK</button>
      </a>
      <a href="consultarPedidos.html">
        <button>PEDIDOS</button>
      </a>
      <a href="productos.html">
        <button>PRODUCTOS</button>
      </a>
      <a href="parametrizardatos.html">
      <button>PARAMETRIZAR DATOS</button>
      </a>
    </section>
  </article>
</section>
`;

$("body").append(navGerente);
