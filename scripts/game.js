function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
    'You won, <span id="winner-name">PLAYER NAME</span>!';
  gameOverElement.style.display = "none";

  let gameBoardIndex = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players!");
    return;
  }

  resetGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }

  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (event.target.tagName !== "LI" || gameIsOver) {
    return;
  }

  const selectedField = event.target;

  const selectedColumn = selectedField.dataset.col - 1; //for array indexes we should start at zero therefore I'll deduct 1
  const selectedRow = selectedField.dataset.row - 1; //if we deduct 1 we perform a mathematical operation that will automatically convert the result to a number
  //because our <<data->> in html file for li 's elements is actually not a number , but a string

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("Please select an empty field!");
    return;
  }

  selectedField.textContent = players[activePlayer].symbol; //players[0]
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1; // plus 1 because activePlayer by default is zero for the first player and 1 for the second player
  // but in array i wanna store 1 for the first player and 2 for the second player in this array 0 meen no player

  const winnerId = checkForGameOver();
  if (winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  // Checking the rows for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // Checking the columns for equality

  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // Diagonal: Top left to bottom right

  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  // Diagonal: Bottom left to top right

  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  if (currentRound === 9) {
    return -1;
  }

  return 0;
}

function endGame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw!";
  }
}
