



var visited_cells = [[0,0]];
var solve_speed = 50;
var size = 20;

maze = new Maze(size, size);
maze.mazeToTable();
maze.buildMaze([[0,0]],[0,0]);
maze.displayWalls();
maze.array_maze = maze.buildArrayMaze([[0,0]],[0,0]);

//$('#solve').click(solveMaze([[0,0]],[0,0]));

$("#solve" ).click(function() {
  $('#0-0').css('background-color', 'blue');
  setTimeout(function(){solveMaze([[0,0]],[0,0]);},solve_speed);
});

$("#reset" ).click(function() {
  reset();
});

var slider = document.getElementById('slider');

slider.oninput = function(){
  solve_speed = 350 - $('#slider').val()
  console.log(solve_speed);
};

$('#size_0').click(function(){
  size = 5;
  reset()
});
$('#size_1').click(function(){
  size = 10;
  reset()
});
$('#size_2').click(function(){
  size = 20;
  reset()
});
$('#size_3').click(function(){
  size = 25;
  reset()
});
$('#size_4').click(function(){
  size = 30;
  reset()
});



function reset(){
  maze = new Maze(size, size);
  maze.mazeToTable();
  maze.buildMaze([[0,0]],[0,0]);
  maze.displayWalls();
  maze.array_maze = maze.buildArrayMaze([[0,0]],[0,0]);

  visited_cells = [[0,0]];
}

// Solve Maze Depth First Search

function solveMaze(mz, cell){
  var junction = [];
  var next_cell;
  for(let i = 0; i < 4; i++){
    next_cell = null;
    if(!maze.walls2[cell[0]][cell[1]][i]){
      switch(i){
        case 0: // NORTH
          next_cell = [cell[0],cell[1]-1];
          break;
        case 1: // SOOUTH
          next_cell = [cell[0],cell[1]+1];
          break;
        case 2: // EAST
          next_cell =[cell[0]+1,cell[1]];
          break;
        case 3: // WEST
          next_cell =[cell[0]-1,cell[1]];
          break;
      }
    }

    if(next_cell){
      if(function(){
        for(let i = 0; i< visited_cells.length;i++){
          if(next_cell[0]==visited_cells[i][0] && next_cell[1]==visited_cells[i][1])
            return false;
        }
        return true;
      }()){
        junction.push(next_cell);
      }
    }
  }

  if(junction.length==0){
    id = cell[0].toString()+"-"+cell[1].toString();
    $('#'+id).css('background-color', 'grey');
    cell = mz.pop();
    if(!cell)
      return;
    solveMaze(mz, cell);
  }
  else{
    if(junction.length>1)
      mz.push(cell);
    var next_cell = junction[Math.floor(Math.random()*junction.length)];
    if(next_cell[0] == maze.x-1&&next_cell[1]==maze.y-1){
      mz.push(next_cell);
      turnGreen(mz, next_cell);
      return;
    }
    visited_cells.push(next_cell);
    id = next_cell[0].toString()+"-"+next_cell[1].toString();
    $('#'+id).css('background-color', 'blue');
    mz.push(next_cell);
    setTimeout(function(){solveMaze(mz, next_cell)}, solve_speed);
  }
}

function turnGreen(mz, cell){
  if(mz.length==0)
    return;
  cell = mz.pop();
  id = cell[0].toString()+"-"+cell[1].toString();
  $('#'+id).css('background-color', 'green');
  turnGreen(mz,cell);
}

// Solve Maze Breadth First search

// function solveMaze(mz, cell){
//   var junction = [];
//   var next_cell;
//   for(let i = 0; i < 4; i++){
//     next_cell = null;
//     if(!this.walls2[cell[0]][cell[1]][i]){
//       switch(i){
//         case 0: // NORTH
//           next_cell = [cell[0],cell[1]-1];
//           break;
//         case 1: // SOOUTH
//           next_cell = [cell[0],cell[1]+1];
//           break;
//         case 2: // EAST
//           next_cell =[cell[0]+1,cell[1]];
//           break;
//         case 3: // WEST
//           next_cell =[cell[0]-1,cell[1]];
//           break;
//       }
//     }
//
//     if(next_cell){
//       if(function(){
//         for(let i = 0; i< this.visited_cells2.length;i++){
//           if(next_cell[0]==this.visited_cells2[i][0] && next_cell[1]==this.visited_cells2[i][1])
//             return false;
//         }
//         return true;
//       }()){
//         junction.push(next_cell);
//       }
//     }
//   }
//
//   if(junction.length==0){
//     cell = mz.pop();
//     if(!cell)
//       return;
//     solveMaze(mz, cell);
//     id = cell[1].toString()+"-"+cell[0].toString();
//     $('#'+id).css('background-yor', 'grey');
//   }
//   else{
//       var next_cell = junction[Math.floor(Math.random()*junction.length)];
//       if(next_cell[0] = maze.y-1&&next_cell[0]==maze.y-1){
//         turnGreen(mz, next_cell);
//         return;
//       }
//       this.visited_cells2.push(next_cell);
//       id = next_cell[1].toString()+"-"+next_cell[0].toString();
//       $('#'+id).css('background-yor', 'blue');
//       mz.push(next_cell);
//       setTimeout(function(){solveMaze(mz, next_cell)}, solve_speed);
//   }
// }
//
// function turnGreen(mz, cell){
//   cell = mz.pop();
//   id = cell[1].toString()+"-"+cell[0].toString();
//   $('#'+id).css('background-yor', 'green');
//   turnGreen(mz,cell);
//}
