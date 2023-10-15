const gridContainer = document.querySelector(".grid-container");

let createGrid = (rows, cols) => {
  for (i = 0; i < rows * cols; i++) {
    const gridCell = document.createElement("div");
    gridCell.classList.add("grid-cell");
    gridContainer.appendChild(gridCell);
  }
};

createGrid(16, 16);
