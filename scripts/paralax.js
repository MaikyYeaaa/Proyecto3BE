$(document).mousemove(function (e) {
  var width = $(this).width();
  var height = $(this).height();
  var moveX = (e.pageX - width / 2) / (width / 2);
  var moveY = (e.pageY - height / 2) / (height / 2);

  //sensibilidad
  var moveXBackground = moveX * 5;
  var moveYBackground = moveY * 5;

  var moveXImg = moveX * 20;
  var moveYImg = moveY * 10;

  $("#fondo-img").css(
    "transform",
    "scale(1.2) translate(" +
      -moveXBackground +
      "px, " +
      -moveYBackground +
      "px)"
  );

  $("#images").css(
    "transform",
    "translate(" + -moveXImg + "px, " + -moveYImg + "px)"
  );

  $("#mouse-focus").css(
    "transform",
    "translate(" + e.pageX + "px, " + e.pageY + "px)"
  );
});

$("#images img").mouseover(mostrarVinieta);
$("#images img").mouseout(ocultarVinieta);

function mostrarVinieta() {
  $("#mouse-focus").css({
    transition: "opacity 1s",
    opacity: 1,
  });
  console.log("entras");
}
function ocultarVinieta() {
  $("#mouse-focus").css({
    transition: "opacity 0.4s",
    opacity: 0,
  });
  console.log("salis");
}
