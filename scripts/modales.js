$("#login-click").click(loginMostrar);
$("#login #cerrar img, #login-modal-trigger").click(loginCerrar);

function loginMostrar() {
  $("#login").css("opacity", "1");
  $("#login-modal").css("opacity", "1");
  $("#login").css("pointer-events", "all");
}

function loginCerrar() {
  $("#login-modal").css("opacity", "0");
  $("#login").css("pointer-events", "none");
}
