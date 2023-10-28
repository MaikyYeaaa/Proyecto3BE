function getPedidos(){
    fetch("../persistencia/getPedidosToUpdate.php")
    .then((r)=> r.text())
    .then((r)=> {
        console.log(r);
    });
}

getPedidos();