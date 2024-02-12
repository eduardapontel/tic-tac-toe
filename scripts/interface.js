document.addEventListener('DOMContentLoaded', () => {
    let squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.addEventListener('click', handleClick);
    });
});

function handleClick(event) {
    let square = event.target;
    let position = square.id;
    if (handleMove(position)) {
        setTimeout(() => {
            let result = document.querySelector('#result');
            let winner = document.querySelector('#winner');
            result.style.display = 'flex';

            if (playerTime == 0){
                var victoryMessage = 'Cat is the winner'
            } else if (playerTime == 1){
                victoryMessage = 'Dog is the winner'
            } else {
                victoryMessage = 'It is a draw'
            }

            winner.innerHTML = `<h3>Game Over!</h3><h3> - ${
                victoryMessage
            } -</h3>`;
        }, 10);
    }
    updateSquare(square, position);
}

function updateSquare(square, position) {
    let symbol = board[position];
    square.innerHTML = `<div class='${symbol}'>`;
}

function restart() {
    reset();

    let remove = [...document.querySelectorAll('.o'), ...document.querySelectorAll('.x')];
    remove.forEach((element) => {
        element.remove();
    });
}

let restartButton = document.querySelector('#restart');

restartButton.addEventListener('click', restart);
