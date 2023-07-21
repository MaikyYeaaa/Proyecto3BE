fetch("../persistencia/faq.json")
  .then((r) => r.json())
  .then((r) => {
    r.forEach((r) => {
      console.log(r);

      $("body").append(`
      <section>
      FAQ:  ${r}
      `);
    });
  });
