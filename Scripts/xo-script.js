"use strict"

let xoField = document.querySelector("div.xo-field");
let strX = "X";
let strO = "O";

let cells = Array.from(document.querySelectorAll('.xo-cell'));

xoField.addEventListener("click", function (event) {
  
  let target = event.target;
  
  if (target.className != "xo-cell" || target.textContent || isOver()) return;

  placeXO(target, strX);

  if(isOver()) return;

  placeXO(cells[randomInt(cells.length)], strO);
});

xoField.addEventListener("dblclick", function(event) {
  event.preventDefault();
});

xoField.addEventListener("contextmenu", function(event) {
  event.preventDefault();
});

function placeXO(elem, str) {
  if(cells.length == 0) return;
  
  elem.textContent = str;
  cells.splice(cells.findIndex((item) => item === elem), 1);
}

function isOver() {
  if ((document.getElementById("0_0").textContent &&
      document.getElementById("0_0").textContent == document.getElementById("1_1").textContent &&
      document.getElementById("0_0").textContent == document.getElementById("2_2").textContent) || 
      (document.getElementById("0_2").textContent &&
      document.getElementById("0_2").textContent == document.getElementById("1_1").textContent &&
      document.getElementById("0_2").textContent == document.getElementById("2_0").textContent)) 
    return true;
  
  for(let i=0; i<3; i++) {
    if ((document.getElementById(i + "_0").textContent && 
        document.getElementById(i + "_0").textContent == document.getElementById(i + "_1").textContent &&
        document.getElementById(i + "_0").textContent == document.getElementById(i + "_2").textContent) ||
        (document.getElementById("0_" + i).textContent &&
        document.getElementById("0_" + i).textContent == document.getElementById("1_" + i).textContent &&
        document.getElementById("0_" + i).textContent == document.getElementById("2_" + i).textContent)) 
      return true;
  }
  
  return false;
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}