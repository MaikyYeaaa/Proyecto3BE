function getPedidos(){
    var idAux = -2;
    var iterations = 0;
    fetch("../persistencia/getPedidosToUpdate.php")
    .then((r)=> r.json())
    .then((r)=> {
        console.log(r);
        r.forEach((pedido)=>{

            if(idAux == pedido.ID_Pedido ){
                if(iterations <=2){
                    iterations ++;
                    $(`#menusPedido${idAux}`).append(`, ${pedido.Nombre_Menu}`);
                    console.log("Holanda");
                }
               
            }else{
                iterations = 0;
                console.log(idAux+"=="+pedido.ID_Pedido);
                idAux = pedido.ID_Pedido;
                $("#pedidos").append(`
                <section id="pedidoBody">
                <article id="pedidoImg"><img id="imgico" src="${pedido.Imagen_Menu}"></article>
                <article id="pedidoInfo">
                    <section id="nroPedido">Pedido#${pedido.ID_Pedido}</section>
                    <section id="menusPedido${pedido.ID_Pedido}">${pedido.Nombre_Menu}</section>
                    <section id="menuFecha">${pedido.Fecha_Inicio_Estado}</section>
                </article>
                <article id="Pedidooptions">
                ` + getPedidoOptions(pedido.Estado_Pedido,pedido.ID_Pedido) +`
                </article>
              </section>
                
                `);
            }
           
        });
    
        $("#pedidos").on("change", "select.pedido", function (event) {
            const selectedPedidoID = event.target.getAttribute("name");
            const selectedValue = event.target.value;
            console.log("Selected Pedido ID: " + selectedPedidoID + "and value:" + selectedValue);
            updateValue(selectedValue,selectedPedidoID);
        });

    })
}

getPedidos();


function updateValue(state,id){

    let pedidoData = new FormData();
    pedidoData.append('state',state);
    pedidoData.append('id',id);
    fetch("../persistencia/updatePedido.php", {
        method: 'POST',
        body: pedidoData
    })
    .then((r)=> r.text())
    .then((r)=> {
        console.log(r);
    })
}













function getPedidoOptions(state,id){
    console.log(id);
    switch(state){
     
      case "DESCONOCIDO":
          return `<select name="${id}" id="pedido"  class="pedido">
          <option value="Solicitado">Solicitado</option>
          <option value="Confirmado">Confirmado</option>
          <option value="Enviado">Enviado</option>
          <option value="Entregado">Entregado</option>
          <option value="Rechazado">Rechazado</option>
        </select>`;
        break;
  
        case "Solicitado":
          return `<select name="${id}" id="pedido"  class="pedido">
          <option value="Solicitado" data-value-vianda="0" >Solicitado</option>
          <option value="Confirmado" data-value-vianda="2" >Confirmado</option>
          <option value="Rechazado" data-value-vianda="6">Rechazado</option>
        </select>`;
        break;
  
        case "Confirmado":
          return `<select name="${id}" id="pedido"  class="pedido">
          <option value="Confirmado">Confirmado</option>
          <option value="Enviado">Enviado</option>
        </select>`;
        break;
  
      case "Enviado":
          return `<select name="${id}" id="pedido"  class="pedido">
          <option value="Entregado">Entregado</option>
        </select>`;
        break;
  
        case "Entregado":
          return `<select name="${id}" id="pedido"  class="pedido">
          <option value="Entregado">Entregado</option>
        </select>`;
        break;
  
        case "Rechazado":
          return `<select name="${id}" id="pedido"  class="pedido">
          <option value="Rechazado">Rechazado</option>
        </select>`;
        break;
  
      default:
          return `<select name="${id}" id="pedido"  class="pedido">
          <option value="Solicitado">Solicitado</option>
          <option value="Confirmado">Confirmado</option>
          <option value="Enviado">Enviado</option>
          <option value="Entregado">Entregado</option>
          <option value="Rechazado">Rechazado</option>
        </select>`;

}
}



/*function getSelectOptions(state,id){
    console.log(id);
    switch(state){
     
      case "DESCONOCIDO":
          return `<select name="${id}" id="pedido"  class="pedido">
          <option value="Solicitado">Solicitado</option>
          <option value="Confirmado">Confirmado</option>
          <option value="Enviado">Enviado</option>
          <option value="Entregado">Entregado</option>
          <option value="Rechazado">Rechazado</option>
        </select>`;
        break;
  
        case "Solicitado":
          return `<select name="${id}" id="pedido"  class="pedido">
          <option value="Solicitado" data-value-vianda="0" >Solicitado</option>
          <option value="Confirmado" data-value-vianda="2" >Confirmado</option>
          <option value="Rechazado" data-value-vianda="6">Rechazado</option>
        </select>`;
        break;
  
        case "Confirmado":
          return `<select name="${id}" id="pedido"  class="pedido">
          <option value="Confirmado">Confirmado</option>
        </select>`;
        break;
  
      case "Enviado":
          return `<select name="${id}" id="pedido"  class="pedido">
          <option value="Enviado">Enviado</option>
        </select>`;
        break;
  
        case "Entregado":
          return `<select name="${id}" id="pedido"  class="pedido">
          <option value="Entregado">Entregado</option>
        </select>`;
        break;
  
        case "Rechazado":
          return `<select name="${id}" id="pedido"  class="pedido">
          <option value="Rechazado">Rechazado</option>
        </select>`;
        break;
  
      default:
          return `<select name="${id}" id="pedido"  class="pedido">
          <option value="Solicitado">Solicitado</option>
          <option value="En Stock">En Stock</option>
          <option value="En Producción">En producción</option>
          <option value="Envasado">Envasado</option>
          <option value="Entregado">Entregado</option>
          <option value="Devuelto">Devuelto</option>
          <option value="Desechado">Desechado</option>
        </select>`;
  
    }
  }*/