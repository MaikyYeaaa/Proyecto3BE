function modalMenu(menu) {
  console.log(menu);
  const nombre = $(menu).attr("data-nombre");
  const confirmar = confirm(`Estas seguro que quieres añadir ${nombre}?`);
  if (confirmar) {
    console.log("a"); //añadir
  }
}
