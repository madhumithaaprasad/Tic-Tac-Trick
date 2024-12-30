const grid = document.getElementById('grid');
const winnerDisplay = document.getElementById('winner');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function createGrid() {
    grid.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.index = index;
        cellElement.textContent = cell;
        cellElement.addEventListener('click', handleCellClick);
        grid.appendChild(cellElement);
    });
}

function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (board[index] !== '' || winnerDisplay.textContent !== '') return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add('taken');

    if (checkWin()) {
        winnerDisplay.textContent = `${currentPlayer} Wins!`;
        return;
    }

    if (board.every(cell => cell !== '')) {
        winnerDisplay.textContent = 'It\'s a Tie!';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    winnerDisplay.textContent = '';
    createGrid();
}

resetButton.addEventListener('click', resetGame);

createGrid();
