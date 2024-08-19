let board = Array(9).fill('');
let playerTime = 0;
const symbols = ['x', 'o'];
let gameOver = false;

const winStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleMove(position) {
    if (gameOver || board[position] !== '') return false;

    board[position] = symbols[playerTime];

    gameOver = checkWinner() || checkTie();

    if (checkTie()) {
        playerTime = -1;
    }

    if (!gameOver) {
        playerTime = 1 - playerTime;
    }

    return gameOver;
}

function checkWinner() {
    for (const seq of winStates) {
        const [pos1, pos2, pos3] = seq;
        if (board[pos1] === board[pos2] && board[pos2] === board[pos3] && board[pos1] !== '') {
            return true;
        }
    }
    return false;
}

function checkTie() {
    return !checkWinner() && board.every((pos) => pos !== '');
}

function getBestMove() {
    for (const [a, b, c] of winStates) {
        if (board[a] === symbols[1 - playerTime] && board[a] === board[b] && !board[c]) return c;
        if (board[a] === symbols[1 - playerTime] && board[a] === board[c] && !board[b]) return b;
        if (board[b] === symbols[1 - playerTime] && board[b] === board[c] && !board[a]) return a;
    }

    for (const [a, b, c] of winStates) {
        if (board[a] === symbols[playerTime] && board[a] === board[b] && !board[c]) return c;
        if (board[a] === symbols[playerTime] && board[a] === board[c] && !board[b]) return b;
        if (board[b] === symbols[playerTime] && board[b] === board[c] && !board[a]) return a;
    }

    const positions = [4, 0, 2, 6, 8, 1, 3, 5, 7];
    return positions.find((position) => !board[position]);
}
