// script.js

$(document).ready(function() {
    $("#btnNotif").click(function() {
      mostrarTabla();
    });
  
   
    $("#Notif").on("click", ".change", function() {
      const row = $(this).closest("tr"); 
      const index = row.index();
      removeNotif(index);
      row.remove(); 
    });
  });
  
  function mostrarTabla() {
    $("#Notif").html(""); 
    fetch("../../logica/obtenerNotif.php")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((notif) => {
          $("#Notif").append(`<tr>
                                <td>${notif.Nombre}</td>
                                <td>${notif.FechaInicio}</td>
                                <td><button class="change">Reponer</button></td>
                              </tr>`);
        });
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }
  
  function removeNotif(index) {
    fetch('../../logica/responderNotif.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'index=' + index,
    })
      .then((response) => response.text())
      .then((r) => {
      })
  }