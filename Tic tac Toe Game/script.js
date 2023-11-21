document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const restartBtn = document.getElementById('restartBtn');
    const resultScreen = document.getElementById('resultScreen');
    const resultMessage = document.getElementById('resultMessage');
    const newGameBtn = document.getElementById('newGameBtn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return gameBoard.includes('') ? null : 'T';
    };

    const handleClick = (index) => {
        if (!gameActive || gameBoard[index] !== '') return;

        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            if (winner === 'T') {
                showResult('It\'s a Tie!');
            } else {
                showResult(`${winner} wins!`);
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `${currentPlayer}'s turn`;
        }
    };

    const showResult = (message) => {
        resultMessage.textContent = message;
        resultScreen.style.display = 'flex';
    };

    const restartGame = () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        status.textContent = `${currentPlayer}'s turn`;

        cells.forEach((cell) => {
            cell.textContent = '';
        });
    };

    const startNewGame = () => {
        resultScreen.style.display = 'none';
        restartGame();
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleClick(index));
    });

    restartBtn.addEventListener('click', restartGame);
    newGameBtn.addEventListener('click', startNewGame);
});
