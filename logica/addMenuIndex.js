function modalMenu(menu) {
  const nombre = $(menu).attr("data-nombre");
  const id = $(menu).attr("data-id");
  const confirmar = confirm(`Estas seguro que quieres añadir ${nombre}?`);
  if (confirmar) {
    fetch("../persistencia/addMenuIndex.php", {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((respuesta) => respuesta.json())
      .then((r) => {
        
      });
  }
}
