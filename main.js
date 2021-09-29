var gameBoard = document.querySelector('.game-grid');
var player1Score = document.querySelector('#player1Score');
var player2Score = document.querySelector('#player2Score');
var gameStatus = document.querySelector('#gameStatus');
var box = document.querySelectorAll('.box')
var resetBtn = document.querySelector('#resetBtn');

var game = new Game();

window.addEventListener('load', displayPlayerWins)
gameBoard.addEventListener('click', gameBoardHandler);
resetBtn.addEventListener('click',reset);

function displayPlayerWins() {
  displayGameStatus(game.currentTurn)
  player1Score.innerText = `${game.getWins(1)} wins`;
  player2Score.innerText = `${game.getWins(2)} wins`;
}

function gameBoardHandler(e) {
  if (!game.gameWon && !game.tie) {
    game.gameFlow(event.target.id);
    updateBoardDisplay();
  }
  wipeBoard();
  displayPlayerWins();
  displayGameStatus(game.currentTurn);

}

function updateBoardDisplay() {
  for (var i = 0; i < box.length; i++) {
    box[i].innerHTML = `<span>${game.boxes[i]}</span>`;
  }
}

function displayGameStatus(playerNum) {
  if(game.tie && !game.gameWon){
    gameStatus.innerText = `TIE GAME 😱`;
  }
  if(playerNum === 1 && !game.gameWon && !game.tie){
    gameStatus.innerHTML = `It's <span>${game.player1.emoji}</span> 's turn`;
  }else if (playerNum === 2 && !game.gameWon && !game.tie){
    gameStatus.innerHTML = `It's <span>${game.player2.emoji}</span>'s turn`
  }
  if(playerNum === 2 && game.gameWon ){
    gameStatus.innerHTML = `<span>${game.player1.emoji}</span> WINS!!!`;
  }else if(playerNum === 1 && game.gameWon){
    gameStatus.innerHTML = `<span>${game.player2.emoji}</span> WINS!!!`
  }


}

function wipeBoard() {
  if (game.tie || game.gameWon) {
    window.setTimeout(newGame, 2000);
  }
}

function newGame() {
  game.resetGame();
  updateBoardDisplay();
  displayPlayerWins();
  displayGameStatus(game.currentTurn);

}

function reset(){
  localStorage.clear();
  newGame();
}
