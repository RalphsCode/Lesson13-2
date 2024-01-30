/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

class Game {            // Create class
  constructor(width, height){        // Create constructor
    this.WIDTH = width || 7;
    this.HEIGHT = height || 6;  
    this.currPlayer = 1; // active player: 1 or 2
    this.board = []; // array of rows, each row is array of cells  (board[y][x])
  } // End constructor

    /** makeBoard: create in-JS board structure:
     *   board = array of rows, each row is array of cells  (board[y][x])
     */

    makeBoard() {       // Change function to method
      for (let y = 0; y < this.HEIGHT; y++) {
        this.board.push(Array.from({ length: this.WIDTH }));
      }
    }

    /** makeHtmlBoard: make HTML table and row of column tops. */

    makeHtmlBoard() {    // Change function to method
      const board = document.getElementById('board');

      // make column tops (clickable area for adding a piece to that column)
      const top = document.createElement('tr');
      top.setAttribute('id', 'column-top');
      top.addEventListener('click', this.handleClick);

      for (let x = 0; x < this.WIDTH; x++) {
        const headCell = document.createElement('td');
        headCell.setAttribute('id', x);
        top.append(headCell);
      }

      board.append(top);

      // make main part of board
      for (let y = 0; y < this.HEIGHT; y++) {
        const row = document.createElement('tr');

        for (let x = 0; x < this.WIDTH; x++) {
          const cell = document.createElement('td');
          cell.setAttribute('id', `${y}-${x}`);
          row.append(cell);
        }

        board.append(row);
      }
    }

    /** findSpotForCol: given column x, return top empty y (null if filled) */

    findSpotForCol(x) {       // Change function to method
      for (let y = this.HEIGHT - 1; y >= 0; y--) {
        if (!this.board[y][x]) {
          return y;
        }
      }
      return null;
    }

    /** placeInTable: update DOM to place piece into HTML table of board */

    placeInTable(y, x) {       // Change function to method
      const piece = document.createElement('div');
      piece.classList.add('piece');
         if (this.currPlayer == 1){
            // set the tile color based on the player objects
          piece.style.backgroundColor = p1.playerColor;
        } else {
          piece.style.backgroundColor = p2.playerColor;
        }
        piece.style.top = -50 * (y + 2);

      const spot = document.getElementById(`${y}-${x}`);
      spot.append(piece);
    }

    /** endGame: announce game end */

    endGame(msg) {       // Change function to method
      alert(msg);
      // Prevent any more moves
      const top = document.getElementById('column-top');
      top.removeEventListener('click', this.handleClick);
      }

    /** handleClick: handle click of column top to play piece */

    handleClick = (evt) => {       // Change function to method
                                   // Use arrow function to maintain scope
      // get x from ID of clicked cell
      const x = +evt.target.id;

      // get next spot in column (if none, ignore click)
      const y = this.findSpotForCol(x);
      if (y === null) {
        return;
      }

      // place piece in board and add to HTML table
      this.board[y][x] = this.currPlayer;
      this.placeInTable(y, x);
      
      // check for win
      if (this.checkForWin()) {
        return this.endGame(`Player ${this.currPlayer} won!`);
      }
      
      // check for tie
      if (this.board.every(row => row.every(cell => cell))) {
        return endGame('Tie!');
      }
        
      // switch players
      this.currPlayer = this.currPlayer === 1 ? 2 : 1;
    }

    /** checkForWin: check board cell-by-cell for "does a win start here?" */

    checkForWin() {       // Change function to method
      const _win = (cells) => {  // Use arrow function to maintain scope
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer

        return cells.every(     // SCOPE ISSUES
          ([y, x]) =>
            y >= 0 &&
            y < this.HEIGHT &&
            x >= 0 &&
            x < this.WIDTH &&
            this.board[y][x] === this.currPlayer
        );
      }

      for (let y = 0; y < this.HEIGHT; y++) {
        for (let x = 0; x < this.WIDTH; x++) {
          // get "check list" of 4 cells (starting here) for each of the different
          // ways to win
          const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
          const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
          const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
          const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

          // find winner (only checking each win-possibility as needed)
          if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
            return true;
          }
        }
      }
    }


  }    // END Game class


//  Create a Class of Player used to generate player objects
class Player {
  constructor(color) {
    this.playerColor = color;
  }
}   // END Player class


// Function to get the player piece color selections
// and calls the playGame function.
function getColors() {
  const p1ColorChoice = document.getElementById('p1Color');
  const p2ColorChoice = document.getElementById('p2Color');
      // Check if both users chose the same color
      if (p1ColorChoice.value == p2ColorChoice.value) {
          window.alert('Please choose different colors.');
          return;
        } else {
        p1 = new Player(p1ColorChoice.value);
        p2 = new Player(p2ColorChoice.value);
        console.log(p1, p1.playerColor, p2, p2.playerColor);
        playGame();
        return p1, p2;
      }
}   // END getColors()

// Function to start a new game
function playGame() {
    const playGame = new Game(6, 7);   // assuming constructor takes height, width
    playGame.makeBoard();
    playGame.makeHtmlBoard();
    gameInProgress = true;
}   // END playGame()

// Start fresh
let gameInProgress = false;

// Immediately Invoked Function Expression (IIFE)
// to process the form and start a new game
(function startForm() {
    const gameDiv = document.getElementById('pickColor');
    const playBtn = document.createElement('button');
    playBtn.textContent = 'Start Game';
    playBtn.addEventListener('click', function(){
      if (gameInProgress === true){
        // Clear the gameboard & reset the game
        document.getElementById('board').innerHTML = '';
        gameInProgress = false;
      }
        // Start a new game
        getColors();
    });   // END EventListener
    gameDiv.append(playBtn);
})();   // END startBtn() IIFE
