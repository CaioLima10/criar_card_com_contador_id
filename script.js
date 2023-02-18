const columnToDo = document.getElementById("column-todo");
const columnDoing = document.getElementById("column-doing");
const columnDone = document.getElementById("column-done");

const counterTodoP = document.getElementById("counter-todo");
const counterDoingP = document.getElementById("counter-doing");
const counterDoneP = document.getElementById("counter-done");

function generateConterCards() {
  function generateColumnColor(colum, counter) {
    counter.classList.remove("font-red");
    counter.classList.remove("font-green");

    if (colum.childElementCount >= 6) {
      counter.classList.add("font-red");
      counter.classList.remove("font-green");
    } else if (colum.childElementCount > 0 && colum.childElementCount <= 5) {
      counter.classList.add("font-green");
    }
  }

  generateColumnColor(columnToDo, counterTodoP);
  generateColumnColor(columnDoing, counterDoingP);

  counterTodoP.innerHTML = `${columnToDo.childElementCount} /5`;
  counterDoingP.innerHTML = `${columnDoing.childElementCount} /5`;
  counterDoneP.innerHTML = columnDone.childElementCount;
}

function generateCard(id) {
  function drag(e) {
    e.dataTransfer.setData("id", id);
  }

  const card = document.createElement("div");
  card.setAttribute("draggable", true);
  card.setAttribute("id", id);
  card.innerHTML = id;
  card.setAttribute("class", "card");

  card.addEventListener("dragstart", drag);

  return card;
}

function getElementsByLocalstorage() {
  const cardLocal = localStorage.getItem("cards");
  const cardJSON = JSON.parse(cardLocal);

  // Percoorendo todos os cards do localStorage
  cardJSON?.map((cardLocalstorage) => {
    const card = generateCard(cardLocalstorage.id);

    // Colocando os cards na coluna de acordo com seu "columnName"
    if (cardLocalstorage.columnName === "column-todo") {
      columnToDo.appendChild(card);
    }
    if (cardLocalstorage.columnName === "column-doing") {
      columnDoing.appendChild(card);
    }
    if (cardLocalstorage.columnName === "column-done") {
      columnDone.appendChild(card);
    }
  });

  generateConterCards();
}
getElementsByLocalstorage();

function allowDrop(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("id");
  e.target.appendChild(document.getElementById(data));

  generateConterCards();

  // Mudar nome da coluna no localStorage
  const cardsLocalStorage = JSON.parse(localStorage.getItem("cards"));
  const index = cardsLocalStorage.findIndex((card) => card.id === Number(data));
  cardsLocalStorage[index] = e.target.id;

  localStorage.setItem("cards", JSON.stringify(cardsLocalStorage));
}

function createCard() {
  const id = Math.round(Math.random() * 999);
  const card = generateCard(id);

  columnToDo.appendChild(card);

  // LocalStorage ---------------------
  const cardsLocalStorage = JSON.parse(localStorage.getItem("cards"));

  if (cardsLocalStorage) {
    localStorage.setItem(
      "cards",
      JSON.stringify([...cardsLocalStorage, { id, columnName: "column-todo" }])
    );
  } else {
    localStorage.setItem(
      "cards",
      JSON.stringify([{ id, columnName: "column-todo" }])
    );
  }

  generateConterCards();
}