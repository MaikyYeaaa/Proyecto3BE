fetch("../persistencia/listarMenus.php")
  .then((r) => r.json())
  .then((r) => {
    r.forEach((r) => {
      let estrellas = Math.floor(Math.random() * 5) + 1;

      const calcularEstrellas = (estrellas) => {
        let mostrarEstrellas = "";
        for (let i = estrellas; i > 0; i--) {
          mostrarEstrellas += `<img src="../src/star_.svg" alt="" />`;
        }
        for (let a = estrellas; a < 5; a++) {
          mostrarEstrellas += `<img src="../src/blackStar_.svg" alt="" />`;
        }
        return mostrarEstrellas;
      };
      let img = r.MenuIMG;
      let titulo = r.Nombre;
      let precio = r.Precio;
      let id = r.IDMenu;
      let mostrar = `
      <article class="menu">
      <section id="imgContainer">
      <img src="${img}" alt="" />
        </section>
        <section id="footer">
          <article id="textop">
          <h3>${titulo}</h3>
          <p>$${precio}</p>
          <section id="estrellitas">
          ${calcularEstrellas(estrellas)}
          </section>
          </article>
          <button class="callToAction" data-img="${img}" data-precio="${precio}" data-id="${id}" data-nombre="${titulo}" onclick="agregarAlCarrito(this)">Agregar a carrito</button>
          </section>
          </article>
      `;
      $("#mostrar").append(mostrar);
    });

    $(".callToAction").hover(
      function () {
        var numRandom = Math.random() * 10 - 5;
        console.log(numRandom);
        $(this).css({ transform: `translateY(-5px) rotate(${numRandom}deg) scale(1.05)` });
      },
      function () {
        $(this).css({ transform: "", "box-shadow": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" });
      }
    );
    $(".callToAction").click(function () {
      $(this).css({ transform: "", "box-shadow": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" });
      alert("Menu añadido correctamente");
    });
  });
