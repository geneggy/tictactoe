const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const boardGridEl = document.querySelector(".game-grid");
  const messageEl = document.querySelector(".game-message");
  const resetBtnEl = document.querySelector(".game-reset-button");
  board.forEach((item, index) => {
    const boardSquareEl = document.createElement("div");
    boardSquareEl.classList.add("board-square");
    boardSquareEl.setAttribute("data-index", index);
    boardGridEl.appendChild(boardSquareEl);
  });

  const boardSquares = Array.from(document.querySelectorAll(".board-square"));

  boardSquares.forEach((square, index) => {
    square.addEventListener("click", () => {
      square.classList.add(game.currentPlayer.mark);
      square.innerText = game.currentPlayer.mark;
      board[index] = game.currentPlayer.mark;
      game.turns -= 1;
      console.log(game.turns);
      console.log(game.checkWinner());
      if (game.checkWinner()) {
        messageEl.innerText = "Winner!";
        const removePointerFromSqaures = boardSquares.filter((sq) => {
          !(sq.style.pointerEvents = "none");
        });
        console.log(removePointerFromSqaures);
        removePointerFromSqaures.forEach((square) => {
          square.style.pointerEvents == "none";
        });
      } else if (game.turns == 0) {
        messageEl.innerText = "tie!";
      } else {
        game.nextPlayer();
      }
      square.style.cursor = "not-allowed";
      square.style.pointerEvents = "none";
    });
  });

  function resetSquare(square, mark) {
    square.classList.remove(mark);
    square.innerText = "";
    square.style.cursor = "crosshair";
    square.style.pointerEvents = "auto";
  }

  function resetBoardGrid() {
    board.forEach((item, index) => {
      board[index] = "";
    });
    console.log(board);
    messageEl.innerText = "";
    boardSquares.forEach((square) => {
      if (square.classList.contains("X")) {
        resetSquare(square, "X");
      }
      if (square.classList.contains("O")) {
        resetSquare(square, "O");
      }
      square.style.pointerEvents = "auto";
    });

    console.log(board);
  }

  resetBtnEl.addEventListener("click", () => {
    resetBoardGrid();
    game.resetGame();
  });

  return { board, boardSquares };
})();

//create players
const playerFactory = (name, mark, turn) => {
  return { name, mark, turn };
};

//game status
const game = (() => {
  //initiate players
  const player1 = playerFactory("player1", "O", true);
  const player2 = playerFactory("player2", "X", false);

  //game counters
  let currentPlayer = player1;
  let turns = 9;

  //querySelectors

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
    this.currentPlayer === player1
      ? (this.currentPlayer = player2)
      : (this.currentPlayer = player1);
  }

  //will return truefalse value if any combination is found
  function checkWinner() {
    return winCombos.some((combo) => {
      return (
        gameBoard.board[combo[0]] === this.currentPlayer.mark &&
        gameBoard.board[combo[1]] === this.currentPlayer.mark &&
        gameBoard.board[combo[2]] === this.currentPlayer.mark
      );
    });
  }

  function resetGame() {
    this.turns = 9;
    this.currentPlayer = player1;
  }

  //
  return {
    currentPlayer,
    turns,
    nextPlayer,
    checkWinner,
    resetGame,
  };
})();
