const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

let setCurrentColor = (newColor) => {
  currentColor = newColor;
};

let setCurrentMode = (newMode) => {
  activateButton(newMode);
  currentMode = newMode;
};

let setCurrentSize = (newSize) => {
  currentSize = newSize;
};

const colorPicker = document.getElementById("colorPicker");
const colorBtn = document.getElementById("colorBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");
const sizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("sizeSlider");
const gridContainer = document.getElementById("grid-container");

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode("color");
eraserBtn.onclick = () => setCurrentMode("eraser");
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

let changeSize = (value) => {
  setCurrentSize(value);
  updateSizeValue(value);
  reloadGrid();
};

let updateSizeValue = (value) => {
  sizeValue.innerHTML = `${value} * ${value}`;
};

let reloadGrid = () => {
  clearGrid();
  createGrid(currentSize);
};

let clearGrid = () => {
  gridContainer.innerHTML = "";
};

let createGrid = (size) => {
  for (i = 0; i < size * size; i++) {
    const gridCell = document.createElement("div");
    gridCell.classList.add("grid-cell");
    gridCell.style.width = `calc(100% / ${size})`;
    gridCell.style.height = `calc(100% / ${size})`;
    gridCell.addEventListener("mouseover", changeColor);
    gridCell.addEventListener("mousedown", changeColor);
    gridContainer.appendChild(gridCell);
  }
};

let changeColor = (e) => {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#fefefe";
  }
};

let activateButton = (newMode) => {
  if (currentMode === "color") {
    colorBtn.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraserBtn.classList.remove("active");
  }

  if (newMode === "color") {
    colorBtn.classList.add("active");
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("active");
  }
};

window.onload = () => {
  createGrid(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
};
