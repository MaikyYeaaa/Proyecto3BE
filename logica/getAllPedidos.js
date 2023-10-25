function getPedidos(){
    var idAux = -2;
    var iterations = 0;
    fetch("../../persistencia/getAllPedidos.php")
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
                  <p>${pedido.Estado_Pedido}.</p>
                </article>
              </section>
                
                `);
            }
           
        })
    })
}

getPedidos();


