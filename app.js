// game containers
const gameContainer = document.querySelector('#game-container')
const gameBody = document.querySelector('#game-body')
const buttonContainer = document.querySelector('#button-container')

// game display 
let maxTime = 10
let gameMaxTime = maxTime
let gameScore = 0
let displayCurrentScore
const userScores = []
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

// change the older point to previous point and showing on display
function scoreChanger(newBox, pointText) {
   userScores.push(displayCurrentScore)
   if (userScores.length >= 2) {
      let previousScore = userScores.shift()
      pointText.textContent = `your current score : ${displayCurrentScore}`
      let previousScoreDisplay = document.createElement('p')
      previousScoreDisplay.textContent = `your previous game score : ${previousScore}`
      previousScoreDisplay.classList.add('game-point')
      newBox.insertBefore(previousScoreDisplay, pointText)
   }

}

// making new game dialogue box
function makingResetGame() {
   let newGameMessage = document.createElement('div')
   newGameMessage.setAttribute('id', 'reset-game-box')
   gameBody.replaceWith(newGameMessage)

   // game ends text
   let newGameText = document.createElement('p')
   newGameText.classList.add('new-game-text')
   newGameText.textContent = 'Game ends'

   //new game button
   let resetButton = document.createElement('button')
   resetButton.textContent = 'new Game'
   resetButton.classList.add('reset-btn')

   // player scored points
   let pointText = document.createElement('p')
   pointText.textContent = `You are scored : ${displayCurrentScore}`

   //player score, game end message, and new game button 
   // added on newGameMessage dialogue box
   newGameMessage.append(pointText, newGameText, resetButton)

   scoreChanger(newGameMessage, pointText)

   resetButton.addEventListener('mousedown', event => {
      newGameMessage.replaceWith(gameBody)
      buttonContainer.append(startButton)
      scoreDisplay.textContent = ''
      timeLeft.textContent = ''
   })
}

function resetGame() {
   displayCurrentScore = gameScore
   gameScore = 0
   scoreDisplay.textContent = gameScore
   gameMaxTime = maxTime
   timeLeft.textContent = 0
   
   // when the game ends show a confirmation to new game
   makingResetGame()
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
   }
   gamesMoveAuto()
   buttonContainer.removeChild(startButton)
})

