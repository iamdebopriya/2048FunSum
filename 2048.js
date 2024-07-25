document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');
    const gridSize = 4;
    let board = Array(gridSize).fill(null).map(() => Array(gridSize).fill(0));

    function createGrid() {
        gridContainer.innerHTML = '';
        for (let i = 0; i < gridSize; i++) {
            const row = document.createElement('div');
            row.classList.add('grid-row');
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-cell');
                row.appendChild(cell);
            }
            gridContainer.appendChild(row);
        }
    }

    function updateBoard() {
        const cells = document.querySelectorAll('.grid-cell');
        cells.forEach((cell, index) => {
            const row = Math.floor(index / gridSize);
            const col = index % gridSize;
            cell.textContent = board[row][col] !== 0 ? board[row][col] : '';
            cell.style.backgroundColor = getCellColor(board[row][col]);
        });
    }

    function getCellColor(value) {
        switch (value) {
            case 2: return '#eee4da';
            case 4: return '#ede0c8';
            case 8: return '#f2b179';
            case 16: return '#f59563';
            case 32: return '#f67c5f';
            case 64: return '#f65e3b';
            case 128: return '#edcf72';
            case 256: return '#edcc61';
            case 512: return '#edc850';
            case 1024: return '#edc53f';
            case 2048: return '#edc22e';
            default: return '#cdc1b4';
        }
    }

    function addRandomTile() {
        const emptyCells = [];
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                if (board[row][col] === 0) emptyCells.push([row, col]);
            }
        }
        if (emptyCells.length) {
            const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[row][col] = Math.random() < 0.9 ? 2 : 4;
            updateBoard();
        }
    }

    function initGame() {
        board = Array(gridSize).fill(null).map(() => Array(gridSize).fill(0));
        createGrid();
        addRandomTile();
        addRandomTile();
    }

    document.querySelector('.restart-btn').addEventListener('click', initGame);

    initGame();
});
