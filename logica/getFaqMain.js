function getFaq(){
    fetch("../logica/getFAQ.php")
    .then((r)=> r.json())
    .then((r)=> {
        r.forEach((pregunta, index) => {
            $("#faqSection").append(`<section id="FaqBody">
            <article id="FaqTitle">${pregunta.titulo}</article>
            <article id="FaqResp">${pregunta.descripcion}</article>
        </section>
`);
        })
    })
}

getFaq();