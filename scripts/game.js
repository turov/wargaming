const field = document.querySelector('.game_container')
const cells = field.querySelectorAll('.cell');
const gameResults = document.querySelector('.game__results');
const solutionSimulationTime = 200;
let gameState = ['', '', '', '', '', '', '', '', ''];
let isPlayerTurn = true;
let isGameContinues = true;

cells.forEach((cell, index) => cell.addEventListener('click', function (e) {
    const cell = e.target;
    if (!cell.classList.contains('active')) {
        if (isPlayerTurn) {
            if (cell.textContent === '') {
                cell.classList.add('active');
                cell.classList.add('active--x');
                cell.textContent = 'x';
                cell.setAttribute('disabled', 'true');
                gameState[index] = 'x';
            }
            checkResult();
        }
        if (isGameContinues) {
            setTimeout(function () {
                computerTurn();
            }, solutionSimulationTime);
        }
    }
}));

function computerTurn() {
    const emptyCells = [];
    cells.forEach(cell => {
        if (!cell.classList.contains('active')) {
            emptyCells.push(cell)
        }
        ;
    });
    if (emptyCells.length) {
        const randomEmptyCellIndex = getRandomInteger(emptyCells.length);
        emptyCells[randomEmptyCellIndex].classList.add('active');
        emptyCells[randomEmptyCellIndex].classList.add("active--0");
        emptyCells[randomEmptyCellIndex].textContent = "0";
        emptyCells[randomEmptyCellIndex].setAttribute('disabled', 'true');
        gameState[emptyCells[randomEmptyCellIndex].getAttribute('data-cell')] = '0';
    }
    checkResult();
}

function checkResult() {
    const result = checkGame();
    const emptyCells = field.querySelectorAll('.cell:not(.active)');
    if (!result.continiue) {
        isGameContinues = false;
        gameResults.textContent = result.winner + ' has won!';
        return;
    }
    if (emptyCells.length === 0) {
        gameResults.textContent = 'Game ended in a draw';
        return;
    }
    isPlayerTurn = !isPlayerTurn;
}

function getRandomInteger(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function checkGame() {
    switch (true) {
        case (checkField(gameState, 'x') === 'x'):
            field.classList.add('disable');
            return {continiue: false, winner: 'Player'};
        case (checkField(gameState, '0') === '0'):
            return {continiue: false, winner: 'Computer'};
        default:
            return {continiue: true};
    }
}

function checkField(map, player) {
    if (map[0] === player && map[1] === player && map[2] === player ||
        map[3] === player && map[4] === player && map[5] === player ||
        map[6] === player && map[7] === player && map[8] === player ||
        map[0] === player && map[3] === player && map[6] === player ||
        map[1] === player && map[4] === player && map[7] === player ||
        map[2] === player && map[5] === player && map[8] === player ||
        map[0] === player && map[4] === player && map[8] === player ||
        map[6] === player && map[4] === player && map[2] === player) {
        return player;
    }
}

function restartGame() {
    field.classList.remove('disable');
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('active', 'active--x', 'active--0');
        cell.removeAttribute('disabled');
    });
    gameResults.textContent = '';
    isPlayerTurn = true;
    isGameContinues = true;
}
