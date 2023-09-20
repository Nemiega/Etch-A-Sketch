const container = document.querySelector('.container');
const clearButton = document.getElementById('clearButton');
const newGridButton = document.getElementById('newGridButton'); // Add new button
const drawingState = { isDrawing: false };

// Function to create the grid with a specified number of squares per side
function createGrid(rows, cols) {
    // Remove existing grid
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Calculate the square size
    const squareSize = 400 / rows;

    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    for (let i = 0; i < rows * cols; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        container.appendChild(gridSquare);
    }
}

function clearGrid() {
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach((square) => {
        square.style.backgroundColor = 'white';
    });
}

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

function darkenColor(color) {
    const [r, g, b] = color
        .substring(4, color.length - 1)
        .split(',')
        .map((c) => parseInt(c));

    const dr = Math.floor(r * 0.1);
    const dg = Math.floor(g * 0.1);
    const db = Math.floor(b * 0.1);

    return `rgb(${Math.max(0, r - dr)},${Math.max(0, g - dg)},${Math.max(0, b - db)})`;
}

function changeColorOnHover(event) {
  if (event.target.classList.contains('grid-square')) {
      let currentColor = window.getComputedStyle(event.target).backgroundColor;
      if (currentColor === 'rgba(0, 0, 0, 0)' || currentColor === 'rgb(255, 255, 255)') {
          // If the square is white or transparent, set a random color
          event.target.style.backgroundColor = randomColor();
      } else {
          // Darken the current color
          event.target.style.backgroundColor = darkenColor(currentColor);
      }
  }
}

container.addEventListener('mouseover', changeColorOnHover);

container.addEventListener('mousedown', () => {
    drawingState.isDrawing = true;
});

container.addEventListener('mouseup', () => {
    drawingState.isDrawing = false;
});

function promptAndGenerateNewGrid() {
    const squaresPerSide = prompt('Enter the number of squares per side (max 100):');
    const validSquares = parseInt(squaresPerSide);

    if (!isNaN(validSquares) && validSquares > 0 && validSquares <= 100) {
        createGrid(validSquares, validSquares);
    } else {
        alert('Please enter a valid number between 1 and 100.');
    }
}

clearButton.addEventListener('click', clearGrid);
newGridButton.addEventListener('click', promptAndGenerateNewGrid);

createGrid(16, 16);

