const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bird = { x: 50, y: 300, width: 30, height: 30, velocity: 0 };
let gravity = 0.6;
let jump = -10;

let obstacles = [];
let frame = 0;
let gameOver = false;

function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawObstacles() {
  ctx.fillStyle = "green";
  obstacles.forEach(ob => {
    ctx.fillRect(ob.x, 0, ob.width, ob.top);
    ctx.fillRect(ob.x, ob.bottomY, ob.width, canvas.height - ob.bottomY);
  });
}

function updateObstacles() {
  if(frame % 100 === 0) {
    let top = Math.random() * 200 + 50;
    let gap = 150;
    obstacles.push({x: canvas.width, width: 50, top: top, bottomY: top + gap});
  }

  obstacles.forEach(ob => {
    ob.x -= 2;
  });

  obstacles = obstacles.filter(ob => ob.x + ob.width > 0);
}

function checkCollision() {
  for(let ob of obstacles) {
    if(
      bird.x < ob.x + ob.width &&
      bird.x + bird.width > ob.x &&
      (bird.y < ob.top || bird.y + bird.height > ob.bottomY)
    ) {
      triggerQuiz();
    }
  }

  if(bird.y + bird.height > canvas.height || bird.y < 0) {
    triggerQuiz();
  }
}

function triggerQuiz() {
  gameOver = true;
  document.getElementById("quiz").classList.remove("hidden");
}

function checkAnswer() {
  const answer = document.getElementById("answer").value;
  const result = document.getElementById("result");

  if(answer === "4") {
    result.textContent = "Rätt! 🎉 Spela igen!";
    result.style.color = "green";
    resetGame();
  } else {
    result.textContent = "Fel! ❌ Försök igen";
    result.style.color = "red";
  }
}

function resetGame() {
  bird.y = 300;
  bird.velocity = 0;
  obstacles = [];
  frame = 0;
  gameOver = false;
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("answer").value = "";
}

function gameLoop() {
  ctx.clearRect(0,0,canvas.width, canvas.height);

  if(!gameOver) {
    bird.velocity += gravity;
    bird.y += bird.velocity;

    updateObstacles();
    drawBird();
    drawObstacles();
    checkCollision();
    frame++;
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if(e.code === "Space") bird.velocity = jump;
});

gameLoop();
