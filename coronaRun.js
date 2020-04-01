//author: Tim Denzler

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var restartButton = document.getElementById("restartButton");

//images
const shopperImg = new Image();
shopperImg.src = 'images/Shopper.png';
const playerImg = new Image();
playerImg.src = 'images/Player.png';
const tpImg = new Image();
tpImg.src = 'images/TP.png';
const aisleLeftImg = new Image();
aisleLeftImg.src = 'images/AisleLeft.png';
const aisleRightImg = new Image();
aisleRightImg.src = 'images/AisleRight.png';
const coronaImg = new Image();
coronaImg.src = 'images/Corona.png';

//game variables
var x = canvas.width / 2;
var y = canvas.height - 50;
var playerRadius = 25;
var coronaRadius = 25;
var dx = 0;
var dy = 0;
var gameover = false;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var tpArr = [];
var aisleArr = [];
var coronArr = [];
var shopperArr = [];
var score = 0;
var highscore = 0;
var seconds = 0;
var speed = 1.2;
var cancel = setInterval(incrementSeconds, 1000);

document.getElementById("score").textContent = "Your score: " + score;
document.getElementById("highscore").textContent = "Your Highscore: " + highscore;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
restartButton.addEventListener("click", restart);

//draw aisles (initiate)
if (aisleArr.length == 0) {
    for (i = canvas.height - 200; i >= -200; i = i - 200) {
        var aisleNewLeft = new Object();
        aisleNewLeft.y = i;
        aisleNewLeft.x = 0;
        var aisleNewRight = new Object();
        aisleNewRight.y = i;
        aisleNewRight.x = canvas.width - 40;
        aisleArr.push(aisleNewLeft);
        aisleArr.push(aisleNewRight);
    }
}



//FUNCTIONS
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }

}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    } else if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

function drawTP() {
    for (var x = 0; x < tpArr.length; x++) {
        ctx.beginPath();
        //ctx.arc(tpArr[x].tpx, tpArr[x].tpy, 15, 0, 2 * Math.PI);
        //ctx.fillStyle = '#CCCCCC';
        ctx.drawImage(tpImg, tpArr[x].tpx - 32, tpArr[x].tpy - 35, 120, 120);
        ctx.fill();
        ctx.closePath();
        tpArr[x].tpy += speed;
    }
}

function drawAisle(aisle, x, y) {
    ctx.beginPath();
    //ctx.rect(x,y ,40, 190);
    //ctx.fillStyle = "#CCCCCC";
    ctx.drawImage(aisle, x, y, 40, 190);
    ctx.fill();
    ctx.closePath();
}

function drawShopper() {
    for (var i = 0; i < shopperArr.length; i++) {
        ctx.beginPath();
        //ctx.rect(shopperArr[i].x,shopperArr[i].y ,50, 100);
        //ctx.fillStyle = "#CCCCCC";
        ctx.drawImage(shopperImg, shopperArr[i].x - 8, shopperArr[i].y - 25, 65, 130);
        ctx.fill();
        ctx.closePath();
        shopperArr[i].y += (speed * 1.2);
    }
}

function drawCorona() {
    for (var x = 0; x < coronArr.length; x++) {
        ctx.beginPath();
        //ctx.arc(coronArr[x].x, coronArr[x].y, coronaRadius, 0, 2 * Math.PI);
        //ctx.fillStyle = "#CCCCCC";
        ctx.drawImage(coronaImg, coronArr[x].x - 25, coronArr[x].y - 20, coronaRadius * 2, coronaRadius * 2);
        ctx.fill();
        ctx.closePath();
        coronArr[x].y += (speed * 0.8);
    }
}

function drawPlayer() {
    ctx.beginPath();
    //ctx.arc(x, y, playerRadius, 0, 2 * Math.PI);
    //ctx.fillStyle = '#CCCCCC';
    ctx.drawImage(playerImg, x - 27, y - 25, playerRadius * 2, playerRadius * 2);
    ctx.fill();
    ctx.closePath();
}

function incrementSeconds() {
    seconds += 1;
    if (seconds % 2 == 0) {
        speed += 0.05;
    }
}
//ends Game
function endGame() {
    if (score > highscore) {
        highscore = score;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    document.getElementById("message").style.display = "block";
    document.getElementById("message").textContent = "Game Over! Unfortunately you have been infected";
    document.getElementById("score").textContent = `Your score: ${score}`;
    document.getElementById("highscore").textContent = `Your highscore: ${highscore}`;
    document.getElementById("restartButton").textContent = `Restart`;
}

function restart() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    restartButton = document.getElementById("restartButton");
    x = canvas.width / 2;
    y = canvas.height - 50;
    playerRadius = 25;
    coronaRadius = 25;
    dx = 0;
    dy = 0;
    gameover = false;
    rightPressed = false;
    leftPressed = false;
    upPressed = false;
    downPressed = false;
    tpArr = [];
    aisleArr = [];
    coronArr = [];
    shopperArr = [];
    score = 0;
    seconds = 0;
    speed = 1;
    cancel = setInterval(incrementSeconds, 1000);

    document.getElementById("score").textContent = "Your score: " + score;
    document.getElementById("highscore").textContent = "Your Highscore: " + highscore;
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.getElementById("message").style.display = "none";
    restartButton.addEventListener("click", restart);

    //draw aisles (initiate)
    if (aisleArr.length == 0) {
        for (i = canvas.height - 200; i >= -200; i = i - 200) {
            var aisleNewLeft = new Object();
            aisleNewLeft.y = i;
            aisleNewLeft.x = 0;
            var aisleNewRight = new Object();
            aisleNewRight.y = i;
            aisleNewRight.x = canvas.width - 40;
            aisleArr.push(aisleNewLeft);
            aisleArr.push(aisleNewRight);
        }
    }
}

//DRAW FUNCTION
function draw() {
    if (gameover) {
        endGame();
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff6ed";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //collision detection TP
        for (i = 0; i < tpArr.length; i++) {
            if (x < tpArr[i].tpx + 30
                && x + playerRadius > tpArr[i].tpx
                && y < tpArr[i].tpy + 30
                && y + playerRadius > tpArr[i].tpy) {
                score++;
                document.getElementById("score").textContent = "Your Score: " + score;
                document.getElementById("highscore").textContent = "Your Highscore: " + highscore;
                tpArr.shift();
            }
        }

        //collision detection Shopper
        for (i = 0; i < shopperArr.length; i++) {
            if (x < shopperArr[i].x + 50
                && x + playerRadius > shopperArr[i].x
                && y < shopperArr[i].y + 100
                && y + playerRadius > shopperArr[i].y) {
                score -= 2;
                document.getElementById("score").textContent = score;
                shopperArr.shift();
            }
        }

        //collision detection Corona
        for (i = 0; i < coronArr.length; i++) {
            if (x < coronArr[i].x + coronaRadius
                && x + playerRadius > coronArr[i].x
                && y < coronArr[i].y + coronaRadius
                && y + playerRadius > coronArr[i].y) {
                gameover = true;
            }
        }

        //check if aisle left the canvas and remove/ draw new
        for (i = 0; i < aisleArr.length; i++) {
            if (aisleArr[i].y > canvas.height) {
                aisleArr.shift();
                aisleArr.shift();
                var aisleNewLeft = new Object();
                aisleNewLeft.y = -200;
                aisleNewLeft.x = 0;
                var aisleNewRight = new Object();
                aisleNewRight.y = -200;
                aisleNewRight.x = canvas.width - 40;
                aisleArr.push(aisleNewLeft);
                aisleArr.push(aisleNewRight);
            }
        }

        //draws each aisle
        for (i = 0; i < aisleArr.length; i++) {
            aisleArr[i].y += speed;
            if (aisleArr[i].x == 0) {
                drawAisle(aisleLeftImg, aisleArr[i].x, aisleArr[i].y);
            }
            if (aisleArr[i].x == (canvas.width - 40)) {
                drawAisle(aisleRightImg, aisleArr[i].x, aisleArr[i].y);
            }
        }

        //draws new corona if empty
        if (coronArr.length == 0) {
            var coronaNew = new Object();
            coronaNew.x = 41 + Math.random() * (canvas.width - 111);
            coronaNew.y = -400;
            coronArr.push(coronaNew);
        }

        //checks for each Corona if is under canvas and removes from stack
        for (i = 0; i < coronArr.length; i++) {
            if (coronArr[i].y > canvas.height + 1500) {
                coronArr.shift();
            }
        }
        drawCorona();

        //draws new TP if empty
        if (tpArr.length == 0) {
            var tpNew = new Object();
            tpNew.tpx = 45 + Math.random() * (canvas.width - 115);
            tpNew.tpy = -40;
            tpArr.push(tpNew);
        }

        //checks for each TP if is under canvas and removes from stack
        for (i = 0; i < tpArr.length; i++) {
            if (tpArr[i].tpy > canvas.height) {
                tpArr.shift();
            }
        }
        drawTP();

        //draws new shopper if empty
        if (shopperArr.length == 0) {
            var shopperNew = new Object();
            shopperNew.x = 41 + Math.random() * (canvas.width - 111);
            shopperNew.y = -120;
            shopperArr.push(shopperNew);
        }



        

        //checks for each shopper if is under canvas and removes from stack
        for (i = 0; i < shopperArr.length; i++) {
            if (shopperArr[i].y > canvas.height) {
                shopperArr.shift();
            }
        }
        drawShopper();
        drawPlayer();



        //controls
        if (rightPressed) {
            dx = 1.5;
        }
        if (leftPressed) {
            dx = -1.5;
        }
        if (upPressed) {
            dy = -1.5;
        }
        if (downPressed) {
            dy = 1.8;
        }

        if (x + dx > canvas.width - 35 - playerRadius || x + dx < 35 + playerRadius) {
            dx = 0;
        }
        if (y + dy > canvas.height - playerRadius || y + dy < playerRadius) {
            dy = 0;
        }
        x += dx;
        y += dy;
        dx = 0;
        dy = 0;
    }
}

if (gameover == false) {
    setInterval(draw, 1);
}

// power ups and puddles = slow down
// speed
// timer
// # collisions
