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

  gridSize = 3; // since it is an 8 puzzle problem

  constructor(goalState, tiles) {
    this.tiles = tiles;
    this.goalState = goalState;

    this.eventListener = function eventListener(e) {
      this.#onClickHandler(e.currentTarget);
    };

    this.clickHandler = this.eventListener.bind(this);
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
    for (let i = this.emptyRowIndex - 1; i < this.emptyRowIndex + 2; i++) {
      for (
        let j = this.emptyColumnIndex - 1;
        j < this.emptyColumnIndex + 2;
        j++
      ) {
        if (i > -1 && j > -1 && i < this.gridSize && j < this.gridSize) {
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

  #getXYIndicesOfSelectedTile(tileText) {
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        if (this.puzzleGrid[i][j] === tileText) {
          return { row: i, col: j };
        }
      }
    }

    return { row: null, col: null };
  }

  #onClickHandler(tile) {
    this.#removeClickHandlers();

    const { row, col } = this.#getXYIndicesOfSelectedTile(tile.innerText);

    if (row !== null && col !== null) {
      // swap empty and tile clicked in puzzle grid
      this.puzzleGrid[this.emptyRowIndex][this.emptyColumnIndex] =
        tile.innerText;
      this.puzzleGrid[row][col] = '0';

      // move tile
      tile.style['grid-area'] = `${this.emptyRowIndex + 1} / ${
        this.emptyColumnIndex + 1
      }`;
      this.emptyRowIndex = row;
      this.emptyColumnIndex = col;

      if (this.#checkSolution()) {
        // eslint-disable-next-line no-alert
        setTimeout(() => alert('You Won!'), 0);
      }

      this.#setClickHandlers();
    }
  }

  #setClickHandlers() {
    const elements = this.#getAdjacentElements();
    const self = this;

    this.tiles.forEach(tile => {
      if (elements.includes(tile.innerText)) {
        tile.style.cursor = 'pointer';
        tile.addEventListener('click', self.clickHandler);
      }
    });
  }

  #removeClickHandlers() {
    const elements = this.#getAdjacentElements();
    const self = this;

    this.tiles.forEach(tile => {
      if (elements.includes(tile.innerText)) {
        tile.style.cursor = 'default';
        tile.removeEventListener('click', self.clickHandler);
      }
    });
  }

  #checkSolution = () => {
    let index = 0;
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        if (this.puzzleGrid[i][j] !== this.goalState[index]) {
          return false;
        }
        index += 1;
      }
    }
    return true;
  };
}

const tiles = document.querySelectorAll('.tile');
const puzzle = new Puzzle(['1', '2', '3', '4', '5', '6', '7', '8', '0'], tiles);

puzzle.init();
