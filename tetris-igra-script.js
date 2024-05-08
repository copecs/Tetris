
let shapesrot = [[ //defaultpos
    [[1, 1], [1, 1]],          // 0 Square
    [[1], [1], [1], [1]],      // 1 Line
    [[1, 0], [1, 0], [1, 1]],  // 2 L Shape
    [[0, 1], [0, 1], [1, 1]],  // 3 J Shape
    [[0, 1, 0], [1, 1, 1]],    // 4 T Shape
    [[0, 1, 1], [1, 1, 0]],    // 5 S Shape
    [[1, 1, 0], [0, 1, 1]],    // 6 Z Shape
],
[ //90*
    [[1, 1], [1, 1]],          // 0 Square
    [[1,1,1,1]],      // 1 Line
    [[1, 1, 1],[1,0,0]],  // 2 L Shape
    [[1, 0,0],[1,1,1]],  // 3 J Shape
    [[1,0],[1,1] ,[1, 0]],    // 4 T Shape
    [[1, 0], [1, 1], [0, 1]],    // 5 S Shape
    [[0, 1], [1, 1], [1, 0]],   // 6 Z Shape
],
 [ //180*
    [[1, 1], [1, 1]],          // 0 Square
    [[1], [1], [1], [1]],      // 1 Line
    [[1, 1, 1],[0,0,1]],    // 2 L Shape
    [[1, 1], [1, 0], [1, 0]],  // 3 J Shape
    [[1, 1, 1], [0, 1, 0]],    // 4 T Shape
    [[0, 1, 1], [1, 1, 0]],    // 5 S Shape
    [[1, 1, 0], [0, 1, 1]],    // 6 Z Shape
],
 [ //270
    [[1, 1], [1, 1]],          // 0 Square
    [[1,1,1,1]],    // 1 Line
    [[0, 1], [0, 1], [1, 1]],  // 2 L Shape
    [[1, 1,1],[0,0,1]],    // 3 J Shape
    [[0,1],[1,1] ,[0, 1]],    // 4 T Shape
    [[1, 0], [1, 1], [0, 1]],    // 5 S Shape
    [[0, 1], [1, 1], [1, 0]],   // 6 Z Shape
]];


let nextshap = [
    [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]],
    [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
    [[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]],
    [[0,0,1,0],[0,0,1,0],[0,1,1,0],[0,0,0,0]],
    [[0,0,0,0],[0,1,0,0],[1,1,1,0],[0,0,0,0]],
    [[0,0,0,0],[0,0,1,1],[0,1,1,0],[0,0,0,0]],
    [[0,0,0,0],[0,1,1,0],[0,0,1,1],[0,0,0,0]]
];

let board = []
let fixed = []
let smallboard = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
let currentRow = 0;
let currentCol = 4;
let score = 0;
let cur_rot = 0;
let shapes = shapesrot[0];
let color = 1;
let lvl = 1;
let game = true;
let oblicichecked= [1,1,1,1,1,1,1]
let broblika = 7;
let game_counter = 1;
let ms = 1000;

let currentShapeIndex = parseInt(Math.random()*broblika);
let currentShape = deepCopyMatrix(shapes[currentShapeIndex]);
let nextShapeIndex = parseInt(Math.random()*broblika);
let nextShape = deepCopyMatrix(shapes[nextShapeIndex]);

const RANDOM_COLORS = [
    '#202020', //base
    '#FF5733', // Red
    '#FFBD33', // Orange
    '#33FF57', // Green
    '#338AFF', // Blue
    '#FF33E9', // Pink
    '#33FFBD', // Cyan
    '#B433FF', // Purple
    '#FF3333', // Light Red
    '#33FF91', // Light Green
    '#33A3FF',  // Light Blue
    '#ffffff'
];

$(document).ready(function(){
    broblika=dohvatiOblike();
    lvl =JSON.parse(localStorage.getItem("lvl"));
    currentShapeIndex = parseInt(Math.random()*broblika);
    currentShape = deepCopyMatrix(shapes[currentShapeIndex]);
    nextShapeIndex = parseInt(Math.random()*broblika);
    nextShape = deepCopyMatrix(shapes[nextShapeIndex]);
    createTetrisTable();
    initialize_board();
    print_board();  
    colorRandomShape();
    draw_shape();
    drawNextShape();
    draw_board();
    updateScore()
    printLvL();
    console.log("lvl je" +lvl)
    if(game){
       ms=parseInt(1000/lvl);
        tick();
    }
});

function dohvatiOblike(){
    if(localStorage.getItem("oblici")){
    	oblicichecked = JSON.parse(localStorage.getItem("oblici"));
    }
    console.log(oblicichecked);
    let s =0;
    for(let i=6;i>=0;i--){
        if (oblicichecked[i] !== 1) {
            nextshap.splice(i, 1); 
            shapesrot[0].splice(i, 1);
            shapesrot[1].splice(i, 1); 
            shapesrot[2].splice(i, 1); 
            shapesrot[3].splice(i, 1);
        }
        else{s+=1;}
    }
    console.log(nextshap);
    console.log(s);
    return s;
}
function printLvL(){
    $("#lvl").text(lvl);
}
function updateScore(){
    $("#score").text(score);
}
function newShape(){
    currentShapeIndex = nextShapeIndex;
    currentShape = nextShape;
    nextShapeIndex = parseInt(Math.random()*broblika);
    nextShape = deepCopyMatrix(shapes[nextShapeIndex]);
    drawNextShape();
    score += 100;
    console.log(score);
}
function checkforGameOver(){
    for(let j=3;j<7;j++){ 
        if(fixed[0][j]!=0){
            game = false;


            return;
        }
    }
    game = true;
}
function drawNextShape(){
    for(let i =0; i<4;i++){
        s="#"+i;
        for(let j = 0;j<4;j++){
            st = s+j;
            $(st).css("background-color",RANDOM_COLORS[nextshap[nextShapeIndex][i][j]!=0?11:0])
        }
    }
}
function clear_board(){
    let move_down = 0;
    for(let i=19;i>=0;i--){
        let f = true;

        for(let j =0;j<10;j++){
            fixed[i+move_down][j] = fixed[i][j];
        }
        
        for(let j=0;j<10;j++){
            if(fixed[i][j]==0)
                f=false;
        }
        if(f){
            move_down+=1;
            score+=1000;
            for(let j=0;j<10;j++){
                fixed[i][j]=0;
            }
        }
    }
    if(move_down!=0)
        board = deepCopyMatrix(fixed);
}
function tick(){
    if(game){
    setTimeout(function(){
        move_to(1,0);
        checkforGameOver();
        tick();
    },ms);
    }
    else{
        let ime = prompt("Please enter your name:");
        localStorage.setItem("lastGame", JSON.stringify([ime,score]));
        window.location.href = "tetris-rezultati.html";
    }
}
function canMove(row,col,shape){
    for(let i=0;i<shape.length;i++){
        for(let j=0;j<shape[i].length;j++){
            if(shape[i][j] != 0)
            {
                const newRow = row + i;
                const newCol = col + j;
                if (newRow < 0 || newRow >= 20 || newCol < 0 || newCol >= 10 || fixed[newRow][newCol] != 0  ) {
                    return false;
                }
            }
        }
    }
    return true;
}


function move_to(deltai,deltaj){
    checkforGameOver();
    let newrow = currentRow + deltai;
    let newcol = currentCol + deltaj;

    if(canMove(newrow,newcol,currentShape))
    {
        erase_shape();
        currentCol = newcol;
        currentRow = newrow;
        draw_shape();
        draw_board();
    
    }
    else if(deltai==1 && deltaj==0){ //blok je fiksiran
        fixed = deepCopyMatrix(board);
        currentRow = 0;
        currentCol = 4;
        newShape();
        colorRandomShape();
        
        clear_board();
        draw_shape();
        draw_board();

        game_counter+=1;
        if(game_counter%10==0){
            ms=parseInt(ms*0.95);
            console.log("novi ms je"+ms)
        }

    }
}
function can_draw_shape(){
    for(let i =0;i<currentShape.length;i++){
        for(let j=0;j<currentShape.length;j++){
            if(board[currentCol+i][currentRow+j]!=0)
                return false;
        }
    }
    return true;
}
function draw_shape(){
    if(can_draw_shape){
        for(let i =0;i<currentShape.length;i++){
            for(let j=0;j<currentShape[i].length;j++){
                board[currentRow+i][currentCol+j]=currentShape[i][j]!=0?currentShape[i][j]:board[currentRow+i][currentCol+j];
            }
        }
        return true;
    }
    return false;
}
function erase_shape(){
    for(let i =0;i<currentShape.length;i++){
        for(let j=0;j<currentShape[i].length;j++){
            try {
                board[currentRow+i][currentCol+j]=0;

            } catch (error) {
                
            }
        }
   }

}


function draw_board(){
    updateScore()
    tabela = $("#tetris-table");
    for(let i =0; i<20;i++){
        s="#r"+i;
        for(let j = 0;j<10;j++){
            st = s+"td"+j;
            $(st).css("background-color",RANDOM_COLORS[board[i][j]])
        }
    }

}

function print_board(){
    for(let i =0;i<20;i++){
        s = ""
        for(let j = 0 ;j<10;j++){
            s+=" "+board[i][j];
        }

    }
}
function createTetrisTable() {
    rows = 20;
    cols = 10;
    var table = document.getElementById('tetris-table');

    for (var i = 0; i < rows; i++) {
      var row = document.createElement('tr');
      row.id = 'row' + i; 

      for (var j = 0; j < cols; j++) {
        var cell = document.createElement('td');
        cell.id = 'r' + i + 'td' + j; 
        row.appendChild(cell);
      }

      table.appendChild(row);
    }
  }
function initialize_board(){
    for(let i =0;i<20;i++){
        let row = [];
        for(let j = 0 ;j<10;j++){
            row.push(0);
        }
        board.push(row);
        fixed.push(row.slice());
    }
}
document.addEventListener('keydown', (event) => {
    if (event.key === "ArrowLeft" && game) {
        move_to(0,-1);
    } else if (event.key === "ArrowRight" && game) {
        move_to(0,1);
    } else if (event.key === "ArrowDown" && game) {
        move_to(1,0);
    } else if (event.key === "ArrowUp" && game) {
        checkforGameOver();
        cur_rot = parseInt((cur_rot+1)%4);
        shapes = shapesrot[cur_rot];
        oldshape = currentShape;
        let rotatedShape = deepCopyMatrix(shapes[currentShapeIndex]);
        
        if (canMove(currentRow, currentCol, rotatedShape)) {
            erase_shape();
            currentShape = rotatedShape;
            colorShape();
            draw_shape();
            draw_board();
        } else {
            currentShape = oldshape;
        }
        

    }
});


function deepCopyMatrix(matrix) {
    var copy = [];
    
    for (var i = 0; i < matrix.length; i++) {
        var rowCopy = [];
            for (var j = 0; j < matrix[i].length; j++) {
            rowCopy.push(matrix[i][j]);
        }
        
        copy.push(rowCopy);
    }
    
    return copy;
}

function colorRandomShape(){
    color = 1 + parseInt(10*Math.random());
    colorShape();

}
function colorShape(){
    for(let i=0;i<currentShape.length;i++){
        for(let j=0;j<currentShape[i].length;j++){
            currentShape[i][j]*=color;
        }
    }
}




