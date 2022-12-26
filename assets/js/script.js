let textTarea = document.querySelector("#text_task");
let total = document.querySelector("#total");
let cards = document.querySelector("#cards");
let buttonTarea = document.querySelector("#button_tarea");
let day = document.querySelector("#day");
let month = document.querySelector("#month");
let year = document.querySelector("#year");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

const agregarTarea = function () {
  if (textTarea.value) {
    tareas.push(textTarea.value);
    textTarea.value = "";
    textTarea.focus();
    console.log(tareas);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    atualizarLista();
  }
};

const criarCardTarea = function () {
  tareas.map(function (tarea, index) {
    const card = document.createElement("div");
    card.classList = "card";

    let card_tarea = `
        <div class="card-body d-flex justify-content-between align-items-center">
            <div>
            <h3> ${tarea}</h3>
            </div>
            <div>
                <button class="btn btn-success" onclick="borrarTarea(${index})">X</button>
            </div>
        </div>
        `;

    card.innerHTML = card_tarea;
    cards.appendChild(card);
  });
};

function atualizarLista() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
  cards.innerHTML = "";
  criarCardTarea();
  total.innerHTML = `<b>Total: </b>${tareas.length}`;
}

function borrarTarea(id) {
  tareas.splice(id, 1);
  atualizarLista();
}

textTarea.addEventListener("keypress", function (e) {
  // console.log(e);
  if (e.keyCode === 13) {
    agregarTarea();
  }
});

buttonTarea.addEventListener("click", function (click) {
  // console.log(click);
  agregarTarea();
});

const setDate = function () {
  let date = new Date();
  day.textContent = date.toLocaleString("br", { day: "numeric" });
  month.textContent = date.toLocaleString("br", { month: "short" });
  year.textContent = date.toLocaleString("br", { year: "numeric" });
};

setDate();

atualizarLista();
