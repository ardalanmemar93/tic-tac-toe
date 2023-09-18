
//constants 
document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.box');
    const startButton = document.getElementById('start-button');
    const replayButton = document.getElementById('replay-button');
    const messageEl = document.getElementById('message');
  
    let currentPlayer = 'X';
    let gameOver = false;
    let board = ['', '', '', '', '', '', '', '', ''];
  
    // Add click event listener to the "Start Game" button
    startButton.addEventListener('click', () => {
      // Reset the game when starting
      resetGame();
      messageEl.textContent = '';
      startButton.style.display = 'none'; // Hide the "Start Game" button
      replayButton.style.display = 'none'; // Hide the "Replay" button
      tiles.forEach((tile) => {
        tile.addEventListener('click', handleTileClick);
      });
    });
  
    // Add click event listener to the "Replay" button
    replayButton.addEventListener('click', () => {
      // Reset the game when replaying
      resetGame();
      messageEl.textContent = '';
      startButton.style.display = 'none'; // Hide the "Start Game" button
      replayButton.style.display = 'none'; // Hide the "Replay" button
      tiles.forEach((tile) => {
        tile.addEventListener('click', handleTileClick);
      });
    });
  
    // Function to handle tile click
    function handleTileClick() {
      if (!gameOver && this.textContent === '') {
        this.textContent = currentPlayer;
        board[this.dataset.index] = currentPlayer;
  
        // Add player-specific class for color
        this.classList.add(currentPlayer);
  
        // Change tile background color based on player
        if (currentPlayer === 'X') {
          this.style.backgroundColor = 'limegreen';
        } else {
          this.style.backgroundColor = 'orange';
        }
  
        if (checkWinner(currentPlayer)) {
          messageEl.textContent = `Player ${currentPlayer} wins!`;
          gameOver = true;
          replayButton.style.display = 'block'; // Show the "Replay" button
        } else if (board.every((cell) => cell !== '')) {
          messageEl.textContent = "It's a draw!";
          gameOver = true;
          replayButton.style.display = 'block'; // Show the "Replay" button
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
      }
    }
  
    // Function to check for a winner
    function checkWinner(player) {
      const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      return winningCombos.some((combo) => {
        const [a, b, c] = combo;
        return board[a] === player && board[b] === player && board[c] === player;
      });
    }
  
    // Function to reset the game
    function resetGame() {
      tiles.forEach((tile, index) => {
        tile.textContent = '';
        tile.classList.remove('X', 'O'); // Remove player-specific classes
        tile.style.backgroundColor = 'white'; // Reset background color
        tile.dataset.index = index; // Add data-index attribute for indexing
      });
      currentPlayer = 'X';
      gameOver = false;
      board = ['', '', '', '', '', '', '', '', ''];
    }
  });
  