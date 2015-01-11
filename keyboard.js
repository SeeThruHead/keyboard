// Let's first start by creating a matrix that will represent the switches on the keyboard
// I've chosen to create an an array of 14 to represent the columns of the keyboard
// Then I've put arrays of 5 inside to represent the rows. I've initialized the
// array to false to signify that the switches are not activated.

// This matrix is just here to simulate the real life electrical matrix
// You could get the keyboard state right from this matrix but on a micro-
// controller you would have to read the columns, so we're going to implement that

var matrix = Array.apply(null, {length: 14}).map(function() {
  return Array.apply(null, {length: 5}).map(function() {return false});
});
// console.log(matrix);

// Lets create a function that will simulate the physical pressing of a key
function pressKey(matrix,column, row) {
  return matrix[column][row] = true;
};

// Lets press some keys with our pressKey function

pressKey(matrix, 0, 0);
pressKey(matrix, 0, 1);
pressKey(matrix, 1, 1);
pressKey(matrix, 2, 2);
pressKey(matrix, 3, 3);

// Now lets create a function that scans the columns, I'm going to make it so that
// each time the function is called is scans the next column, it will return the
// pressed keys in the column

var scanColumn = (function() {
  var column = 0;
  return function(matrix) {
    var results = matrix[column].reduce(function(acc, val, index) {
      return val ? acc.concat(index) : acc;
    }, []);
    column++;
    column = column % matrix.length;
    return results;
  };
})();

function scanMatrix(matrix) {
  var results = [];
  for (i = 0; i < matrix.length; i++) {
    results.push(scanColumn(matrix));
  }
  return results;
};

console.log(scanMatrix(matrix));