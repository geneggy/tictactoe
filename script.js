//create players
const playerFactory = (name, mark, turn) => {
  return { name, mark, turn };
};

//game status
const game = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const player1 = playerFactory("player1", "O", true);
  const player2 = playerFactory("player2", "X", false);
  let currentPlayer = player1;
  let turns = 9;
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

  function nextPlayer() {
    this.currentPlayer === player1
      ? (this.currentPlayer = player2)
      : (this.currentPlayer = player1);
  }

  //will return truefalse value if any combination is found
  function checkWinner() {
    return winCombos.some((combo) => {
      return (
        this.board[combo[0]] === this.currentPlayer.mark &&
        this.board[combo[1]] === this.currentPlayer.mark &&
        this.board[combo[2]] === this.currentPlayer.mark
      );
    });
  }

  function resetGame() {
    this.turns = 9;
    this.currentPlayer = player1;
  }

  return {
    board,
    currentPlayer,
    turns,
    nextPlayer,
    checkWinner,
    resetGame,
  };
})();

const gameBoard = (() => {
  const boardGridEl = document.querySelector(".game-grid");
  const messageEl = document.querySelector(".game-message");
  const resetBtnEl = document.querySelector(".game-reset-button");

  game.board.forEach((item, index) => {
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
      game.board[index] = game.currentPlayer.mark;
      game.turns -= 1;
      if (game.checkWinner()) {
        messageEl.innerText = `${game.currentPlayer.mark} Wins!`;
        const removePointerFromSqaures = boardSquares.filter((sq) => {
          !(sq.style.pointerEvents = "none");
        });
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
    game.board.forEach((item, index) => {
      game.board[index] = "";
    });
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
  }

  resetBtnEl.addEventListener("click", () => {
    resetBoardGrid();
    game.resetGame();
  });

  return { boardSquares };
})();
