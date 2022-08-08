'use strict';
const NUMBER_OF_COLS = 20;
const NUMBER_OF_ROWS = 30;
let cell;

// create the 20x30 grid
// each grid has attributes with it's own row and column number
for (let i = 1; i <= NUMBER_OF_ROWS; i++) {
  for (let j = 1; j <= NUMBER_OF_COLS; j++) {
    cell = document.createElement('p');
    cell.className = 'cell';
    cell.setAttribute('row', i);
    cell.setAttribute('col', j);
    document.body.append(cell);
  }
}

// add event listener to body (Event Delegation approach)
document.body.addEventListener('click', function (event) {
  let target = event.target;
  // get the row and column number of the clicked cell
  let row = target.getAttribute('row');
  let col = target.getAttribute('col');
  // get the cell that has the same row and column number of the clicked cell
  let sameColCells = document.querySelectorAll(`[col="${col}"]`);
  let sameRowCells = document.querySelectorAll(`[row="${row}"]`);

  if (target.className != 'cell') {
    return;
  }

  // reset previous state if shift key is not pressed
  if (!event.shiftKey) {
    document.querySelectorAll(`.cell`).forEach((cell) => {
      cell.style.backgroundColor = 'white';
      cell.innerText = '';
    });
  }

  // change background color
  target.style.backgroundColor = 'blue';
  target.innerText = `R:${row}\nC:${col}`; // clicked-on cells have a no-null value, that can be used to differentiate them
  sameRowCells.forEach(function (cell) {
    if (cell.innerText === '') {
      cell.style.backgroundColor = 'lightblue';
    }
  });
  sameColCells.forEach(function (cell) {
    if (cell.innerText === '') {
      cell.style.backgroundColor = 'lightblue';
    }
  });
});
