// Element selections
const petInputs = document.querySelectorAll('input[name="pet-input"]');
const restartButton = document.querySelector('#restart');
const yesButton = document.getElementById('yes');
const noButton = document.getElementById('no');
const startButton = document.getElementById('start');

// Initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeGame);

function initializeGame() {
    addSquareClickListeners();
    restartButton.addEventListener('click', restartGame);
    yesButton.addEventListener('click', showPetSelection);
    noButton.addEventListener('click', startGame);
    startButton.addEventListener('click', startGame);
    petInputs.forEach(input => input.addEventListener('change', enableStartButton));
}

function addSquareClickListeners() {
    document.querySelectorAll('.square').forEach(square => {
        square.addEventListener('click', handleSquareClick);
    });
}

// Handle square click event
function handleSquareClick(event) {
    const square = event.target;
    const position = square.id;

    if (board[position] !== '') return; // Ignore click if square is already occupied

    disableSquares();

    const gameOver = handleMove(position);
    updateSquare(square, position);

    if (gameOver) {
        displayGameOverMessage(position);
    } else {
        enableSquares();
        if (isBotTurn()) {
            botMove();
        }
    }
}

function updateSquare(square, position) {
    const symbol = board[position];
    square.innerHTML = `<div class='${symbol}'></div>`;
}

function displayGameOverMessage(lastMovePosition) {
    const result = document.querySelector('#result');
    const winner = document.querySelector('#winner');
    const victoryMessage = getVictoryMessage();

    // Display the result message
    setTimeout(() => {
        result.style.display = 'flex';
        winner.innerHTML = `<h3>Game Over!</h3><h3> - ${victoryMessage} -</h3>`;
    }, 100);
}

function getVictoryMessage() {
    if (playerTime === 0) {
        return 'Cat is the winner';
    } else if (playerTime === 1) {
        return 'Dog is the winner';
    } else {
        return 'It is a draw';
    }
}

// Bot control
function isBotTurn() {
    return (petInputs[0].checked && playerTime === 1) || (petInputs[1].checked && playerTime === 0);
}

function botMove() {
    setTimeout(() => {
        const availableMoves = [4, 6, 5, 2, 3, 8, 0, 1, 7];
        for (let move of availableMoves) {
            if (!board[move]) {
                document.getElementById(move).click();
                break;
            }
        }
        enableSquares();
    }, 500);
}

// Enable and disable squares
function disableSquares() {
    document.querySelectorAll('.square').forEach(square => {
        square.style.pointerEvents = 'none';
    });
}

function enableSquares() {
    document.querySelectorAll('.square').forEach(square => {
        square.style.pointerEvents = 'auto';
    });
}

// Restart game
function restartGame() {
    window.location.reload();
}

// Pet selection and game start control
function showPetSelection() {
    toggleVisibility('.bot-select', 'none');
    toggleVisibility('.pet-select', 'flex');
}

function startGame() {
    document.getElementById('select').style.display = 'none';
    if (isBotTurn()) {
        botMove();
    }
}

function enableStartButton() {
    startButton.disabled = false;
}

function toggleVisibility(selector, displayStyle) {
    document.querySelectorAll(selector).forEach(element => {
        element.style.display = displayStyle;
    });
}
