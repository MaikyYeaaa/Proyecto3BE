let data = new FormData();
data.append("id", localStorage.getItem("id"));

fetch("../persistencia/getCuentaFromId.php", { method: "post", body: data })
  .then((r) => r.json())
  .then((r) => {
    let mail = r[0].Mail;

    $("#txtMail").append(` ${mail}`);

    data.append("mail", mail);
    console.log(data.get("mail"));
    fetch("../persistencia/getClientFromMail.php", { method: "post", body: data })
      .then((r) => r.json())
      .then((r) => {
        let dir = r[0].Dir;

        $("#txtDir").append(` ${dir}`);
      });
  });

function cerrarSesion() {
  const confirmar = confirm("Seguro quiere cerrar sesion?");
  if (confirmar) {
    localStorage.clear();
    window.location.href = "index.html";
  }
}
