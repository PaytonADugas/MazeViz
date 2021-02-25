
// The code is annoying to look at at the top of the monitor

// Maze class

class Maze{
  constructor(col, row){
    this.col = col;
    this.row = row
    this.maze = [];
  }
}

maze = new Maze(30,30);
var walls = [];
var walls2 = [];

var visited_cells = [[0,0]];

function buildMaze(mz, cell){

  var dir = getDirection(cell);

  if(!dir){
    if(mz.length==0)
      return;
    cell = mz.pop();
    buildMaze(mz, cell);
  }else{

    var new_cell = [cell[0]+dir[0], cell[1]+dir[1]]
    mz.push(new_cell);
    visited_cells.push(new_cell);
    setWalls(cell, new_cell, dir);

    buildMaze(mz, new_cell);
  }
}

function setWalls(cell_0, cell_1, dir){

    str_dir = dir[0].toString() + dir[1].toString();

    switch(str_dir){
      case '0-1':
        walls2[cell_0[0]][cell_0[1]][0] = 0;
        walls[cell_0[0]][cell_0[1]][0] = 0;
        walls[cell_1[0]][cell_1[1]][1] = 0;
        break;
      case '01':
        walls2[cell_0[0]][cell_0[1]][1] = 0;
        walls[cell_0[0]][cell_0[1]][1] = 0;
        walls[cell_1[0]][cell_1[1]][0] = 0;
        break;
      case '10':
        walls2[cell_0[0]][cell_0[1]][2] = 0;
        walls[cell_0[0]][cell_0[1]][2] = 0;
        walls[cell_1[0]][cell_1[1]][3] = 0;
        break;
        case '-10':
        walls2[cell_0[0]][cell_0[1]][3] = 0;
        walls[cell_0[0]][cell_0[1]][3] = 0;
        walls[cell_1[0]][cell_1[1]][2] = 0;
        break;
    }
}

function displayWalls(dir){
  var id;
  for(let i = 0; i < maze.col; i++){
    for(let j = 0; j < maze.row; j++){
      id = i.toString()+"-"+j.toString();
      if(!walls[j][i][0])
        $('#'+id).css('border-top', '0px');
      if(!walls[j][i][1])
        $('#'+id).css('border-bottom', '0px');
      if(!walls[j][i][2])
        $('#'+id).css('border-right', '0px');
      if(!walls[j][i][3])
        $('#'+id).css('border-left', '0px');
    }
  }
}

function getDirection(cell){
  var pos_dir = []; //Possible directions

  function visited(cell){
    for(let i=0;i<visited_cells.length;i++){
      if(cell[0]==visited_cells[i][0]&&cell[1]==visited_cells[i][1])
        return true;
    }
    return false
  }


  if(cell[1]>0 && !visited([cell[0],cell[1]-1])) // NORTH
    pos_dir.push([0,-1]);
  if(cell[1]<maze.col-1 && !visited([cell[0],cell[1]+1])) // SOUTH
    pos_dir.push([0,1]);
  if(cell[0]<maze.row-1 && !visited([cell[0]+1,cell[1]])) // EAST
    pos_dir.push([1,0]);
  if(cell[0]>0 && !visited([cell[0]-1,cell[1]])) // WEST
    pos_dir.push([-1,0]);

  if(pos_dir.length==0)
      return false;

  return pos_dir[Math.floor(Math.random()*pos_dir.length)];
}

var visited_cells2 = [[0,0]];

mazeToTable();
buildMaze([[0,0]], [0,0]);
displayWalls();
var a_maze = buildArrayMaze([[0,0]], [0,0]);
var solve_speed = 100;
solveMaze([[0,0]], [0,0]);

$('#0-0').css('background-color', 'green');
id = (maze.col-1).toString()+ '-'+(maze.col-1).toString();
$('#'+id).css('background-color', 'red');


function buildArrayMaze(mz, cell){
  var junction = [];
  for(let i = 0; i < 4; i++){
    if(!walls2[cell[0]][cell[1]][i]){
      var next_cell;
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
      junction.push(next_cell);
    }
  }

  if(junction.length==0)
    return mz;

  if(junction.length==1){
    mz.push(junction[0]);
    return buildArrayMaze(mz, junction[0]);
  }
  else{
    mz.push(function(){
      var r_junction = [];
      for(let i = 0; i < junction.length;i++){
        r_junction.push(buildArrayMaze([junction[i]], junction[i]))
      }
      return r_junction;
    }());
  }
  return mz;
}

function solveMaze(mz, cell){
  var junction = [];
  var next_cell;
  for(let i = 0; i < 4; i++){
    next_cell = null;
    if(!walls2[cell[0]][cell[1]][i]){
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
        for(let i = 0; i< visited_cells2.length;i++){
          if(next_cell[0]==visited_cells2[i][0] && next_cell[1]==visited_cells2[i][1])
            return false;
        }
        return true;
      }()){
        junction.push(next_cell);
      }
    }
  }

  if(junction.length==0){
    cell = mz.pop();
    if(!cell)
      return;
    solveMaze(mz, cell);
    id = cell[1].toString()+"-"+cell[0].toString();
    $('#'+id).css('background-color', 'grey');
  }
  else{
      var next_cell = junction[Math.floor(Math.random()*junction.length)];
      if(next_cell[0] == maze.col-1&&next_cell[1]==maze.col-1){
        turnGreen(mz, next_cell);
        return;
      }
      visited_cells2.push(next_cell);
      id = next_cell[1].toString()+"-"+next_cell[0].toString();
      $('#'+id).css('background-color', 'blue');
      mz.push(next_cell);
      setTimeout(function(){solveMaze(mz, next_cell)}, solve_speed);
  }
}

function turnGreen(mz, cell){
  cell = mz.pop();
  id = cell[1].toString()+"-"+cell[0].toString();
  $('#'+id).css('background-color', 'green');
  turnGreen(mz,cell);
}

// function solveMaze(mz, cell){
//   var junction = [];
//   var next_cell;
//   for(let i = 0; i < 4; i++){
//     next_cell = null;
//     if(!walls2[cell[0]][cell[1]][i]){
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
//         for(let i = 0; i< visited_cells2.length;i++){
//           if(next_cell[0]==visited_cells2[i][0] && next_cell[1]==visited_cells2[i][1])
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
//     $('#'+id).css('background-color', 'grey');
//   }
//   else{
//       var next_cell = junction[Math.floor(Math.random()*junction.length)];
//       if(next_cell[0] = maze.col-1&&next_cell[0]==maze.col-1){
//         turnGreen(mz, next_cell);
//         return;
//       }
//       visited_cells2.push(next_cell);
//       id = next_cell[1].toString()+"-"+next_cell[0].toString();
//       $('#'+id).css('background-color', 'blue');
//       mz.push(next_cell);
//       setTimeout(function(){solveMaze(mz, next_cell)}, solve_speed);
//   }
// }
//
// function turnGreen(mz, cell){
//   cell = mz.pop();
//   id = cell[1].toString()+"-"+cell[0].toString();
//   $('#'+id).css('background-color', 'green');
//   turnGreen(mz,cell);
//}


// function solveMaze(path, b){
//   var id;
//
//   if(path.length==0)
//
//
//   id = path[0][1].toString()+"-"+path[0][0].toString();
//   $('#'+id).css('background-color', 'blue');
//
//   var cell = path.shift();
//
//   b.push(cell);
//
//   setTimeout(function(){solveMaze(path, b)},solve_speed);
//
// }
//
// function changeColor(path, color){
//   for(let i = 0; i < path.length; i++){
//     id = path[i][1].toString()+"-"+path[i][0].toString();
//     $('#'+id).css('background-color', color);
//   }
// }

function mazeToTable(){
  var html = '';
  for(let i = 0; i < maze.col; i++){
    walls[i] = [];
    walls2[i] = [];
    html += '<tr>';
    for(let j = 0; j < maze.row; j++){
      walls[i][j] = [1,1,1,1];
      walls2[i][j] = [1,1,1,1];
      var id = i.toString()+"-"+j.toString();
      html += '<td id='+id+' style="border: 2px solid black;"></td>';
    }
    html += '</tr>';
  }
  $('#mazeTable').html(html);
}


































// hehe
