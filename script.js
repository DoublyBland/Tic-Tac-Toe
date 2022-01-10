const Player = (name, symbol) => { //player factory
    let turn = 0;
    let score = 0;
    function playTurn(){
        highlightPlayer();
        const container = document.getElementById("game-board");
        container.addEventListener('click', (e) => {
            if(!event.target.classList.contains('child')){
                return;
            }
            if(event.target.textContent !== ''){
                return;
            }
            else {
                e.target.textContent = symbol;
                turn += 1;
                game.nextTurn();
            return turn;
             }
            }, {once: true});
        return turn;
    }

    function checkTurn() {
        return turn;
    }


    function highlightPlayer(){
        const playerOne = document.getElementById("p1");
        const playerTwo = document.getElementById("p2");
        if (name == playerOne.textContent){
            playerOne.classList.add('playing');
            playerTwo.classList.remove('playing');
        }
        else if (name == playerTwo.textContent){
            playerTwo.classList.add('playing');
            playerOne.classList.remove('playing');
        }
    }
    return {playTurn, turn, checkTurn, name, score};
  };

const gameBoard = (function() { //gameBoard module

    function initializeGrid(){
        const container = document.getElementById("game-board");
        for(let i=1;i<=3;i++){
            let row = document.createElement("DIV"); 
            row.setAttribute('id', `${i}`);
            for(let j=1;j<=3;j++){
                let column = document.createElement("DIV");
                column.textContent = "";
                column.classList.add("child");
                column.classList.add(`column-${i}`);
                column.classList.add(`row-${j}`);
                row.appendChild(column);
            }
            container.appendChild(row);
        }
    }

    function checkForWin(){
        _checkVertical();
        _checkHorizontal();
        _checkDiagonal();
    }

    function _checkVertical(){
        let firstColumn = document.getElementsByClassName("column-1");
        let secondColumn = document.getElementsByClassName("column-2");
        let thirdColumn = document.getElementsByClassName("column-3");
        let columns = [firstColumn, secondColumn, thirdColumn];
        for(let i = 0; i<columns.length; i++){
            let column = columns[i];
            let checkArray = []
            for(let j=0; j<column.length; j++){
                let text = column[j].textContent;
                checkArray.push(text);
            }
            if(_checkArrayForWin(checkArray)){
                for(let i=0;i<column.length;i++){
                    column[i].classList.add('winner');
                }
            }
        }
    }

    function _checkHorizontal(){
        let firstRow = document.getElementsByClassName("row-1");
        let secondRow = document.getElementsByClassName("row-2");
        let thirdRow = document.getElementsByClassName("row-3");
        console.log(firstRow);
        let rows = [firstRow, secondRow, thirdRow];
        for(let i = 0; i<rows.length; i++){
            let row = rows[i];
            let checkArray = [];
            for(let j=0; j<row.length; j++){
                let text = row[j].textContent;
                checkArray.push(text);
            }
            if(_checkArrayForWin(checkArray)){
                for(let i=0;i<row.length;i++){
                    row[i].classList.add('winner');
                }
            }
        }
    }

    function _checkDiagonal(){
        let firstRow = document.getElementsByClassName("row-1");
        let secondRow = document.getElementsByClassName("row-2");
        let thirdRow = document.getElementsByClassName("row-3");

        let diagonalOne = [];
        let diagonalTwo = [];
        let aa, bb, cc, ac, ca;

        aa = firstRow[0];
        bb = secondRow[1];
        cc = thirdRow[2];
        ac = firstRow[2];
        ca = thirdRow[0];

        diagonalOne = [aa, bb, cc];
        let oneText = [aa.textContent, bb.textContent, cc.textContent];
        diagonalTwo = [ac, bb, ca];
        let twoText = [ac.textContent, bb.textContent, ca.textContent];
        
        if(_checkArrayForWin(oneText)){
            for(let i=0;i<diagonalOne.length;i++){
                diagonalOne[i].classList.add('winner');
            }
        }

        if(_checkArrayForWin(twoText)){
            for(let i=0;i<diagonalTwo.length;i++){
                diagonalTwo[i].classList.add('winner');
            }
        }

    }

    function _checkArrayForWin(array){
        let a = array[0];
        let b = array[1];
        let c = array[2];
        if(a){
        if(a === b && b === c){
            //console.log(`${a} ${b} ${c}`)
            return true;
        }
        else {
            return false;
        }
    }
    }
    return {initializeGrid, checkForWin};
  })();

const game = (function() { //game module
    let gameOver = false;
    let turn = 0;
    let firstPlayer = Player(prompt("Please enter first player name", "Player 1"), 'X');
    let secondPlayer = Player(prompt("Please enter second player name", "Player 2") ,'O');
    
    let players  = decideOrder();
    function beginGame(){

        gameBoard.initializeGrid();
        updateDisplays();
        return;
    }

    function updateDisplays() {
        let displayOne = document.getElementById("p1");
        let displayTwo = document.getElementById("p2");
        displayOne.textContent = firstPlayer.name;
        displayTwo.textContent = secondPlayer.name;
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    function decideOrder(){
        let random = getRandomInt(2);
        let players = []
        if (random == 0) {
            p1 = firstPlayer;
            p2 = secondPlayer;
        }
        else {
            p1 = secondPlayer;
            p2 = firstPlayer;
        }
        players.push(p1);
        players.push(p2);
        return players;
    }

    function nextTurn(){
        let playerOne = players[0];
        let playerTwo = players[1];
        let oneTurn = playerOne.checkTurn();
        let twoTurn = playerTwo.checkTurn();
        if (turn == oneTurn){
            oneTurn = playerOne.playTurn();
            gameBoard.checkForWin();
        }
        else if (turn == twoTurn){
            twoTurn = playerTwo.playTurn();
            gameBoard.checkForWin();
        }
        else {
            turn += 1;
            nextTurn();
        }
    }

    return {beginGame, nextTurn};
  })();

game.beginGame();
game.nextTurn();
