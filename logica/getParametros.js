fetch("../persistencia/getParametros.php")
  .then((r) => r.json())
  .then((response) => {
    console.log(response);

    $("#cocinasinput").attr("placeholder", response.cocinas);
    $("#tiempoinput").attr("placeholder", response.TiempoCocinado);
    $("#stockminimoinput").attr("placeholder", response.StockColchon);
    $("#stockmaximoinput").attr("placeholder", response.StockMaximo);
    $("#tiempoturnoinput").attr("placeholder", response.TiempoTurno);
  });

let formularioDatos = document.getElementById("parametrizarForm");
formularioDatos.addEventListener("submit", (e) => {
  const datos = new FormData(formularioDatos);
  fetch("../persistencia/parametrizardatos.php", {
    method: "post",
    body: datos,
  })
    .then((r) => r.text())
    .then((r) => {
      console.log(r);
    });
});
