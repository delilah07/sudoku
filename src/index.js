/*module.exports = function solveSudoku(matrix) {
  // your solution
  var nonPossibiities = {},
      impossibleNumber,
      emptySpaces = 0;
  while (emptySpaces > 0){
    for (var v = 0; v < matrix.length;v++){
      for (var h = 0; h < matrix.length; h++){
        nonPossibiities = {};
        if (matrix[v][h] === 0){
          for (var i = 0; i < 9; i++){
            if(matrix[v][i] > 0){
              nonPossibiities[matrix[v][i]] = true;
            }
            if(matrix[i][h] > 0){
              nonPossibiities[matrix[i][h]] = true;
            }
          }
          for (var vertBox = Math.floor(v / 3) * 3; vertBox < Math.floor(v / 3) * 3; vertBox++){
            for (var horzBox = Math.floor(h / 3) * 3; horzBox < Math.floor(h / 3) * 3; horzBox++){
              if (matrix[vertBox][horzBox]){
                nonPossibiities[matrix[vertBox][horzBox]] = true;
              }
            }
          }
          impossibleNumber = Object.keys(nonPossibiities);
          if (impossibleNumber.length === 8){
            for ( var i = 0; i < 10; i++){
              if (impossibleNumber.indexOf(i.toString()) < 0){
                matrix[v][h] = i;
              }
            }
          } else {
            emptySpaces++;
          }
        }
      }
    }
  }
  return matrix;
}*/
module.exports = function solveSudoku(matrix) {
  if (solveSudokuRec(matrix)){
    return matrix;
  }
}
function solveSudokuRec(matrix) {
  let arr = getFirstNull(matrix);
  if (arr[2] === false){
    return true;
  }

    for (let num = 1; num < 10; num++){
      let currRow = arr[0];
      let currCol = arr[1];
      if (checkNum(matrix,currRow,currCol,num)){
        matrix[currRow][currCol] = num;
        if (solveSudokuRec(matrix)){
          return true;
        }
        matrix[currRow][currCol] = 0;
      }

    }
  return false;
}

function getFirstNull(matrix){
  for (let i = 0; i < matrix.length; i++){
    for (let j = 0; j < matrix[i].length; j++){
      if (matrix[i][j] === 0){
        return [i,j,true];
      }
    }
  }
  return [0, 0, false];
}
function horzNum(matrix, row, num){
  /*for (let i = 0; i < matrix[row].length; i++){
    if (matrix[row][i] === num){
      return true;
    }
  }
  return false;*/

  return matrix[row].some(i => i === num)
}
function vertNum(matrix, col, num){
  /*for (let i = 0; i < matrix.length; i++){
    if (matrix[i][col] === num){
      return true;
    }
  }
  return false;*/

  return matrix.some(i => i[col] === num)
}

function squareNum(matrix, rowStart, colStart, num){
  for (let i = rowStart; i < rowStart + 3; i++){
    for (let j = colStart; j < colStart + 3; j++){
      if (matrix[i][j] === num){
        return true;
      }
    }
  }
  return false;
  /*let square = [];
  return matrix[row].some(matri)*/
}
function checkNum(matrix, row, col, num){
  let rowStart = 3 * Math.floor(row / 3);
  let colStart = 3 * Math.floor(col / 3);
  return (!horzNum(matrix,row,num) && 
          !vertNum(matrix,col,num) && 
          !squareNum(matrix, rowStart, colStart, num));
}