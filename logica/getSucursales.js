function loadSucursales(){
    console.log("Ho ola");
    fetch("../logica/getSucursales.php")
    .then((r)=> r.json())
    .then((r)=> {
        console.log(r);
        localStorage.setItem("zona",r[0].Nombre);
        r.forEach((sucursal) => {
            $("#lugares").append(`<option value="${sucursal.IDSucursal}">${sucursal.Nombre}</option> `)
            
        })
        $(document).on("change", "#lugares", function() {
            var selectedValue = $(this).val();
            localStorage.setItem("zona",selectedValue);
        

        });
    })
}



loadSucursales();