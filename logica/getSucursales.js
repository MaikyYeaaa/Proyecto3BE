function loadSucursales() {
  fetch("../logica/getSucursales.php")
    .then((r) => r.json())
    .then((r) => {
      localStorage.setItem("zona", r[0].IDSucursal);
      r.forEach((sucursal) => {
        $("#lugares").append(`<option value="${sucursal.IDSucursal}">${sucursal.Nombre}</option> `);
      });
      $(document).on("change", "#lugares", function () {
        var selectedValue = $(this).val();
        localStorage.setItem("zona", selectedValue);
      });
    });
}

loadSucursales();
