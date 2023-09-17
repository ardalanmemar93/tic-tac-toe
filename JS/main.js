document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.box');
    const startButton = document.getElementById('start-button');
    const messageElement = document.getElementById('message');
  
    let currentPlayer = 'X';
    let gameOver = false;
    let board = ['', '', '', '', '', '', '', '', ''];
  
    // Add click event listeners to the game tiles
    tiles.forEach((tile, index) => {
      tile.addEventListener('click', () => {
        if (!gameOver && tile.textContent === '') {
          tile.textContent = currentPlayer;
          board[index] = currentPlayer;
  
          // Add player-specific class for color
          tile.classList.add(currentPlayer);
  
          // Change tile background color based on player
          if (currentPlayer === 'X') {
            tile.style.backgroundColor = 'limegreen';
          } else {
            tile.style.backgroundColor = 'orange';
          }
  
          if (checkWinner(currentPlayer)) {
            messageElement.textContent = `Player ${currentPlayer} wins!`;
            gameOver = true;
          } else if (board.every((cell) => cell !== '')) {
            messageElement.textContent = "It's a draw!";
            gameOver = true;
          } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          }
        }
      });
    });
  
    // Add click event listener to the "Replay" button
    startButton.addEventListener('click', () => {
      resetGame();
      messageElement.textContent = '';
    });
  
    // Function to check for a winner
    function checkWinner(player) {
      const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
  
      return winningCombos.some((combo) => {
        const [a, b, c] = combo;
        return board[a] === player && board[b] === player && board[c] === player;
      });
    }
  
    // Function to reset the game
    function resetGame() {
      tiles.forEach((tile) => {
        tile.textContent = '';
        tile.classList.remove('X', 'O'); // Remove player-specific classes
        tile.style.backgroundColor = 'white'; // Reset background color
      });
      currentPlayer = 'X';
      gameOver = false;
      board = ['', '', '', '', '', '', '', '', ''];
    }
  });
  