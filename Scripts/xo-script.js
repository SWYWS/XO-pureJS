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
  let id_0_0 = document.getElementById("0_0"),
      id_0_2 = document.getElementById("0_2"),
      id_1_1 = document.getElementById("1_1");

  if ((id_0_0.textContent &&
      id_0_0.textContent == id_1_1.textContent &&
      id_0_0.textContent == document.getElementById("2_2").textContent) || 
      (id_0_2.textContent &&
      id_0_2.textContent == id_1_1.textContent &&
      id_0_2.textContent == document.getElementById("2_0").textContent)) 
    return true;
  
  for(let i=0; i<3; i++) {
    let id_i_0 = document.getElementById(i + "_0"),
        id_0_i = document.getElementById("0_" + i);
        
    if ((id_i_0.textContent && 
        id_i_0.textContent == document.getElementById(i + "_1").textContent &&
        id_i_0.textContent == document.getElementById(i + "_2").textContent) ||
        (id_0_i.textContent &&
        id_0_i.textContent == document.getElementById("1_" + i).textContent &&
        id_0_i.textContent == document.getElementById("2_" + i).textContent)) 
      return true;
  }
  
  return false;
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}