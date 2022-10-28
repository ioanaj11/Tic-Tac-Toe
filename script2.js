//give the player the opportunity to choose Human vs Computer or Human vs Human
const playerSelection=document.querySelector('select');
playerSelection.addEventListener('click', ()=>{
    const form=document.querySelector('form');
    if (playerSelection.value === 'Computer'){
        const player2Name=document.getElementById('player2Name');
        form.removeChild(player2Name);
        const player2=document.getElementById('player2');
        player2.setAttribute('id','player2Name');
        }
        else {
            const player2Name=document.createElement('input');
            player2Name.setAttribute('type','text');
            player2Name.setAttribute('id','player2Name');
            player2Name.setAttribute('name','player2Name');

            const startBtn=document.querySelector('.startBtn')
            form.insertBefore(player2Name, startBtn);
        }
})

function getPlayers(){
    const player1=document.getElementById('player1').value;
    const player2=document.getElementById('player2Name').value;
    return{ player1, player2};
}

const startBtn=document.querySelector('.startBtn');
startBtn.addEventListener('click', ()=> {
    getPlayers();    
    generateGameboard();
    const player2=document.querySelector('.players2>p').textContent;
    if (player2 !== "Computer") game()
        else gameAgainstAI()})


//the function which generates the Gameboard
function generateGameboard(){
    const player1=document.createElement('p');
    player1.textContent=`${getPlayers().player1}`;
    
    const xBtn=document.createElement('button');
    xBtn.textContent="X";
    xBtn.classList.add('marker1');
    xBtn.classList.add('active');

    const player1Div=document.createElement('div');
    player1Div.classList.add('players1');

    player1Div.appendChild(player1);
    player1Div.appendChild(xBtn);

    const field=document.createElement('div');
    field.classList.add('gameBoard');
    
    for(let i=0; i<=8; i++){
        const box=document.createElement('div');
        box.classList.add('boxes');
        box.setAttribute('id', `${i}`);
 
        field.appendChild(box);
    }

    const board=document.querySelector('.gameArea');
   
    board.appendChild(field);

    board.insertBefore(player1Div, field);

    const player2=document.createElement('p');
    player2.textContent=`${getPlayers().player2}`;
    
    const OBtn=document.createElement('button');
    OBtn.textContent="O";
    OBtn.classList.add('marker2');

    const player2Div=document.createElement('div');
    player2Div.classList.add('players2');
    player2Div.appendChild(player2);
    player2Div.appendChild(OBtn);

    const playersDiv2=document.createElement('div');
    playersDiv2.appendChild(player2Div);

    board.appendChild(playersDiv2);

    const formDiv=document.querySelector('.formDiv')
    board.removeChild(formDiv);
}

//an object to store the X's and O's
let Gameboard={
    gameboard:['','','','','','','','',''],
}

//an object to store the winning lines
let winningLines=(gameboard)=> {
    return{
    line1:[gameboard[0], gameboard[1], gameboard[2]].toString(),
    line2:[gameboard[3], gameboard[4], gameboard[5]].toString(),
    line3:[gameboard[6], gameboard[7], gameboard[8]].toString(),
    line4:[gameboard[0], gameboard[3], gameboard[6]].toString(),
    line5:[gameboard[1], gameboard[4], gameboard[7]].toString(),
    line6:[gameboard[2], gameboard[5], gameboard[8]].toString(),
    line7:[gameboard[0], gameboard[4], gameboard[8]].toString(),
    line8:[gameboard[2], gameboard[4], gameboard[6]].toString()}
}

//displays the contant of the Gameboard object on the screen
function displayGameboard(object){
    for(let i=0; i<object.gameboard.length;i++){
        const box=document.getElementById(`${i}`);
        box.textContent=`${object.gameboard[i]}`;
    }
    }

let round=1;

function game(){
    const board=document.querySelector('.gameBoard');
    board.addEventListener('click', e => addXorO(e.target.id));
}    

function addXorO(selectedbox,player1, player2){
    const markerButton1=document.querySelector('.marker1');
    const markerButton2=document.querySelector('.marker2');
    
    if (round %2 !=0) marker="X";
                else marker="O";
    if (Gameboard.gameboard[selectedbox] =="")
        {   Gameboard.gameboard[selectedbox]= marker;
            displayGameboard(Gameboard);
            round++;
            markerButton1.classList.toggle('active');
            markerButton2.classList.toggle('active');
            }
    checkForWinner();
}

function endRound(){
    for(let i=0; i<=9;i++){
        if (Gameboard.gameboard[i] =="")
          Gameboard.gameboard[i]=" ";
    }
    const boxes=document.querySelectorAll('.boxes');
    boxes.forEach((box)=> box.setAttribute('style', "color: rgba(100,100,100, 0.8)"));
    
}

function displayMessage(string){
    const container=document.querySelector('.container');
    const containerChild=document.querySelectorAll('.container>div');

    if(containerChild.length === 1){
        const messageArea=document.createElement('div')
        messageArea.classList.add('footer');
        messageArea.textContent=`${string}`;
        container.appendChild(messageArea);}
}

function gameAgainstAI(){
    const board=document.querySelector('.gameBoard');
    board.addEventListener('click', e => 
        {   if (Gameboard.gameboard[e.target.id]==="") 
                 {addX(e.target.id); 
                 displayGameboard(Gameboard);
                checkForWinner();

                addComputerChoice();
                displayGameboard(Gameboard);
                checkForWinner();}})
}

function addX(selectedbox){
     Gameboard.gameboard[selectedbox]="X";
     round++;
}

function addComputerChoice(){
       let possible=false;
       for(let i=0;i<=8;i++){
            if (Gameboard.gameboard[i]=="") possible=true;}
        if (possible==true){
            let selectedbox=Math.floor(Math.random()*9);
            if (Gameboard.gameboard[selectedbox]=="") {
                Gameboard.gameboard[selectedbox]="O";
                round++;}
                else addComputerChoice();
    }}
    
function checkForWinner(){
    let foundWinner=false;
    const markerButton1=document.querySelector('.marker1');
    const markerButton2=document.querySelector('.marker2');
    const player1Name=document.querySelector('.players1>p').textContent;
    const player2Name=document.querySelector('.players2>p').textContent;

    for(let i=1; i<=8; i++){
        if(winningLines(Gameboard.gameboard)[`line${i}`]== "X,X,X"){
            displayMessage( `!!! ${player1Name} is the winner !!!`);
            foundWinner=true;
            markerButton2.classList.toggle('active');
            endRound();
        } 
        if(winningLines(Gameboard.gameboard)[`line${i}`]== "O,O,O"){
            displayMessage( `!!! ${player2Name} is the winner !!!`);
            foundWinner=true;
            markerButton1.classList.toggle('active');
            endRound();
        }   }
    if ((round==10)&&(foundWinner===false)) { 
            displayMessage("!!! It's a tie. !!!");
            };
    return foundWinner;
    }