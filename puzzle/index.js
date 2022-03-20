import './index.scss';
import { isSolvable, shuffle } from './utils';

class Puzzle {
  puzzle = null;
  emptyRowIndex = null;
  emptyColumnIndex = null;
  puzzleGrid = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '0'],
  ];

  constructor(goalState, tiles) {
    this.tiles = tiles;
    this.goalState = goalState;
  }

  init() {
    this.puzzle = shuffle([...this.goalState]);

    // shuffle until the puzzle is solvable
    while (!isSolvable(this.puzzle)) {
      this.puzzle = shuffle([...this.goalState]);
    }

    this.#drawGrid();
    this.#setClickHandlers();
  }

  #drawGrid() {
    let i = 0;
    this.puzzle.forEach((item, j) => {
      const row = parseInt(j / 3, 10);
      const col = j % 3;
      this.puzzleGrid[row][col] = item;

      if (item !== '0') {
        this.tiles[i].innerText = item;
        this.tiles[i].style['grid-area'] = `${row + 1} / ${col + 1}`;
        i += 1;
      } else {
        this.emptyRowIndex = row;
        this.emptyColumnIndex = col;
      }
    });
  }

  // Used to fetch the clickable elements surrounding the empty cell
  #getAdjacentElements() {
    const draggableElements = [];
    const gridSize = Math.sqrt(this.puzzle.length); // 3
    for (let i = this.emptyRowIndex - 1; i < this.emptyRowIndex + 2; i++) {
      for (
        let j = this.emptyColumnIndex - 1;
        j < this.emptyColumnIndex + 2;
        j++
      ) {
        if (i > -1 && j > -1 && i < gridSize && j < gridSize) {
          if (
            (i === this.emptyRowIndex || j === this.emptyColumnIndex) &&
            !(i === this.emptyRowIndex && j === this.emptyColumnIndex)
          ) {
            draggableElements.push(this.puzzleGrid[i][j]);
          }
        }
      }
    }

    return draggableElements;
  }

  #setClickHandlers() {
    const elements = this.#getAdjacentElements();

    this.tiles.forEach(tile => {
      if (elements.includes(tile.innerText)) {
        tile.addEventListener('click', () => {
          // handleClick here
        });
      }
    });
  }
}

const tiles = document.querySelectorAll('.tile');
const puzzle = new Puzzle(['1', '2', '3', '4', '5', '6', '7', '8', '0'], tiles);

puzzle.init();
