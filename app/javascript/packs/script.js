const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'

// html elements from index page
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById("winningMessage")
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById("restartButton")

//keep track on who's turn it is
let circleTurn

// array of arrays of winning combinations 
const WINNING_COMBINATIONS = [
    //horizontal
    [0,1,2],
    [3,4,5],
    [6,7,8],
    //vertical
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //diagonal
    [0,4,8],
    [2,4,6]
]

startGame()

// add event listener to restart button so when clicked, start game is rerun
restartButton.addEventListener('click', startGame)

function startGame(){
    circleTurn = false
    // loop through each cell, add event listener, every time cell is clicked, 
    // add this listener (handleClick), once:true --> once clicked once, wont fire again
    cellElements.forEach(cell => {
        //remove x and circle from cell class to reset
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        //remove eventlistener if there is one (case: restartButton is clicked )
        cell.removeEventListener('click', handleClick)

        // add or re-add eventlistener to cells
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()

    winningMessageElement.classList.remove('show')

}

function handleClick(e){
    const cell = e.target //whichever cell we clicked on

    //is it circles turn? if so return CIRCLE_CLASS, otherwise, return X_CLASS
    const  currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

    // placeMark
    placeMark(cell, currentClass)

    //check for win
    if(checkWin(currentClass)){
        endGame(false)
    } else if(isDraw()){
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }

}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = "Draw!"
    }else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

// check to see if every cell element is filled, hence, draw
function isDraw(){
    return [...cellElements].every(cell => { //destructure cell elements to get every method
        return cell.classList.contains(X_CLASS)|| cell.classList.contains(CIRCLE_CLASS)
    })
}

// take in cell that was clicked, and currentClass(whos turn)
// take cell's class list and add either "x" or "circle", to update the CSS
function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

// switch from x to circle, or circle to x
function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    // if circles turn, add CIRCLE_CLASS, else, add X_CLASS
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}