fetch("../persistencia/compras.json")
  .then((r) => r.json())
  .then((r) => {
    r.forEach((r) => {
      let fechaCompra = r.FechaCompra;
      let comprador = r.Comprador;
      let idComidas = r.IDcompra;
      let producto = r.Producto;

      $("body").append(`
      <section>
      Fecha Compra: ${fechaCompra}
      <br />
      Comprador: ${comprador}
       <br />
      ID compra: ${idComidas} 
      <br />
      Producto: ${producto}
    </section>
    <br />
      `);
    });
  });
