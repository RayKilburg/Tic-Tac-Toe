const XClass = 'x'
const CircleClass = 'circle'
const WinningCombos = [ 
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [0, 4, 8], 
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

// Event listeners
restartButton.addEventListener('click', startGame)

function startGame() {
cellElements.forEach(cell => {
    cell.classList.remove(XClass)
    cell.classList.remove(CircleClass)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
})
setBoardHoverClass();
winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CircleClass : XClass;
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}


function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`
    }
    winningMessageElement.classList.add('show')
}

// Check for draw
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(XClass) || cell.classList.contains(CircleClass)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

// Swap players
function swapTurns() {
    circleTurn = !circleTurn
}

// Set hover effect
function setBoardHoverClass() {
    board.classList.remove(XClass)
    board.classList.remove(CircleClass)
    if (circleTurn) {
        board.classList.add(CircleClass)
    } else {
        board.classList.add(XClass)
    }
}

function checkWin(currentClass) {
    return WinningCombos.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}