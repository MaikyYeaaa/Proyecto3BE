var buttonValues; //Creo una variable en el inicio para poder obtener el valor del botón que tiene el ID de la serie mas tarde
function isEmpty(value) {
  return value.length === 0;
}

function mostrarPreguntas() {
  fetch("../logica/getFAQ.php")
    .then((r) => r.json())
    .then((response) => {
      const preguntaArray = Object.values(response);
      preguntaArray.forEach((pregunta, index) => {
        $("#parametrizarInputs").append(` <section class="preguntaBody">
             <article id="preguntaContainer">
                 <section id="Pregunta">${pregunta.titulo}</section>
                 <section id="Respuesta">${pregunta.descripcion}</section>
             </article>
             <section id="edit-body">
                 <button class="modify" value="${index}"> <img src="../src/edit.svg" alt="" id="svgimage"></button>
                 <button class="remove" value="${index}"> <img src="../src/remove.svg" alt="" id="svgimage"></button>

             </section>

         </section>`);
      });

      $(".modify").click(function () {
        buttonValues = $(this).val();
        showModal();
      });

      $(".remove").click(function () {
        buttonValues = $(this).val();
        removerJson();
      });
    });
}

mostrarPreguntas();
function removerJson() {
  var data = new FormData();
  data.append("id", buttonValues);
  fetch("../logica/removeFAQFromJson.php", {
    method: "POST",
    body: data,
  })
    .then((r) => r.text())
    .then((response) => {
      location.reload();
    });
}

function editModal() {
  $("#add").append(` <article class="modal-content">
  <span class="close">&times;</span>
  <section id="modalBody">
    <article id="modalTitle">
        <label>Modificar FAQ</label>
    </article>
    <article id="modalForm">
        <label>Pregunta:</label>
        <input type="text" id="preguntaP"><br>
        <label>Respuesta:</label>
        <input type="text" id="respuestaP"><br>
        <button id="addFAQ">Modificar</button>
        </form>
    </article>
  </section>
  
</article>`);
}

function showModal() {
  getValuesFromDBB();
  editModal();
  var modal = document.getElementById("myModal");
  var span = document.querySelector("#myModal .close");
  modal.style.display = "block";
  if (span) {
    span.onclick = function () {
      modal.style.display = "none";
    };
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  var modalInput = document.getElementById("modificarFAQ");
  modalInput.value = buttonValues;
}

$("#modificarFAQ").click(function () {
  buttonValues = $(this).val();

  let nuevoTitulo = $("#preguntaP").val();
  let nuevaDescripcion = $("#respuestaP").val();

  if (!isEmpty(nuevoTitulo) && !isEmpty(nuevaDescripcion)) {
    modificarJson(nuevoTitulo, nuevaDescripcion);
  }
});

function getValuesFromDBB() {
  fetch("../logica/getFAQ.php")
    .then((r) => r.json())
    .then((response) => {
      const preguntaArray = Object.values(response);
      $("#preguntaP").val(preguntaArray[buttonValues].titulo);
      $("#respuestaP").val(preguntaArray[buttonValues].descripcion);
    });
}

function modificarJson(nuevoTitulo, nuevaDescripcion) {
  var data = new FormData();
  data.append("id", buttonValues);
  data.append("titulo", nuevoTitulo);
  data.append("descripcion", nuevaDescripcion);

  fetch("../persistencia/modifyFAQFromJson.php", {
    method: "POST",
    body: data,
  })
    .then((r) => r.json())
    .then((response) => {
      location.reload();
    });
}

function addFAQ() {
  $("#addModal").css("display", "flex");
}

const formu = document.getElementById("addForm");
formu.addEventListener("submit", function (e) {
  e.preventDefault();
  const datos = new FormData(formu);
  fetch("../persistencia/addFAQ.php", {
    method: "post",
    body: datos,
  })
    .then((r) => r.text())
    .then((r) => {
      location.reload();
    });
});

$(".modal-content span").click(() => {
  $("#addModal").css("display", "none");
});
