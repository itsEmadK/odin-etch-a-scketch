let dimension = 50; //Must take it from input later
const cell = document.createElement("div");
cell.classList.add("square-cell");
cell.style.width = `calc(100%*(1/${dimension}) - 2px)`;

const gridContainer = document.querySelector(".grid-container");
for (let i = 0; i < dimension * dimension; i++) {
    gridContainer.appendChild(cell.cloneNode(false));
}

gridContainer.addEventListener("mouseover", (event) => {
    event.target.style.backgroundColor = "black";
})
