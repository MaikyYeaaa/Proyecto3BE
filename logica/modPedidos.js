


function mostrarTabla() {
    $("#Pedidos").html("");
    fetch("../../logica/ObtenerPedidos.php")
        .then((r) => r.json())
        .then((r) => {
            const pedidos = Object.values(r);
            pedidos.forEach((pedido) => {
                    $("#Pedidos").append(`<tr> <br> <td> ${pedido.Nombre}</td> <td> ${pedido.FechaInicio} <td> ` + getBoxValues(pedido.Estado,pedido) +`
                   <br> </tr> <br>`);
            });
        });
}

mostrarTabla();

$(document).on("change", "#pedido", function() {
    let nombre = $(this).attr("name");
    let accion = $(this).val();
    let  fechaActual = new Date();
    let diaActual = fechaActual.getDate()+1;
    let mesActual = fechaActual.getMonth() + 1;
    let añoActual = fechaActual.getFullYear();
  let dateOutput = diaActual + "/" + mesActual + "/" + añoActual;
    $.ajax({
        url: "../../logica/ModificarPedidos.php",
        type: "POST",
        data: { posicion: nombre, accion: accion,date: dateOutput},
    });
    mostrarTabla();
    
});


function getBoxValues(value,pedido){
switch(value){
 
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


}

}