fetch("../persistencia/getZonas.php")
  .then((r) => r.json())
  .then((r) => {
    console.log(r);
    r.forEach((zona) => {
      const nombre = zona.Nombre;
      const direccion = zona.Direccion;

      const zonaHTML = `
        <section class="zona">
            <h1>${nombre}</h1>
            <p>${direccion}</p>
        </section>
        `;
      $("#zonas-container").append(zonaHTML);
    });
  });
