const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const boardGridEl = document.querySelector(".game-grid");
  board.forEach((item, index) => {
    const boardSquareEl = document.createElement("div");
    boardSquareEl.classList.add("board-square");
    boardSquareEl.setAttribute("data-index", index);
    boardGridEl.appendChild(boardSquareEl);
  });

  //array of all board-squareElements
  const boardSquares = Array.from(document.querySelectorAll(".board-square"));
  //addEventListener to each square that will
  //fill in currentPlayer mark from game(); in both board arr and squareEl. can just select same index in board & boardSquares or use data-index attribute.
  //mark will be css selector that applies according to current player
  boardSquares.forEach((square, index) => {
    square.addEventListener(
      "click",
      () => {
        //add currentPlayer mark to classList
        square.classList.add(game.currentPlayer.mark);
        square.innerText = game.currentPlayer.mark;

        //fill in board with appropriate mark
        board[index] = game.currentPlayer.mark;
        console.log(board);

        //check winner
        game.checkWinner();
        //toggle currentPlayer
        game.nextPlayer();

        //switch cursor to no
        square.style.cursor = "not-allowed";
      },
      //only once
      { once: true }
    );
  });

  return { board, boardSquares };
})();

//create players
const playerFactory = (playerName, mark, turn) => {
  return { playerName, mark, turn };
};

//game status
const game = (() => {
  //initiate players
  const player1 = playerFactory("player1", "O", true);
  const player2 = playerFactory("player2", "X", false);

  //game counters
  let currentPlayer = player1;
  let turns = 9;

  //Winning combinations
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  //switch to next player after turn
  function nextPlayer() {
    console.log(this.currentPlayer);
    this.currentPlayer === player1
      ? (this.currentPlayer = player2)
      : (this.currentPlayer = player1);
  }

  function checkWinner() {
    winCombos.forEach((combo) => {
      if (
        gameBoard.board[combo[0]] === this.currentPlayer.mark &&
        gameBoard.board[combo[1]] === this.currentPlayer.mark &&
        gameBoard.board[combo[2]] === this.currentPlayer.mark
      ) {
        console.log(`${this.currentPlayer.name} wins`);
      } else {
        console.log("no winner");
      }
    });
  }

  //
  return { currentPlayer, turns, nextPlayer, checkWinner };
})();
