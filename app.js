const gameContainer = document.querySelector('#game-container')
const gameHeader = document.querySelector('#game-header')
// game display contents 
const scoreDisplay = document.querySelector('#score')
const timeLeft = document.querySelector('#time-left')
const gameBody = document.querySelector('#gamebody')
const mole = document.querySelector('.mole')
const buttonContainer = document.querySelector('#button-container')



//get squares 
const squares = document.querySelectorAll('.square')
// game start button 
const gameButton = document.querySelector('button')
gameButton.classList.add('start-button')


// game load things 
let timerId = null
let userPoint = 0
let randomHittingSquare 
let fixedTime = 10
let gameTime = fixedTime
let autoTimeLeft = null


gameButton.addEventListener('click', () => {
   if (userPoint > 0) {
      userPoint = 0
   }
   gameStarting()
}) 

// this function is select a random square and add the mole class
function selectingSquareForMole() {
   squares.forEach(square => {
      square.classList.remove('mole')
   })

   let randomSquare = squares[Math.floor(Math.random() * squares.length)]
   randomSquare.classList.add('mole')
   randomHittingSquare = randomSquare.id
   console.log(randomSquare) // each time randomSquare provide a random mole
 
}

// when click the random mole square the user increased their points

squares.forEach(square=> {
   square.addEventListener('mousedown', () => {
      if (square.id == randomHittingSquare) {
         userPoint++
         scoreDisplay.textContent = userPoint
         console.log('this is passed')
      }
   })
})

function timeLeftGameEnds() {
   
   gameTime--
   timeLeft.textContent = gameTime
   if (gameTime == 0) {
      clearInterval(timerId)
      clearInterval(autoTimeLeft)

      scoreDisplay.textContent = ''
      buttonContainer.appendChild(gameButton)
      gameButton.classList.remove('start-button')
      gameButton.textContent = 'Restart'
      gameButton.classList.add('restart-button')
      gameTime = fixedTime
   }
   
}

// this method is invoke each time other methods
function gameStarting() {
   buttonContainer.removeChild(gameButton) // when the game is started start button will removed
   timerId = setInterval(selectingSquareForMole, 800)
   autoTimeLeft = setInterval(timeLeftGameEnds, 1000)
}
