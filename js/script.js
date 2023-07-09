// Game Constants & Variables
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 8;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{x: 13, y: 15}];
food = {x: 6,y: 7};

// Game Functions

// rate at which snake will run all the time
function main(ctime){
    // calling function itself i.e infinitely
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

// To know if game is over
function isCollide(snake){
    // If you bump into yourself
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
    return false;
}

// Main things for game
function gameEngine(){
    // Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));    //storing hiscore in local storage
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        // unshift add leemnts i.e the size of the snake increases by eating food 
        snakeArr.unshift({x: snakeArr[0].x +inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()),y: Math.round(a + (b-a)*Math.random())}
    }

    // Moving the snake
    // Moving body
    for(let i=snakeArr.length - 2;i>=0;i--){
        // ... lagaye taki sb element ek hi address ko at the end point na krne lg jaye , yani value ded pr point na kare
        snakeArr[i+1] = {...snakeArr[i]};
    }
    // Moving head
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Dsiplay sanke anf food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        // to add element to snake
        board.appendChild(snakeElement);
    })
    // Display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement)
}

// Main logic starts here

// plays bg music
musicSound.play();
// updating hiscore
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

// calling main to start game
window.requestAnimationFrame(main);
// movements on pressing keys
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} //Start game
    moveSound.play();
    switch (e.key){
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});