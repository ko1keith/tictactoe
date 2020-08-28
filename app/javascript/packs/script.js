// select all board cells
const cellElements = document.querySelectorAll('[data-cell]')

// loop through each cell, add event listener, every time cell is clicked, add this listener (handleClick),
// once:true --> once clicked once, wont fire again
cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, {once: true})
})

function handleClick(e){
    console.log('clicked')
}

console.log("script js file loaded")