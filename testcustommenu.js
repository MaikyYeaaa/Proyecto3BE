var comidasId = [];
var comidasTope = 5;

loadMenuSlots(5); //Cargar slots en valor Semanal
var returnaso = tremendaFunction();
console.log(returnaso);

$("#noseloco").click(reload);

function reload(){
    console.log("Reloading...");
    loadMenuSlots(comidasTope);
}


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

            if(tremendaFunction(comida.IDComida)){
                console.log("NO AGREGAMO NADAAAAAAAAAAA");
            }else{
                console.log("Vamo a agregaaaaaaaaaaaa " + comida.IDComida + tremendaFunction(comida.IDComida));
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
            }
           
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


function loadMenuSlots(slotsN){
console.log("Holanda");
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
    </section>
        `);
    })





   
}


$("#btnCompra").click(add);

function add() {
    if (confirm("¿Quieres agregar este menu al carrito de compras?")) {
        CrearMenuParaComprar(2, comidasId); // Use "2" directly
    console.log("hola no se");
      } else {
      }
    
}

function CrearMenuParaComprar(idComprador, comidas) {
    var data = new FormData();
    data.append("idComprador", idComprador);
    data.append("comidas", comidas);
    console.log("llegamo hasta aca");
    fetch("../persistencia/crearMenuCustom.php", {
        method: "POST",
        body: data
    })
    .then((r) => r.text())
    .then((r) => {
        console.log(r);
        agregarAlCarritoCM();
    });
}

async function agregarAlCarritoCM() {
    let idOp;
    fetch("../persistencia/getLastMenuID.php")
    .then((r)=> r.json())
    .then(async(r)=> {
        console.log(r);
        idOp = r[0].ID;
        console.log(idOp);
        console.log(r);

        const id = idOp;
    const nombre = "MenuCustom";
    const img = "../src/CMico.png";
    const precio = 4000;
    const descuento = 0;
  
    let tipo = "custom";
    if (descuento) {
      tipo = "descuento";
    }
    console.log(id);
    let platosMenu = [];
    const integra = await obtenerDatos("../persistencia/getIntegra.php");
  
    integra.forEach((comida) => {
      if (id == comida.IDMenu) {
        platosMenu.push(comida.IDComida);
      }
    });
  
    console.log(platosMenu);
  
    let carritoPrevio = obtenerCarrito();
    console.log(carritoPrevio);
  
    if (!revisarRepeticion(id, carritoPrevio)) {
      let item = { id: id, nombre: nombre, img: img, precio: precio, cant: 1, comidas: platosMenu, tipo: tipo };
      carritoPrevio.push(item);
    } else {
      let itemExistente = carritoPrevio.find((item) => item.id == id);
      if (itemExistente) {
        itemExistente.cant++;
      }
    }
    localStorage.setItem("carrito", JSON.stringify(carritoPrevio));
          
    })
  
    

  }

  function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  }
  
  function revisarRepeticion(id, carritoPrevio) {
    let repete = false;
    carritoPrevio.forEach((item) => {
      let itemID = item.id;
      console.log(`itemID: ${itemID}`);
      console.log(`id: ${id}`);
  
      if (itemID == id) {
        repete = true;
      }
    });
    return repete;
  }
  
  async function obtenerDatos(url) {
    const respuesta = await fetch(url);
    const json = await respuesta.json();
    return json;
  }

  function tremendaFunction(comidaToFind){
    let encontro = false;
    comidasId.forEach((comida)=> {
        
        let index = comidasId.indexOf(comidaToFind);

        if (index !== -1) {
             console.log(`valor ${comidaToFind} encontrado en slot ${index}`);
             encontro = true;
             
        } else {
            console.log(`valor ${comidaToFind} no encontrado`);
            encontro = false;
           
        }


    });
    return encontro;
    
    
  }