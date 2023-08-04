let mode =3;

const state = {
    grid: Array(1)
        .fill()
        .map(()=>Array(mode+2).fill('')),
        currentRow: 0,
        currentCol:1,
        turns:0,
        secret : generateSecret(),
};
function updateGrid(){
    for(let i=0;i<state.grid.length;i++){
        for(let j=0;j<state.grid[i].length;j++){
            const box = document.getElementById(`box${i}${j}`)
            box.textContent = state.grid[i][j];
        }
    }
}

function drawBox(container,row,col,num = ' '){
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = num;
    container.appendChild(box);
    return box;
}
function drawScoreBox(container,row,col,num = ' '){
    const box = document.createElement('div');
    box.className = 'box scorebox';
    box.id = `box${row}${col}`;
    box.textContent = num;
    container.appendChild(box);
    return box;
}


function drawGrid(container,rows){
    console.log('drawing');
    const grid = document.createElement('div');
    grid.className = 'grid';
    grid.id = 'grid';
    for(let i=0;i<rows;i++){
        drawScoreBox(grid,i,0);
        for(let j=1;j<mode+1;j++){
            console.log(mode);
            drawBox(grid,i,j);
        }
        drawScoreBox(grid,i,mode+1);
    }
    container.appendChild(grid);
}

function registerKeyboardEvents(){
    document.body.onkeydown = (e) =>{
        const key = e.key;
        if(key == 'Enter'){
            console.log('checking');
            if(state.currentCol==mode+1){
                const guess = getCurrentGuess();
                if(isValisGuess(guess)){
                    
                    updateScore();
                    checkWin();
                    addRow();
                    state.currentRow++;
                    state.currentCol=1;
                }
                else{
                    alert("That isn't a valid guess\n(hint: duplicates aren't allowed)");
                }
            }
        }
        if(key == 'Backspace'){
            removeNum();
        }
        if(isDigit(key)){
            addNum(key);
        }
        updateGrid();
    }
}
function getCurrentGuess(){
    let s = '';
    for(let i=1;i<mode+1;i++){
        s+=state.grid[state.currentRow][i];
    }
    return s;
}
function isValisGuess(guess){
    return true;
}
function updateScore(){
    let chickens = 0;
    let carrots = 0;
    for(let i=1;i<mode+1;i++){
        if(state.grid[state.currentRow][i]==state.secret[i-1]){
            carrots++;
        }
        else if(state.secret.includes(state.grid[state.currentRow][i].toString())){
            chickens++;
        }

    }
    state.grid[state.currentRow][0]=chickens.toString();
    state.grid[state.currentRow][mode+1]=carrots.toString();
}
function generateSecret(){
    let s='';
    let fourth;
    if(mode==4){
        fourth= randomNumber();
    }
    else {
        fourth = '';
    }
    let third= randomNumber();
    let second= randomNumber();
    let first= randomNumber();
    for (;;) {
	third= randomNumber();
	second= randomNumber();
	first= randomNumber();
	if(third!=fourth && second!=fourth && second!=third && first!=fourth && first!=third && first!=second){break}
    }
    s = first.toString()+second.toString()+third.toString()+fourth.toString();

    console.log(s);
    return s;
}
function checkWin(){
    state.turns++;
    if (state.grid[state.currentRow][mode+1]==mode){
        alert("You won in "+state.turns+" turns");
        window.location.reload();
    }

}
function randomNumber(){ 
    return Math.floor(Math.random()*10);
}
function isDigit(num){
    return /^[0-9]$/i.test(event.key);
}
function addNum(key){
    if (mode==4){
        let fourth= state.grid[state.currentRow][4];
        let third= state.grid[state.currentRow][3];
        let second= state.grid[state.currentRow][2];
        let first= state.grid[state.currentRow][1];

        if(third!=key && fourth!=key && second!=key && first!=key){
        if (state.currentCol === mode+1) return;
        state.grid[state.currentRow][state.currentCol] = key;
        state.currentCol++;
        }
    }
    if (mode==3){
        let third= state.grid[state.currentRow][3];
        let second= state.grid[state.currentRow][2];
        let first= state.grid[state.currentRow][1];

        if(third!=key && second!=key && first!=key){
        if (state.currentCol === mode+1) return;
        state.grid[state.currentRow][state.currentCol] = key;
        state.currentCol++;
        }
    }
    updateGrid();


    
}
    
function removeNum(){
    if (state.currentCol === 1) return;
    state.grid[state.currentRow][state.currentCol - 1] = '';
    state.currentCol--;
    updateGrid();
}
function enterButton(){
    if(state.currentCol==mode+1){
        const guess = getCurrentGuess();
        if(isValisGuess(guess)){
            
            updateScore();
            checkWin();
            addRow();
            state.currentRow++;
            state.currentCol=1;
        }
}
}

function addRow(){
    state.grid.push(Array(mode+2).fill(''));
    document.getElementById('game').innerHTML = "";
    drawGrid(game,state.currentRow+2);
    updateGrid();
}


function setup(){
    document.getElementById('game').innerHTML = "";

    const game = document.getElementById("game");
    drawGrid(game,1);
    registerKeyboardEvents();
}

setup();
