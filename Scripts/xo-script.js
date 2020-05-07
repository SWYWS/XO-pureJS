"use strict"

let XOField;
let XOForm = document.querySelector(".xo-form");
let XOSettings = {
  height: 3,
  width: 3,
  playerSide: "X",
  botSide: "O"
};



startGame.addEventListener("click", function () {
  for (let side of XOForm.sides) {
    if (side.checked) {
      XOSettings.playerSide = side.id;
    } else XOSettings.botSide = side.id;
  }
  XOForm.style.visibility = "hidden";
  newXOGameInit(XOSettings);
});



function newXOGameInit(settings) {
  if (XOField) XOField.remove();

  createXOField(settings.height, settings.width);
  let cells = Array.from(document.querySelectorAll('.xo-cell'));
  XOField = document.querySelector(".xo-field");

  if (XOSettings.botSide == "X") placeXO(cells[randomInt(cells.length)], XOSettings.botSide);

  XOField.addEventListener("click", xoClick);
  XOField.addEventListener("dblclick", (event) => event.preventDefault());
  XOField.addEventListener("contextmenu", (event) => event.preventDefault());


  function createXOField(lenX, lenY) {
    let field = document.createElement("div");
    field.className = "xo-field";
    document.querySelector(".xo-game").append(field);
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


  function xoClick(event) {
    let target = event.target;

    if (target.className != "xo-cell" || target.textContent) return;

    placeXO(target, XOSettings.playerSide);

    if (xoGameOver(isOver(settings))) return;

    placeXO(cells[randomInt(cells.length)], XOSettings.botSide);

    xoGameOver(isOver(settings));
  }


  function placeXO(elem, str) {
    if (cells.length == 0) return;

    elem.textContent = str;
    cells.splice(cells.findIndex((item) => item === elem), 1);
  }


  function xoGameOver(result) {
    switch (result) {
      default:
      case false:
        break;

      case settings.playerSide:
        showFinalAlert("won");
        XOField.removeEventListener("click", xoClick);
        return true;

      case settings.botSide:
        showFinalAlert("lost");
        XOField.removeEventListener("click", xoClick);
        return true;

      case "Draw":
        showFinalAlert("Draw");
        XOField.removeEventListener("click", xoClick);
        return true;
    }
  }


  function isOver(settings) {
    let val_00 = document.getElementById("0_0").textContent,
      val_11 = document.getElementById("1_1").textContent,
      val_22 = document.getElementById("2_2").textContent;
  
    if (val_00 && val_00 == val_11 && val_00 == val_22) {
      return val_00 == settings.playerSide ? settings.playerSide : settings.botSide;
    }
  
    let val_02 = document.getElementById("0_2").textContent,
      val_20 = document.getElementById("2_0").textContent;
  
    if (val_02 && val_02 == val_11 && val_02 == val_20) {
      return val_02 == settings.playerSide ? settings.playerSide : settings.botSide;
    }
  
    for (let i = 0; i < 3; i++) {
      let val_i0 = document.getElementById(i + "_0").textContent,
        val_i1 = document.getElementById(i + "_1").textContent,
        val_i2 = document.getElementById(i + "_2").textContent;
  
      if (val_i0 && val_i0 == val_i1 && val_i0 == val_i2) {
        return val_i0 == settings.playerSide ? settings.playerSide : settings.botSide;
      }
  
      let val_0i = document.getElementById("0_" + i).textContent,
        val_1i = document.getElementById("1_" + i).textContent,
        val_2i = document.getElementById("2_" + i).textContent;
  
      if (val_0i && val_0i == val_1i && val_0i == val_2i) {
        return val_0i == settings.playerSide ? settings.playerSide : settings.botSide;
      }
    }

    if (cells.length == 0) return "Draw";

    return false;
  }


  function showFinalAlert(message) {
    let alert = document.createElement("div");
    alert.className = "xo-result " + message;
    alert.innerHTML = (message == "Draw" ? "" : "You ") + message + "!<br>" + "Wanna play again? "
      + "<a href='#' class='new-game-button' id='XONewGame'>Yes</a>"
    XOField.append(alert);
    XONewGame.addEventListener("click", () => XOForm.style.visibility = "visible");
  }
  

  function randomInt(max) {
    return Math.floor(Math.random() * max);
  }
}