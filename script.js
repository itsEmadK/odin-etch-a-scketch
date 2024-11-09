let dimension = 10; //Must take it from input later
const cell = document.createElement("div");
cell.classList.add("square-cell");
cell.style.width = `calc(100%*(1/${dimension}) - 2px)`;

