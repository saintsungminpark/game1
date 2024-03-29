const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images
const ground = new Image();
ground.src = "images/ground.png";

const foodImg = new Image();
foodImg.src = "images/food.png";

// load audio files
const dead = new Audio();
const eat = new Audio();
const left = new Audio();
const up = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audios/dead.mp3"
eat.src = "audios/eat.mp3"
left.src = "audios/left.mp3"
up.src = "audios/up.mp3"
right.src = "audios/right.mp3"
down.src = "audios/down.mp3"

// create the snake (initialize)
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// create the food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

// create the score var
let score = 0;

// control the snake
let d;
document.addEventListener("keydown", direction)

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        left.play();
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        up.play();
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        right.play();
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        down.play();
        d = "DOWN";
    }
}

// check collision function
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// draw everything to the canvas
function draw() {
    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box); // (x위치, y위치, x크기, y크기 )

        ctx.strokeStyle = "green";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //which direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box, // 1 ~ 17
            y: Math.floor(Math.random() * 15 + 3) * box // 3 ~ 17
        }
        // we don't remove the tail
    } else {
        // remove the tail
        snake.pop();
    }

    // add new head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // game over
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || 
        snakeY > 17 * box || collision(newHead, snake)) { // collision() {return true}
        clearInterval(game);
        dead.play();
    }

    snake.unshift(newHead); // 앞에서 부터 넣기

    ctx.fillStyle = "white";
    ctx.font = "42px Change one";
    ctx.fillText(score, 2 * box, 1.6 * box);

}

// call draw function every 100ms
let game = setInterval(draw, 100);