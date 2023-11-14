let selected = false;

$(document).ready(function () {
  const $section = $("#adminMenu");
  $("#intBtn").click(function () {
    if (selected) {
      $("#adminMenu").css("display", "none");
    } else {
      $("#adminMenu").css("display", "block");
    }
    selected = !selected;

  });
});
