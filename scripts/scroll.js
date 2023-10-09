const sections = document.querySelectorAll("body > section");

window.addEventListener("scroll", mostrarShit);
mostrarShit();

function mostrarShit() {
    const trigger = window.innerHeight / 5 * 4;
    sections.forEach((sect, idx) => {
        const Top = sect.getBoundingClientRect().top;

        if(Top < trigger) {
            sect.classList.add("show");
        } else {
            sect.classList.remove("show");
        }
    })
}