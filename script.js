let dimension = 50; //Must take it from input later
const cell = document.createElement("div");
cell.classList.add("square-cell");
cell.style.width = `calc(100%*(1/${dimension}) - 1px)`;

const gridContainer = document.querySelector(".grid-container");
for (let i = 0; i < dimension * dimension; i++) {
    gridContainer.appendChild(cell.cloneNode(false));
}

gridContainer.addEventListener("mouseover", (event) => {
    if (![...event.target.classList].includes("grid-container")) {
        event.target.style.backgroundColor = "black";
    }
})


const colors = ["black", "blue", "red", "green", "gold"];
const colorItems = [...document.querySelectorAll(".color-item")];
for (let i = 0; i < 5; i++) { //TODO: remove the hardcoded value 5.
    colorItems[i].style.backgroundColor = colors[i];
}
