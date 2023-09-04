


function mostrarTabla() {
    $("#Pedidos").html("");
<<<<<<< Updated upstream
=======



>>>>>>> Stashed changes
    fetch("../../persistencia/getPedidos.php")
        .then((r) => r.json())
        .then((r) => {
          console.log(r);
            const pedidos = Object.values(r);
<<<<<<< Updated upstream
            pedidos.forEach((pedido) => {
                    $("#Pedidos").append(`<tr> <br> <td> ${pedido.Nombre}</td> <td> ${pedido.FechaInicio} <td> ` + getBoxValues(pedido.NombreEstado,pedido) +`
                   <br> </tr> <br>`);
=======

         
            
            pedidos.forEach((pedido,index) => {
              let pedidoData = new FormData();
              pedidoData.append("ID",index);
              fetch("../../persistencia/getNombrePedidos.php", {
                method: "POST",
                body: pedidoData,
              })
              .then((q) => q.json())
              .then((q) =>{
                console.log(q);
                $("#Pedidos").append(`<tr> <br> <td>Pedido de:  ${q[0].Nombre} </td> <td> ${pedido.FechaInicio} <td> ` + getBoxValues(pedido.NombreEstado,pedido) +`
                <br> </tr> <br>`);
              })

                   
>>>>>>> Stashed changes
            });
        });
}

mostrarTabla();

$(document).on("change", "#pedido", function() {
  let pos = $(this).attr("name"); // Assuming you're getting the position from the element's name attribute
  let accion = $(this).val();
  let condicionID;
  switch(accion){
    case "Confirmado":condicionID = 2;
    break;
    case "Rechazado":condicionID = 6;
    break;
  }

  console.log(condicionID);

  var data = new FormData(); 
  data.append("posicion",pos); 
  data.append("accion",accion);

  


  fetch("../../persistencia/ModPedidos.php", {
      method: "POST",
      body: data,
  })
  .then((r) => r.text())
  .then((data) => {
      console.log(data);
      var dataVianda = new FormData();
      dataVianda.append("posicion",pos);
      dataVianda.append("conID",condicionID);
        fetch("../../persistencia/ModVianda.php", {
          method: "POST",
          body: dataVianda,
      })
      .then((r) => r.text())
      .then((data) => {
        console.log(data);
      mostrarTabla();
      });
  });

  

});

function getBoxValues(value,pedido){
  console.log(value);
  switch(value){
   
    case "DESCONOCIDO":
        return `<select name="${pedido.ID}" id="pedido">
        <option value="Solicitado">Solicitado</option>
        <option value="Confirmado">Confirmado</option>
        <option value="Enviado">Enviado</option>
        <option value="Entregado">Entregado</option>
        <option value="Rechazado">Rechazado</option>
      </select>`;
      break;

      case "Solicitado":
        return `<select name="${pedido.ID}" id="pedido">
        <option value="Solicitado" data-value-vianda="0" >Solicitado</option>
        <option value="Confirmado" data-value-vianda="2" >Confirmado</option>
        <option value="Rechazado" data-value-vianda="6">Rechazado</option>
      </select>`;
      break;

      case "Confirmado":
        return `<select name="${pedido.ID}" id="pedido">
        <option value="Confirmado">Confirmado</option>
      </select>`;
      break;

    case "Enviado":
        return `<select name="${pedido.ID}" id="pedido">
        <option value="Enviado">Enviado</option>
      </select>`;
      break;

      case "Entregado":
        return `<select name="${pedido.ID}" id="pedido">
        <option value="Entregado">Entregado</option>
      </select>`;
      break;

      case "Rechazado":
        return `<select name="${pedido.ID}" id="pedido">
        <option value="Rechazado">Rechazado</option>
      </select>`;
      break;

    default:
        return `<select name="${pedido.ID}" id="pedido">
        <option value="Solicitado">Solicitado</option>
        <option value="En-Stock">En Stock</option>
        <option value="En-Producción">En producción</option>
        <option value="Envasado">Envasado</option>
        <option value="Entregado">Entregado</option>
        <option value="Devuelto">Devuelto</option>
        <option value="Desechado">Desechado</option>
      </select>`;


}













  /*switch(value){
 
    case "DESCONOCIDO":
        return `<select name="${pedido.Id}" id="pedido">
        <option value="Solicitado">Solicitado</option>
        <option value="En-Stock">En Stock</option>
        <option value="En-Producción">En producción</option>
        <option value="Envasado">Envasado</option>
        <option value="Entregado">Entregado</option>
        <option value="Devuelto">Devuelto</option>
        <option value="Desechado">Desechado</option>
      </select>`;
      break;

      case "Solicitado":
        return `<select name="${pedido.Id}" id="pedido">
        <option value="Solicitado">Solicitado</option>
        <option value="Envasado">Envasado</option>
      </select>`;
      break;

      case "En-Stock":
        return `<select name="${pedido.Id}" id="pedido">
        <option value="En-Stock">En stock</option>
        <option value="Envasado">Envasado</option>
      </select>`;
      break;

    case "En-Producción":
        return `<select name="${pedido.Id}" id="pedido">
        <option value="En-Producción">En Producción</option>
        <option value="En-Stock">En Stock</option>
        <option value="Envasado">Envasado</option>
      </select>`;
      break;

      case "Envasado":
        return `<select name="${pedido.Id}" id="pedido">
        <option value="Envasado">Envasado</option>
        <option value="Entregado">Entregado</option>
      </select>`;
      break;

      case "Entregado":
        return `<select name="${pedido.Id}" id="pedido">
        <option value="Entregado">Entregado</option>
        <option value="Devuelto">Devuelto</option>
      </select>`;
      break;

      case "Devuelto":
        return `<select name="${pedido.Id}" id="pedido">
        <option value="Devuelto">Devuelto</option>
        <option value="Desechado">Desechado</option>
        <option value="En-Stock">En Stock</option>
      </select>`;
      break;

      case "Desechado":
        return `<select name="${pedido.Id}" id="pedido">
        <option value="Desechado">Desechado</option>
      </select>`;
    default:
        return `<select name="${pedido.Id}" id="pedido">
        <option value="Solicitado">Solicitado</option>
        <option value="En-Stock">En Stock</option>
        <option value="En-Producción">En producción</option>
        <option value="Envasado">Envasado</option>
        <option value="Entregado">Entregado</option>
        <option value="Devuelto">Devuelto</option>
        <option value="Desechado">Desechado</option>
      </select>`;


}*/

}