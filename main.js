var gameBoard = document.querySelector('.game-grid');
var player1Score = document.querySelector('#player1Score');
var player2Score = document.querySelector('#player2Score');
var gameStatus = document.querySelector('#gameStatus');
var box = document.querySelectorAll('.box');

var game = new Game();

window.addEventListener('load', displayPlayerWins)
gameBoard.addEventListener('click', gameBoardHandler);

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
    box[i].innerText = game.boxes[i];
  }
}

function displayGameStatus(playerNum) {
  if((playerNum === 1 || playerNum === 2) && game.tie && !game.gameWon){
    gameStatus.innerText = `TIE GAME 😱`;
  }
  if(playerNum === 1 && !game.gameWon && !game.tie){
    gameStatus.innerText = `It's ${game.player1.emoji}'s turn`;
  }else if (playerNum === 2 && !game.gameWon){
    gameStatus.innerText = `It's ${game.player2.emoji}'s turn`
  }
  if(playerNum === 2 && game.gameWon ){
    gameStatus.innerText = `${game.player1.emoji} WINS!!!`;
  }else if(playerNum === 1 && game.gameWon){
    gameStatus.innerText = `${game.player2.emoji} WINS!!!`
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
  displayGameStatus(game.currentTurn);

}
