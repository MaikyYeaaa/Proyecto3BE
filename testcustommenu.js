var comidasId = [];
var comidasTope = 0;


$("#tipoMenu").on("change", function() {
    var selectedText = $(this).find("option:selected").text();
    loadMenuSlots(getSlotN(selectedText));
  });


function getSlotN(type){
    switch (type){
        case "Semanal":
            comidasTope = 5;
            return 5;
            break;
        case "Quincenal":comidasTope = 15;
            return 15;
            break;
        case "Mensual":
            return 25;comidasTope = 25;
            break;
        default :comidasTope = 5; 
        return 5;
    }

}



function showModalComidas(slot){
    document.getElementById('menuModal').style.display = 'block';
    loadComidas(slot);
}



// JavaScript to hide the modal
document.querySelector('.close-modal').addEventListener('click', function () {
    document.getElementById('menuModal').style.display = 'none';
});

$("#menuAddBtn").click(addMenu);

function addMenu(){
    document.getElementById('menuModal').style.display = 'none';
}


const scrollContainers = document.querySelectorAll('.scroll-container');

function scrollRight(scrollContainer) {
    scrollContainer.scrollLeft += 1; // Ajusta la velocidad de desplazamiento aquí
    if (scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        requestAnimationFrame(() => scrollRight(scrollContainer));
    } else {
        setTimeout(() => scrollLeft(scrollContainer), 2000);
    }
}

function scrollLeft(scrollContainer) {
    scrollContainer.scrollLeft -= 1; // Ajusta la velocidad de desplazamiento aquí
    if (scrollContainer.scrollLeft > 0) {
        requestAnimationFrame(() => scrollLeft(scrollContainer));
    } else {
        setTimeout(() => scrollRight(scrollContainer), 2000);
    }
}

scrollContainers.forEach((scrollContainer) => {
    scrollContainer.addEventListener('mouseenter', () => {
        cancelAnimationFrame(() => scrollLeft(scrollContainer));
        cancelAnimationFrame(() => scrollRight(scrollContainer));
    });

    scrollContainer.addEventListener('mouseleave', () => {
        setTimeout(() => scrollRight(scrollContainer), 2000);
    });

    setTimeout(() => scrollRight(scrollContainer), 2000);
});



function loadComidas(slot){
    fetch("../persistencia/listarComidas.php")
    .then((r)=> r.json())
    .then((r)=> {
        $("#menuList").html("");
        console.log(r);
        r.forEach((comida,val)=> {
            $("#menuList").append(`  
            
            <section id="MenuSelect">
            <img src="${comida.ImagenURL}" alt="" srcset="" id="imgMenu">
            <div class="scroll-container">

                  
                  <article  class="content" style="overflow-x: scroll;">${comida.Nombre}</article>
                
              </div>
            
            <button id="menuAddBtn" onClick="AddComida('${comida.IDComida}',${slot})"></button>
            <article id="menuTitleGradinet"></article>
            <img src="../src/CMAdd.svg.svg"id="addSvg" alt="">
        </section>
`);
        })
    })
}

function AddComida(comida,id){
    console.log(id);
    console.log(`Comida = ${comida} IdSlot = ${id}`);
    updateSlot(id,comida);
    comidasId[id] = comida;
    closeModal();
    console.log(comidasId);
    if (esPosible()) {
        $("#btnCompra").prop("disabled", false);
        console.log("Ya ta maestro");

    } else {
        console.log("Faltaaan");
        $("#btnCompra").prop("disabled", true);
    }
}


function esPosible() {
    if(comidasId.length<=1){
        return false;
    }
    for (var i = 0; i < comidasTope; i++) {
        if (comidasId[i] == null) {
            return false;
        }
    }
    return true;
}





function closeModal(){
    document.getElementById('menuModal').style.display = 'none';
}

loadMenuSlots(20);

function loadMenuSlots(slotsN){
comidasId.splice(0,comidasTope);
$("#btnCompra").prop("disabled", true);
console.log("holandaa");
$("#menuSlots").html("");
for(let i = 0; i < slotsN;i++){ 
    console.log(i);
    $("#menuSlots").append(`
    <section id="SlotContainer${i}" class="slot">
    
    <section id="menuEmptyBody">
    <button id="menuButton" onClick="showModalComidas(${i})"></button>
    <article id="menuEmptyImg"><img id="addImg" src="../src/CMAdd.svg.svg" alt="" srcset=""></article>
    <article id="menuInputs">
        <button id="MenuModify"><img src = "../src/edit.svg" alt="Editar" id="modifsvg"/></button>
    </article>
    <article id="menuType">Vacio</article>
    </section>
    
    </section>
   `);
}

}

function updateSlot(id,comidaId){
    var data = new FormData();
    data.append("ID",comidaId);

    fetch("../persistencia/getComidaFromId.php", {
        method: "POST",
        body: data
    })
    .then((r) => r.json())
    .then((r)=> {
        console.log(r);
        console.log(r[0].ImagenURL);
        $(`#SlotContainer${id}`).html("");
        $(`#SlotContainer${id}`).append(`
        <section id="menuBody">
        <button id="menuButton" onClick="showModalComidas('${id}')" ></button>
        <article id="menuImg"><img id="menuimage" src="${r[0].ImagenURL}" alt="img" srcset=""></article>
        <article id="menuInfo">
            <section id="menuName"
            </section>
            <ection id="menuDesc">${r[0].Nombre}
            </ection>
        </article>
        <article id="menuInputs">
            <button id="MenuModify"><img src = "../src/edit.svg" alt="Editar" id="modifsvg"/></button>
        </article>
        <article id="menuType">A ARREGLAR CON VIEW</article>
    </section>
        `);
    })


   
}