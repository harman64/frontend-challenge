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
}

const tiles = document.querySelectorAll('.tile');
const puzzle = new Puzzle(['1', '2', '3', '4', '5', '6', '7', '8', '0'], tiles);

puzzle.init();
