let selected = false;

$(document).ready(function () {
  console.log("penne");
  const $section = $("#adminMenu");
  $("#intBtn").click(function () {
    console.log("pito");
    if (selected) {
      $("#adminMenu").css("display", "none");
    } else {
      $("#adminMenu").css("display", "block");
    }
    selected = !selected;

    console.log("Holanda");
  });
});
