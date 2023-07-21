fetch("../persistencia/menus.json")
.then((r) => r.json())
.then((r) => {
    r.forEach((r) => {
        let mostrar = `
        ${r.nombre_menu} => stock: ${r.stock} 
        <input type="submit" value="modificar" onclick="modificar(this)" data-nombre="${r.nombre_menu}" data-id="${r.id_menu}">
        <br>
        `;
        $("#mostrar").append(mostrar);
    })
})

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