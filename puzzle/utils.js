// For a 8 puzzle problem to be solvable, the number of inversions count needs to be even.
// Refer: https://www.geeksforgeeks.org/check-instance-15-puzzle-solvable/
export function isSolvable(tiles) {
  let inversions = 0;

  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[i] && tiles[j] && tiles[i] > tiles[j]) {
        inversions += 1;
      }
    }
  }

  //
  return inversions % 2 === 0;
}

export function shuffle(tiles) {
  let temp;
  let randomIndex;
  let currentIndex = tiles.length - 1;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // swap algorithm
    temp = tiles[currentIndex];
    tiles[currentIndex] = tiles[randomIndex];
    tiles[randomIndex] = temp;
  }

  return tiles;
}
