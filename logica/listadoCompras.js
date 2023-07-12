fetch("../persistencia/compras.json")
  .then((r) => r.json())
  .then((r) => {
    r.forEach((r) => {
      $("body").append(`
      <section>
      Fecha Compra: 23/07/2022
      <br />
      Comprador: Mateo <br />
      ID compra: 1234 <br />
      Producto: Menu1, Menu 2
    </section>
      `);
    });
  });
