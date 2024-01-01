// game containers
const gameContainer = document.querySelector('#game-container')
const gameBody = document.querySelector('#game-body')
const buttonContainer = document.querySelector('#button-container')

// game display 
let maxTime = 10
let gameMaxTime = maxTime
let gameScore = 0
let timeLeft = document.querySelector('#time-left')
let scoreDisplay = document.querySelector('#score')

// boxes button
const gameBoxes = gameBody.querySelectorAll('.square')
const startButton = document.querySelector('#start-btn')

// moving
let timerId = null
let autoTimer = null
let pointAuto = null

// get random square and move the image
function randomSquareSelection() {
   // when the game start remove mole class from default square
   gameBoxes.forEach(gameBox => {
      gameBox.classList.remove('mole')
   })
   let randomSquare = gameBoxes[Math.floor(Math.random() * gameBoxes.length)]
   console.log('test passed \n', randomSquare)
   randomSquare.classList.add('mole')
}

// adding points
gameBoxes.forEach(gameBox => {
   gameBox.addEventListener('mousedown', event => {
      if (gameBox.classList.contains('mole')) {
         gameScore++
         scoreDisplay.textContent = gameScore
         console.log('point increased')
      }
   })
})

function resetGame() {
   gameScore = 0
   scoreDisplay.textContent = gameScore
   gameMaxTime = maxTime
   timeLeft.textContent = 'over'
   
   

}


function autoTimerLeft() {
   gameMaxTime--
   timeLeft.textContent = gameMaxTime
   if (gameMaxTime == 0) {
      clearInterval(timerId)
      clearInterval(autoTimer)
      gameBoxes.forEach(gameBox => {
         gameBox.classList.remove('mole')
      })

      resetGame()
      console.log('game ends')
   }
}

function gamesMoveAuto() {
   timerId = setInterval(randomSquareSelection, 1000)
   autoTimer = setInterval(autoTimerLeft, 1000)
}



startButton.addEventListener('mousedown', event => {
   if (gameScore > 0) {
      gameScore = 0
      scoreDisplay.textContent = 'Oppz..!'
   }
   gamesMoveAuto()
})

