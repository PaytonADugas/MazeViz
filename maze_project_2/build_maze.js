
// The code is annoying to look at at the top of the monitor

// Maze class

class Maze{
  constructor(y, x){
    this.y = y;
    this.x = x
    this.maze =
    this.walls = [];
    this.walls2 = [];
    this.visited_cells = [[0,0]];
    this.array_maze = [];
  }


  buildMaze(mz, cell){

    var dir = this.getDirection(cell);

    if(!dir){
      if(mz.length==0)
        return;
      cell = mz.pop();
      this.buildMaze(mz, cell);
    }else{

      var new_cell = [cell[0]+dir[0], cell[1]+dir[1]]
      mz.push(new_cell);
      this.visited_cells.push(new_cell);
      this.setWalls(cell, new_cell, dir);

      this.buildMaze(mz, new_cell);
    }
  }

  setWalls(cell_0, cell_1, dir){

      var str_dir = dir[0].toString() + dir[1].toString();

      switch(str_dir){
        case '0-1':
          this.walls2[cell_0[0]][cell_0[1]][0] = 0;
          this.walls[cell_0[0]][cell_0[1]][0] = 0;
          this.walls[cell_1[0]][cell_1[1]][1] = 0;
          break;
        case '01':
          this.walls2[cell_0[0]][cell_0[1]][1] = 0;
          this.walls[cell_0[0]][cell_0[1]][1] = 0;
          this.walls[cell_1[0]][cell_1[1]][0] = 0;
          break;
        case '10':
          this.walls2[cell_0[0]][cell_0[1]][2] = 0;
          this.walls[cell_0[0]][cell_0[1]][2] = 0;
          this.walls[cell_1[0]][cell_1[1]][3] = 0;
          break;
          case '-10':
          this.walls2[cell_0[0]][cell_0[1]][3] = 0;
          this.walls[cell_0[0]][cell_0[1]][3] = 0;
          this.walls[cell_1[0]][cell_1[1]][2] = 0;
          break;
      }
  }

  displayWalls(dir){
    var id;
    for(let i = 0; i < maze.y; i++){
      for(let j = 0; j < maze.x; j++){
        id = j.toString()+"-"+i.toString();
        if(!this.walls[j][i][0])
          $('#'+id).css('border-top', '0px');
        if(!this.walls[j][i][1])
          $('#'+id).css('border-bottom', '0px');
        if(!this.walls[j][i][2])
          $('#'+id).css('border-right', '0px');
        if(!this.walls[j][i][3])
          $('#'+id).css('border-left', '0px');
      }
    }
  }

  getDirection(cell){
    var pos_dir = []; //Possible directions


    if(cell[1]>0 && !this.visited([cell[0],cell[1]-1])) // NORTH
      pos_dir.push([0,-1]);
    if(cell[1]<this.y-1 && !this.visited([cell[0],cell[1]+1])) // SOUTH
      pos_dir.push([0,1]);
    if(cell[0]<this.x-1 && !this.visited([cell[0]+1,cell[1]])) // EAST
      pos_dir.push([1,0]);
    if(cell[0]>0 && !this.visited([cell[0]-1,cell[1]])) // WEST
      pos_dir.push([-1,0]);

    if(pos_dir.length==0)
        return false;

    return pos_dir[Math.floor(Math.random()*pos_dir.length)];
  }

  visited(cell){
    for(let i=0;i<this.visited_cells.length;i++){
      if(cell[0]==this.visited_cells[i][0]&&cell[1]==this.visited_cells[i][1])
        return true;
    }
    return false
  }

  buildArrayMaze(mz, cell){
    var junction = [];
    for(let i = 0; i < 4; i++){
      if(!this.walls2[cell[0]][cell[1]][i]){
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
      return this.buildArrayMaze(mz, junction[0]);
    }
    else
      mz.push(this.return_mz(junction));
    return mz;
  }

  return_mz(junction){
    var r_junction = [];
    for(let i = 0; i < junction.length;i++){
      r_junction.push(this.buildArrayMaze([junction[i]], junction[i]));
    }
    return r_junction;
  }

  mazeToTable(){
    var html = '';
    for(let i = 0; i < maze.y; i++){
      this.walls[i] = [];
      this.walls2[i] = [];
      html += '<tr>';
      for(let j = 0; j < maze.x; j++){
        this.walls[i][j] = [1,1,1,1];
        this.walls2[i][j] = [1,1,1,1];
        var id = j.toString()+"-"+i.toString();
        html += '<td id='+id+' style="border: 2px solid black;"></td>';
      }
      html += '</tr>';
    }
    $('#mazeTable').html(html);
  }
}






























// hehe
