// fetch("../persistencia/userInstance.json")
//   .then((r) => r.json())
//   .then((r) => {
//     r.forEach((pedido) => {
//         user = r.Nombre;
//     })
//   });

fetch("../persistencia/userInstance.json")
  .then((r) => r.json())
  .then((r) => {
    var user = r.Nombre;

    fetch("../persistencia/pedidos.json")
      .then((pedidos) => pedidos.json())
      .then((pedidos) => {
        pedidos.forEach((p) => {
          userPedido = p.Creador;
          let mostrar = "";
          if (user == userPedido) {
            mostrar += `
            Pedido: ${p.Nombre} <br>
            estado del pedido: ${p.Estado}
            <br><br>
            `;
          }
          $("#mostrar").append(mostrar);
        });
      });
  });
