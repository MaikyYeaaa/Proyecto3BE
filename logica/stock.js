var NombreOP;
var Stock;
console.log(localStorage.getItem("id"));
$(document).ready(function() {
    var modal = $("#myModal");
    var btn = $(".MenuStock"); // Select elements with class MenuStock
    var span = $(".btnSecundario");
    console.log("first");

     $("#stockInputs").on("click", ".MenuStock", function() {
        NombreOP = $(this).attr("value");
        var Stock = $(this).text().replace("Stock: ", "");
        modal.css("display", "block");
        $("#ModalTitle").html("Ajustar el Stock de " + NombreOP);
        
        $("#stocknumber").val(Stock);
    });


    span.click(function() {
        modal.css("display", "none");
        $("#stocknumber").val(0);
    });

    $(window).click(function(event) {
        if (event.target === modal[0]) {
            modal.css("display", "none");
        }
    });

    $("#enviarStock").click(function() {
        GetStockValues(NombreOP,3);
    });
});





$("#enviarStock").click(console.log("holanda"));


getMenus();
function clearMenu(){
    location.reload();

}
function getMenus(){
    
    fetch("../persistencia/getMenus.php")
        .then((r) => r.json())
        .then((response) => {
            const MenuArray = Object.values(response);
            let stockcolchon = MenuArray[0].StockColchón;
            let stockmaximo = MenuArray[0].StockMaximo;
            $("#stocknumber").attr("min", stockcolchon);
            $("#stocknumber").attr("max", stockmaximo);

            console.log(stockcolchon);
            console.log(stockmaximo);

            MenuArray.forEach((menu, pos) => {
                let nombre = menu.Nombre;
                $("#stockInputs").append(`<section class="Menuclass">
                <article class="MenuFoto">Fotito</article>
                <article class="MenuInfo">
                    <p class="MenuName" value="${nombre}">${nombre}</p>
                    <section class="MenuFeedback">
                        <p class="MenuDesc">${menu.Descripcion}</p>
                        <button class="MenuStock" value="${nombre}">${menu.StockReal}</button>
                        
                    </section>
                    
                </article>
             </section>`);
    
            }
            
            
            );
            
        })

    
}


function GetStockValues(){
    Stock = $("#stocknumber").val();
    console.log(Stock);
    setStock(NombreOP,Stock);
    clearMenu();
}







function modificar(boton) {
    let id = $(boton).attr("data-id");
    let nombre = $(boton).attr("data-nombre");
    
    let mostrar= `
    <input type="number" placeholder="stock de ${nombre}" name="stockNew" min="0">
    <input type="submit" value="registrar stock">
    `;

    $("#modificar").html(mostrar);

}
let modiForm = document.getElementById("modificar");
modiForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let data = new FormData(modiForm);
    console.log(data.get("stockNew"));
    console.log("aca se manda a la base de datos q lo cambie :D");
})



function setStock(nombre,stock){
    var data = new FormData();
    console.log("ejecutando");
    data.append("menuName",nombre); 
    data.append("stock",stock); 
      fetch("../persistencia/SetMenusStock.php", {
        method: "POST",
        body:data,
      })
        .then((r) => r.text())
        .then((response) => {
          console.log(response);  
    });





}






