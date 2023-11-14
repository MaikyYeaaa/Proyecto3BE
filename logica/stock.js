var NombreOP;
var Stock;
$(document).ready(function () {
  var modal = $("#myModal");
  var btn = $(".MenuStock"); // Select elements with class MenuStock
  var span = $(".btnSecundario");

  /*$("#stockInputs").on("click", ".MenuStock", function() {
        NombreOP = $(this).attr("value");
        var Stock = $(this).text().replace("Stock: ", "");
        modal.css("display", "block");
        $("#ModalTitle").html("Ajustar el Stock de " + NombreOP);
        
        $("#stocknumber").val(Stock);
        
    });
*/

  span.click(function () {
    modal.css("display", "none");
    $("#stocknumber").val(0);
  });

  $(window).click(function (event) {
    if (event.target === modal[0]) {
      modal.css("display", "none");
    }
  });

  $("#enviarStock").click(function () {
    GetStockValues(NombreOP, 3);
  });
});


getMenus();
function clearMenu() {
  location.reload();
}
function getMenus() {
  fetch("../persistencia/getMenus.php")
    .then((r) => r.json())
    .then((response) => {
      const MenuArray = Object.values(response);
      let stockcolchon = MenuArray[0].StockColchón;
      let stockmaximo = MenuArray[0].StockMaximo;
      $("#stocknumber").attr("min", stockcolchon);
      $("#stocknumber").attr("max", stockmaximo);


      MenuArray.forEach((menu, pos) => {
        let nombre = menu.Nombre;
        $("#stockInputs").append(`<section class="Menuclass">
                <article class="MenuFoto">
                <img src="${menu.MenuIMG}" class="IMG" alt="../../src/noimgico.png" onerror="this.onerror=null;this.src='../src/noimg.png';"/>
                </article>
                <article class="MenuInfo">
                    <p class="MenuName" value="${nombre}">${nombre}</p>
                    <section class="MenuFeedback">
                        <button class="MenuStock" value="${nombre}">${menu.StockReal}</button>
                        
                    </section>
                    
                </article>
             </section>`);
      });
    });
}

function GetStockValues() {
  Stock = $("#stocknumber").val();
  setStock(NombreOP, Stock);
  clearMenu();
}

function modificar(boton) {
  let id = $(boton).attr("data-id");
  let nombre = $(boton).attr("data-nombre");

  let mostrar = `
    <input type="number" placeholder="stock de ${nombre}" name="stockNew" min="0">
    <input type="submit" value="registrar stock">
    `;

  $("#modificar").html(mostrar);
}
let modiForm = document.getElementById("modificar");
modiForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let data = new FormData(modiForm);
});

function setStock(nombre, stock) {
  var data = new FormData();
  data.append("menuName", nombre);
  data.append("stock", stock);
  fetch("../persistencia/SetMenusStock.php", {
    method: "POST",
    body: data,
  })
    .then((r) => r.text())
    .then((response) => {
    });
}
