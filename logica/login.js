var formulario = document.getElementById("form-login");
formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  FeedBack("mailError", "0");
  FeedBack("psswrdError", "0");
  let datos = new FormData(formulario);
  fetch("../persistencia/login.php", {
    method: "post",
    body: datos,
  })
    .then((r) => r.text())
    .then((r) => {
      if (r == "mailError") {
        FeedBack("mailError", "45px");
        console.log("mail");
      } else if (r == "contraError") {
        FeedBack("psswrdError", "45px");
        console.log("contra");
      } else {
        FeedBack("mailError #psswrdError", "0");
        alert("PASAMOOO");
      }
    });
});

function FeedBack(obj, amount) {
  $(`#${obj}`).css({ transform: `translate(${amount})` });
}
