let dimension = 10; //Must take it from input later
let isEraser = false;
let isRainbow = false;
let isShading = false;
let isLightening = false;

const TOGGLE_ERASER_BTN_ID = "toggle-eraser-btn";
const TOGGLE_RAINBOW_BTN_ID = "toggle-rainbow-btn";
const TOGGLE_SHADING_BTN_ID = "toggle-shading-btn";
const TOGGLE_LIGHTEN_BTN_ID = "toggle-lighten-btn";
const TOGGLE_GRID_LINES_BTN = "toggle-grid-lines-btn";


const cell = document.createElement("div");
cell.classList.add("square-cell");
cell.style.width = `calc(100%*(1/${dimension}))`;

const grid = document.querySelector(".grid");
for (let i = 0; i < dimension * dimension; i++) {
    grid.appendChild(cell.cloneNode(false));
}

grid.addEventListener("mouseover", (event) => {
    if (![...event.target.classList].includes("grid")) {
        event.target.style.backgroundColor = "black";
    }
})


const colors = ["black", "blue", "red", "green", "gold"];
const colorItems = [...document.querySelectorAll(".color-item")];
for (let i = 0; i < 5; i++) { //TODO: remove the hardcoded value 5.
    colorItems[i].style.backgroundColor = colors[i];
}


const buttons = [...document.querySelectorAll(".btn")];
buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
        btn.classList.toggle("hovered");
    })
    btn.addEventListener("mouseleave", () => {
        btn.classList.toggle("hovered");
    })
})

buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        event.target.classList.toggle("enabled");
        switch (event.target.id) {
            case TOGGLE_ERASER_BTN_ID:
                isEraser = !isEraser;
                break;
            case TOGGLE_RAINBOW_BTN_ID:
                isRainbow = !isRainbow;
                break;
            case TOGGLE_SHADING_BTN_ID:
                isShading = !isShading;
                break;
            case TOGGLE_LIGHTEN_BTN_ID:
                isLightening = !isLightening;
                break;
            case TOGGLE_GRID_LINES_BTN:
                const cells = document.querySelectorAll(".square-cell");
                cells.forEach((cell) => {
                    cell.classList.toggle("show-right-border-gray");
                    cell.classList.toggle("show-top-border-gray");
                });
                grid.classList.toggle("show-left-border-gray");
                grid.classList.toggle("show-bottom-border-gray");
                break;
            default:
                break;
        }
    })
})