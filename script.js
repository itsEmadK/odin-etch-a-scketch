const TOGGLE_ERASER_BTN_ID = "toggle-eraser-btn";
const TOGGLE_RAINBOW_BTN_ID = "toggle-rainbow-btn";
const TOGGLE_SHADING_BTN_ID = "toggle-shading-btn";
const TOGGLE_LIGHTEN_BTN_ID = "toggle-lighten-btn";
const TOGGLE_GRID_LINES_BTN = "toggle-grid-lines-btn";
const CHANGE_GRID_SIZE_BTN_ID = "change-grid-size-btn";
const CLEAR_GRID_BTN_ID = "clear-grid-btn";

let initialDimension = 10; //Must take it from input later
let isEraser = false;
let isRainbow = false;
let isShading = false;
let isLightening = false;
let penColor = "black";

const grid = document.querySelector(".grid");
initGridCells(initialDimension);

grid.addEventListener("mouseover", (event) => {
    if (![...event.target.classList].includes("grid")) {
        if (isEraser) {
            event.target.style.backgroundColor = "white";
        } else if (isShading){
            const currentOpacity = +event.target.style.opacity;
            if (currentOpacity < 1){
                event.target.style.opacity = `${currentOpacity + 0.1}`;
            }
            event.target.style.backgroundColor = penColor;
        } else {
            event.target.style.backgroundColor = penColor;
        }
    }
})


const colors = ["black", "blue", "red", "green", "gold"];
const colorItems = [...document.querySelectorAll(".color-item")];
initColorItems();

colorItems.forEach((colorItem) => {
    colorItem.addEventListener("mouseenter", () => {
        colorItem.classList.add("hovered");
    });
    colorItem.addEventListener("mouseleave", () => {
        colorItem.classList.remove("hovered");
    });
    colorItem.addEventListener("click", () => {
        selectColorItem(colorItem.style.backgroundColor);
    })
})

const buttons = [...document.querySelectorAll(".btn")];
buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
        btn.classList.toggle("hovered");
    })
    btn.addEventListener("mouseleave", () => {
        btn.classList.toggle("hovered");
        //Remove the mousedown effect if the user leaves the element
        //whilst pressing the mouse button.
        btn.classList.remove("mousedown");
    })
    btn.addEventListener("mousedown", () => {
        btn.classList.add("mousedown");
    })
})

buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        event.target.classList.toggle("enabled");
        //Remove the mousedown effect after the mouse is released.
        event.target.classList.remove("mousedown");
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
                document.querySelectorAll(".square-cell").forEach((cell) => {
                    cell.classList.toggle("show-right-border-gray");
                    cell.classList.toggle("show-top-border-gray");
                });
                grid.classList.toggle("show-left-border-gray");
                grid.classList.toggle("show-bottom-border-gray");
                break;
            case CHANGE_GRID_SIZE_BTN_ID:
                //This button doesn't toggle anything, but rather requests an action.
                event.target.classList.toggle("enabled");
                const newDimension = prompt("Please enter the new grids dimension:");
                if (newDimension !== null) {
                    if (isNaN(+newDimension) || +newDimension <= 0) {
                        alert("Stop being a clown and enter a positive integer")
                    } else if (+newDimension > 100) {
                        alert("Dude, the limit is 100, what were you gonna do with all those cells anyway?")
                    } else {
                        changeGridSize(newDimension);
                    }
                }
                break;
            case CLEAR_GRID_BTN_ID:
                //This button doesn't toggle anything, but rather requests an action.
                event.target.classList.toggle("enabled");
                clearGrid();
                break;
            default:
                break;
        }
    })
})

function changeGridSize(newDimension) {
    const oldCellClassList = grid.firstChild.classList; //Save any old state if there is any (like grid lines).
    let newCell = document.createElement("div");
    grid.innerHTML = ""; //Remove all old cells.
    newCell.classList = oldCellClassList;
    newCell.style.width = `calc(100%*(1/${newDimension}))`;
    for (let i = 0; i < newDimension * newDimension; i++) {
        grid.appendChild(newCell.cloneNode(false));
    }
}

function selectColorItem(color) {
    colorItems.forEach((colorItem) => {
        if (colorItem.style.backgroundColor === color) {
            colorItem.classList.add("selected");
        } else {
            colorItem.classList.remove("selected");
        }
    })
    penColor = color;
}

function initColorItems() {
    for (let i = 0; i < 5; i++) { //TODO: remove the hardcoded value 5.
        colorItems[i].style.backgroundColor = colors[i];
    }
    selectColorItem("black");
}

function initGridCells(initialDimension) {
    const cell = document.createElement("div");
    cell.classList.add("square-cell");
    cell.style.width = `calc(100%*(1/${initialDimension}))`;

    for (let i = 0; i < initialDimension * initialDimension; i++) {
        grid.appendChild(cell.cloneNode(false));
    }
}

function clearGrid() {
    grid.childNodes.forEach((cell) => {
        cell.style.backgroundColor = "white";
        cell.style.opacity = "";
    })
}