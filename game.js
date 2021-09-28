class Game {
  constructor() {
    this.player1 = new Player(1, '🐶');
    this.player2 = new Player(2, '🐱');
    this.boxes = ["", "", "", "", "", "", "", "", ""];
    this.tie = false;
    this.gameWon = false;
    this.currentTurn = 1;
    this.turns = 0;
    this.winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ]
  }
  gameFlow(boxId) {
    this.fillBox(boxId);
    this.checkForWin();
    this.checkForTie();
    this.changeTurn();
  }



  checkForWin() {
    for (var i = 0; i < 8; i++) {
      var winCondition = this.winConditions[i];
      var a = this.boxes[winCondition[0]];
      var b = this.boxes[winCondition[1]];
      var c = this.boxes[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        this.saveWin();
      }
    }
  }

  fillBox(boxId) {
    if (this.currentTurn === 1 && this.boxes[boxId] === "" && !this.gameWon) {
      this.turns++;
      this.boxes[boxId] = this.player1.emoji;
    }
    if (this.currentTurn === 2 && this.boxes[boxId] === "" && !this.gameWon) {
      this.turns++;
      this.boxes[boxId] = this.player2.emoji;
    }
  }

  checkForTie() {
    if (this.turns === 9 && !this.gameWon) {
      this.tie = true;
      console.log('TIEEEEEE');
    }
  }

  saveWin() {
    this.gameWon = true;
    if (this.currentTurn === 1) {
      this.player1.saveWinsToStorage();
    } else {
      this.player2.saveWinsToStorage();
    }
  }

  changeTurn() {
    if (this.currentTurn === 1) {
      this.currentTurn = 2
    } else {
      this.currentTurn = 1;
    }
  }

  resetGame() {
    if (this.tie || this.gameWon) {
      this.boxes = ["", "", "", "", "", "", "", "", ""];
      this.tie = false;
      this.gameWon = false;
      this.turns = 0;
    }
  }

  getWins(playerNum){
    if(playerNum === 1){
      this.player1.retrieveWinsFromStorage();
      return this.player1.wins;
    }
    if(playerNum === 2){
      this.player2.retrieveWinsFromStorage();
      return this.player2.wins;
    }
  }
}
