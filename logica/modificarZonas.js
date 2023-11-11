fetch("../../persistencia/modificarZonas.json")
  .then((r) => r.json())
  .then((r) => {
    r.forEach((r) => {
      $("body").append(`
      <section>
      Nombre: ${r}
  
    </section>
      `);
    });
  });
