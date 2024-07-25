document.addEventListener('DOMContentLoaded', () => {
    const gridSize = 4;
    let board = Array(gridSize).fill(null).map(() => Array(gridSize).fill(0));
    let score = 0;
    const gridContainer = document.querySelector('.grid-container');
    const scoreElement = document.querySelector('.score');

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
            const value = board[row][col];
            cell.textContent = value !== 0 ? value : '';
            cell.style.backgroundColor = getCellColor(value);
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

    function mergeTiles(row, col, direction) {
        let changed = false;
        const getNext = (r, c) => {
            switch (direction) {
                case 'up': return [r - 1, c];
                case 'down': return [r + 1, c];
                case 'left': return [r, c - 1];
                case 'right': return [r, c + 1];
            }
        };

        let [nextRow, nextCol] = getNext(row, col);
        while (nextRow >= 0 && nextRow < gridSize && nextCol >= 0 && nextCol < gridSize) {
            if (board[nextRow][nextCol] === 0) {
                [board[nextRow][nextCol], board[row][col]] = [board[row][col], board[nextRow][nextCol]];
                changed = true;
            } else if (board[nextRow][nextCol] === board[row][col]) {
                board[nextRow][nextCol] *= 2;
                score += board[nextRow][nextCol];
                board[row][col] = 0;
                changed = true;
            } else break;

            [row, col] = [nextRow, nextCol];
            [nextRow, nextCol] = getNext(nextRow, nextCol);
        }
        return changed;
    }

    function move(direction) {
        let moved = false;
        if (direction === 'up' || direction === 'down') {
            for (let col = 0; col < gridSize; col++) {
                for (let row = (direction === 'up' ? 1 : gridSize - 2); row >= 0 && row < gridSize; row += (direction === 'up' ? 1 : -1)) {
                    if (mergeTiles(row, col, direction)) moved = true;
                }
            }
        } else {
            for (let row = 0; row < gridSize; row++) {
                for (let col = (direction === 'left' ? 1 : gridSize - 2); col >= 0 && col < gridSize; col += (direction === 'left' ? 1 : -1)) {
                    if (mergeTiles(row, col, direction)) moved = true;
                }
            }
        }
        if (moved) addRandomTile();
        updateBoard();
        updateScore();
    }

    function updateScore() {
        scoreElement.textContent = score;
    }

    function handleKeyPress(event) {
        switch (event.key) {
            case 'ArrowUp': move('up'); break;
            case 'ArrowDown': move('down'); break;
            case 'ArrowLeft': move('left'); break;
            case 'ArrowRight': move('right'); break;
        }
    }

    function handleTouchStart(event) {
        const touchStartX = event.touches[0].clientX;
        const touchStartY = event.touches[0].clientY;

        function handleTouchMove(event) {
            const touchEndX = event.touches[0].clientX;
            const touchEndY = event.touches[0].clientY;

            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;

            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 0) move('right');
                else move('left');
            } else {
                if (diffY > 0) move('down');
                else move('up');
            }

            document.removeEventListener('touchmove', handleTouchMove);
        }

        document.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    function initGame() {
        board = Array(gridSize).fill(null).map(() => Array(gridSize).fill(0));
        score = 0;
        createGrid();
        addRandomTile();
        addRandomTile();
        updateBoard();
        updateScore();
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('touchstart', handleTouchStart, { passive: true });
    }

    document.querySelector('.restart-btn').addEventListener('click', initGame);

    initGame();
});
