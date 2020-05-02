"use strict"

let XOField;
let cells;

function placeXO(elem, str) {
  if (cells.length == 0) return;

  elem.textContent = str;
  cells.splice(cells.findIndex((item) => item === elem), 1);
}

function isOver() {
  let id_0_0 = document.getElementById("0_0").textContent,
    id_0_2 = document.getElementById("0_2").textContent,
    id_1_1 = document.getElementById("1_1").textContent;

  if ((id_0_0 &&
    id_0_0 == id_1_1 &&
    id_0_0 == document.getElementById("2_2").textContent) ||
    (id_0_2 &&
      id_0_2 == id_1_1 &&
      id_0_2 == document.getElementById("2_0").textContent))
    return true;

  for (let i = 0; i < 3; i++) {
    let id_i_0 = document.getElementById(i + "_0").textContent,
      id_0_i = document.getElementById("0_" + i).textContent;

    if ((id_i_0 &&
      id_i_0 == document.getElementById(i + "_1").textContent &&
      id_i_0 == document.getElementById(i + "_2").textContent) ||
      (id_0_i &&
        id_0_i == document.getElementById("1_" + i).textContent &&
        id_0_i == document.getElementById("2_" + i).textContent))
      return true;
  }

  return false;
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

let XOForm = document.querySelector(".xo-form");
let XOSettings = {
  height: 3,
  width: 3,
  playerSide: undefined,
  botSide: undefined
};

XOForm.addEventListener("submit", function (event) {
  for (let item of this.side) {
    if (item.checked) {
      XOSettings.playerSide = item.id;
    } else XOSettings.botSide = item.id;
  }
  this.style.visibility = "hidden";//"visible"
  newXOGameInit(XOSettings);
  event.preventDefault();
});

function createXOField(lenX, lenY) {
  let field = document.createElement("div");
  field.className = "xo-field";
  XOForm.after(field);
  for (let i = 0; i < lenY; i++) {
    for (let j = 0; j < lenX; j++) {
      let newElem = document.createElement("div");
      newElem.className = "xo-cell";
      newElem.id = i + "_" + j;
      field.append(newElem);
    }
    field.append(document.createElement("br"));
  }
}

function newXOGameInit(settings) {
  if (XOField) XOField.remove();
  createXOField(settings.height, settings.width);
  cells = Array.from(document.querySelectorAll('.xo-cell'));
  XOField = document.querySelector(".xo-field");
  if (XOSettings.botSide == "X") placeXO(cells[randomInt(cells.length)], XOSettings.botSide);
  XOField.addEventListener("click", function (event) {

    let target = event.target;

    if (target.className != "xo-cell" || target.textContent || isOver()) return;

    placeXO(target, XOSettings.playerSide);

    if (isOver()) return;

    placeXO(cells[randomInt(cells.length)], XOSettings.botSide);
  });
  XOField.addEventListener("dblclick", (event) => event.preventDefault());
  XOField.addEventListener("contextmenu", (event) => event.preventDefault());
}