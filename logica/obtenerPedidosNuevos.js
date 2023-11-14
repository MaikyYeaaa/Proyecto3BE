function getPedidos(){
    var idAux = -2;
    var numPedidos = 0;
    fetch("../persistencia/getAllPedidos.php")
    .then((r)=> r.json())
    .then((r)=> {
        r.forEach((pedido)=>{

            if(idAux == pedido.ID_Pedido ){
               
            }else{
                iterations = 0;
                idAux = pedido.ID_Pedido;
                if(pedido.Estado_Pedido === "Solicitado"){
                    if(numPedidos != NaN && numPedidos >= 9){
                        numPedidos = "+9";
                      }else{
                        numPedidos ++;
                      }
                }
            }
           
        })
        if(numPedidos > 0){
            $("#pedidosbtn").prepend(`
            <section id="NotificationOP">${numPedidos}</section>
            `);
        }
       
    })
}

getPedidos();