"use strict"

let xoForm = document.querySelector(".xo-form");
let xoSettings = {
  height: 3,
  width: 3,
  huPlayer: "X",
  aiPlayer: "O",
  difficulty: "easy"
};



startGame.addEventListener("click", function () {
  for (let player of xoForm.players) {
    if (player.checked) {
      xoSettings.huPlayer = player.id;
    } else xoSettings.aiPlayer = player.id;
  }
  for (let diff of xoForm.difficulty) {
    if (diff.checked) {
      xoSettings.difficulty = diff.id;
      break;
    }
  }
  xoForm.style.visibility = "hidden";
  xoGameInit(xoSettings);
});



function xoGameInit(settings) {
  let currentField = document.querySelector(".xo-field");
  if (currentField) currentField.remove();

  let xoArr = createXOArr();
  let xoField = createXOField();
  xoField.addEventListener("click", xoClick);
  xoField.addEventListener("contextmenu", event => event.preventDefault());
  let getIdAi = (function () {
    switch (settings.difficulty) {
      default:
      case "easy":
        return getRandomId;

      case "hard":
        return minimax;
    }
  })();
  if (settings.aiPlayer == "X") {
    let firstMove = getIdAi(xoArr, settings.aiPlayer).index;
    let elem = document.getElementById(firstMove);
    elem.textContent = settings.aiPlayer;
    if (settings.difficulty == "hard") elem.style.color = "red";
    xoArr[firstMove] = settings.aiPlayer;
  }

  function createXOField() {
    let field = document.createElement("div");
    field.className = "xo-field";
    document.querySelector(".xo-game").append(field);
    for (let i = 0; i < settings.width * settings.height; i++) {
      let newElem = document.createElement("div");
      newElem.className = "xo-cell";
      newElem.id = i;
      field.append(newElem);
      if (i % settings.width == settings.height - 1) {
        field.append(document.createElement("br"));
      }
    }
    return field;
  }

  function createXOArr() {
    let arr = new Array;
    for (let i = 0; i < settings.width * settings.height; i++) {
      arr.push(i);
    }
    return arr;
  }

  function xoClick(event) {
    let target = event.target;
    if (target.className != "xo-cell" || target.textContent != "") return;

    target.textContent = settings.huPlayer;
    xoArr[target.id] = settings.huPlayer;

    if (xoWin_3x3(xoArr, settings.huPlayer)) {
      showFinalAlert("won");
      this.removeEventListener("click", xoClick);
      return;
    } else if (getEmptyIds(xoArr).length == 0) {
      showFinalAlert("Draw");
      this.removeEventListener("click", xoClick);
      return;
    }

    let id = getIdAi(xoArr, settings.aiPlayer).index;
    let elem = document.getElementById(id);
    elem.textContent = settings.aiPlayer;
    if (settings.difficulty == "hard") elem.style.color = "red";
    xoArr[id] = settings.aiPlayer;

    if (xoWin_3x3(xoArr, settings.aiPlayer)) {
      showFinalAlert("lost");
      this.removeEventListener("click", xoClick);
    } else if (getEmptyIds(xoArr).length == 0) {
      showFinalAlert("Draw");
      this.removeEventListener("click", xoClick);
    }
  }

  function xoWin_3x3(arr, player) {
    if ((arr[0] == player && arr[1] == player && arr[2] == player)
      || (arr[3] == player && arr[4] == player && arr[5] == player)
      || (arr[6] == player && arr[7] == player && arr[8] == player)
      || (arr[0] == player && arr[3] == player && arr[6] == player)
      || (arr[1] == player && arr[4] == player && arr[7] == player)
      || (arr[2] == player && arr[5] == player && arr[8] == player)
      || (arr[0] == player && arr[4] == player && arr[8] == player)
      || (arr[2] == player && arr[4] == player && arr[6] == player))
      return true;

    return false;
  }

  function getEmptyIds(arr) {
    return arr.filter(item => item != settings.huPlayer && item != settings.aiPlayer);
  }

  function minimax(arr, player) {
    let availIds = getEmptyIds(arr);

    if (xoWin_3x3(arr, settings.huPlayer)) {
      return { score: -10 };
    } else if (xoWin_3x3(arr, settings.aiPlayer)) {
      return { score: 10 };
    } else if (availIds.length === 0) {
      return { score: 0 };
    }

    let moves = new Array;
    for (let i = 0; i < availIds.length; i++) {
      let move = {};
      move.index = arr[availIds[i]];
      arr[availIds[i]] = player;

      if (player == settings.aiPlayer) {
        let result = minimax(arr, settings.huPlayer);
        move.score = result.score;
      } else {
        let result = minimax(arr, settings.aiPlayer);
        move.score = result.score;
      }

      arr[availIds[i]] = move.index;
      moves.push(move);
    }

    let bestMove;
    if (player === settings.aiPlayer) {
      let bestScore = -99999;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 99999;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }

  function getRandomId(arr) {
    let availIds = getEmptyIds(arr);
    return { index: availIds[Math.floor(Math.random() * (availIds.length))] };
  }

  function showFinalAlert(message) {
    let alert = document.createElement("div");
    alert.className = "xo-result " + message;
    alert.innerHTML = (message == "Draw" ? "" : "You ") + message + "!<br>" + "Wanna play again? "
      + "<a href='#' class='new-game-button' id='xoNewGame'>yes</a>"
    xoField.append(alert);
    xoNewGame.addEventListener("click", () => xoForm.style.visibility = "visible");
  }
}