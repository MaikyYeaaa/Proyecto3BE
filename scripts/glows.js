$("#login-inputs #LblNombre-Contrasena input").focus(glowStart);
$("#login-inputs #LblNombre-Contrasena input").blur(glowStop);

function glowStart() {
  $(this).css("animation", "none");

  void this.offsetWidth;
  $(this).css("animation", "glowUser 1s forwards");
}

function glowStop() {
  $(this).css("animation", "none");

  void this.offsetWidth;
  $(this).css("animation", "glowUser 0.3s reverse");
}
