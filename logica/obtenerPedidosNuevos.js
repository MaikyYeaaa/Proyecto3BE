function getPedidos(){
    var idAux = -2;
    var numPedidos = 0;
    fetch("../persistencia/getAllPedidos.php")
    .then((r)=> r.json())
    .then((r)=> {
        console.log(r);
        r.forEach((pedido)=>{

            if(idAux == pedido.ID_Pedido ){
               
            }else{
                iterations = 0;
                console.log(idAux+"=="+pedido.ID_Pedido);
                idAux = pedido.ID_Pedido;
                if(pedido.Estado_Pedido === "Solicitado"){
                    if(numPedidos != NaN && numPedidos >= 9){
                        numPedidos = "+9";
                        console.log("holanda");
                      }else{
                        numPedidos ++;
                        console.log("nope");
                      }
                }
            }
           
        })
        if(numPedidos > 0){
            console.log(numPedidos);
            $("#pedidosbtn").prepend(`
            <section id="NotificationOP">${numPedidos}</section>
            `);
        }
       
    })
}

getPedidos();