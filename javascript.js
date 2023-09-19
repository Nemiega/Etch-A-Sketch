const container = document.querySelector('.container');
const clearButton = document.getElementById('clearButton');

// Function to create the grid
function createGrid(rows, cols) {
    for (let i = 0; i < rows * cols; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        container.appendChild(gridSquare);
    }
}

// Function to clear the grid
function clearGrid() {
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach((square) => {
        square.style.backgroundColor = 'white';
    });
}

// Function to change color on hover
function changeColorOnHover(event) {
    if (event.target.classList.contains('grid-square')) {
        event.target.style.backgroundColor = 'gray';
    }
}

// Add event listener to the clear button
clearButton.addEventListener('click', clearGrid);

// Add event listener for grid square hover effect
container.addEventListener('mouseover', changeColorOnHover);

// Initialize the grid with 16x16 dimensions
createGrid(16, 16);
