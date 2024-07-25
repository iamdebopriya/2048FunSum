document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelectorAll('.grid-cell');
    let board = Array(4).fill(null).map(() => Array(4).fill(0));
    
    function initGame() {
        board = Array(4).fill(null).map(() => Array(4).fill(0));
        addRandomTile();
        addRandomTile();
        updateBoard();
    }

    function addRandomTile() {
        let emptyCells = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (board[r][c] === 0) emptyCells.push([r, c]);
            }
        }
        if (emptyCells.length) {
            const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[r][c] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    function updateBoard() {
        grid.forEach((cell, i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            cell.textContent = board[row][col] ? board[row][col] : '';
        });
    }

    function handleKeyPress(e) {
        switch (e.key) {
            case 'ArrowUp': move('up'); break;
            case 'ArrowDown': move('down'); break;
            case 'ArrowLeft': move('left'); break;
            case 'ArrowRight': move('right'); break;
        }
        addRandomTile();
        updateBoard();
    }

    function move(direction) {
        // Implement the move logic here
        console.log(`Move ${direction}`);
    }

    document.querySelector('.restart-btn').addEventListener('click', initGame);
    document.addEventListener('keydown', handleKeyPress);

    initGame();
});

