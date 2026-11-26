(() => {
  'use strict';

  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  const playerScoreElement = document.getElementById('player-score');
  const computerScoreElement = document.getElementById('computer-score');
  const announcement = document.getElementById('announcement');
  const status = document.getElementById('match-status');
  const resetButton = document.getElementById('reset-button');

  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  const PADDLE_WIDTH = 12;
  const PADDLE_HEIGHT = 92;
  const BALL_RADIUS = 9;
  const WIN_SCORE = 5;
  const player = { x: 28, y: HEIGHT / 2 - PADDLE_HEIGHT / 2, speed: 480 };
  const computer = { x: WIDTH - 28 - PADDLE_WIDTH, y: HEIGHT / 2 - PADDLE_HEIGHT / 2, speed: 365 };
  const ball = { x: WIDTH / 2, y: HEIGHT / 2, vx: 340, vy: 150 };
  const keys = new Set();
  let playerScore = 0;
  let computerScore = 0;
  let running = true;
  let gameOver = false;
  let lastTime = 0;
  let pointMessageTimer = 0;

  function clampPaddle(paddle) {
    paddle.y = Math.max(0, Math.min(HEIGHT - PADDLE_HEIGHT, paddle.y));
  }

  function resetBall(direction) {
    ball.x = WIDTH / 2;
    ball.y = HEIGHT / 2;
    const speed = 340;
    const angle = (Math.random() * 0.6 - 0.3);
    ball.vx = Math.cos(angle) * speed * direction;
    ball.vy = Math.sin(angle) * speed;
  }

  function showMessage(message, duration = 1.2) {
    announcement.textContent = message;
    announcement.classList.remove('is-hidden');
    pointMessageTimer = duration;
  }

  function scorePoint(who) {
    if (who === 'player') {
      playerScore += 1;
      playerScoreElement.textContent = playerScore;
    } else {
      computerScore += 1;
      computerScoreElement.textContent = computerScore;
    }

    if (playerScore >= WIN_SCORE || computerScore >= WIN_SCORE) {
      gameOver = true;
      running = false;
      const playerWon = playerScore > computerScore;
      showMessage(playerWon ? 'You win! 🎉' : 'Computer wins!', 999999);
      status.textContent = playerWon ? 'Nice game — start a new one to play again' : 'Try again — start a new game';
      return;
    }

    resetBall(who === 'player' ? -1 : 1);
    showMessage(who === 'player' ? 'Point for you!' : 'Point for computer');
  }

  function collideWithPaddle(paddle, direction) {
    const overlaps = ball.x - BALL_RADIUS < paddle.x + PADDLE_WIDTH &&
      ball.x + BALL_RADIUS > paddle.x &&
      ball.y + BALL_RADIUS > paddle.y &&
      ball.y - BALL_RADIUS < paddle.y + PADDLE_HEIGHT;

    if (!overlaps || ball.vx * direction >= 0) return;

    const paddleCenter = paddle.y + PADDLE_HEIGHT / 2;
    const hitOffset = (ball.y - paddleCenter) / (PADDLE_HEIGHT / 2);
    const angle = hitOffset * (Math.PI / 3);
    const speed = Math.min(Math.hypot(ball.vx, ball.vy) * 1.045, 720);
    ball.vx = Math.cos(angle) * speed * direction;
    ball.vy = Math.sin(angle) * speed;
    ball.x = direction > 0 ? paddle.x + PADDLE_WIDTH + BALL_RADIUS : paddle.x - BALL_RADIUS;
  }

  function update(dt) {
    if (!running) return;

    if (keys.has('ArrowUp')) player.y -= player.speed * dt;
    if (keys.has('ArrowDown')) player.y += player.speed * dt;
    clampPaddle(player);

    const computerTarget = ball.y - PADDLE_HEIGHT / 2;
    const difference = computerTarget - computer.y;
    computer.y += Math.sign(difference) * Math.min(Math.abs(difference), computer.speed * dt);
    clampPaddle(computer);

    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;

    if (ball.y - BALL_RADIUS <= 0) {
      ball.y = BALL_RADIUS;
      ball.vy = Math.abs(ball.vy);
    } else if (ball.y + BALL_RADIUS >= HEIGHT) {
      ball.y = HEIGHT - BALL_RADIUS;
      ball.vy = -Math.abs(ball.vy);
    }

    collideWithPaddle(player, 1);
    collideWithPaddle(computer, -1);

    if (ball.x + BALL_RADIUS < 0) scorePoint('computer');
    else if (ball.x - BALL_RADIUS > WIDTH) scorePoint('player');
  }

  function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = '#111d2c';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.setLineDash([8, 12]);
    ctx.strokeStyle = '#3a4b60';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(WIDTH / 2, 0);
    ctx.lineTo(WIDTH / 2, HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#80f0c0';
    ctx.shadowColor = '#80f0c0';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.roundRect(player.x, player.y, PADDLE_WIDTH, PADDLE_HEIGHT, 6);
    ctx.fill();

    ctx.fillStyle = '#f0ad79';
    ctx.shadowColor = '#f0ad79';
    ctx.beginPath();
    ctx.roundRect(computer.x, computer.y, PADDLE_WIDTH, PADDLE_HEIGHT, 6);
    ctx.fill();

    ctx.fillStyle = '#f5f7fa';
    ctx.shadowColor = '#f5f7fa';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  function frame(timestamp) {
    const dt = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.03) : 0;
    lastTime = timestamp;
    if (pointMessageTimer > 0 && !gameOver) {
      pointMessageTimer -= dt;
      if (pointMessageTimer <= 0) announcement.classList.add('is-hidden');
    }
    update(dt);
    draw();
    requestAnimationFrame(frame);
  }

  function movePlayerToPointer(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleY = HEIGHT / rect.height;
    player.y = (event.clientY - rect.top) * scaleY - PADDLE_HEIGHT / 2;
    clampPaddle(player);
  }

  canvas.addEventListener('pointermove', movePlayerToPointer);
  canvas.addEventListener('pointerdown', (event) => {
    canvas.setPointerCapture?.(event.pointerId);
    movePlayerToPointer(event);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      keys.add(event.key);
    }
  });
  window.addEventListener('keyup', (event) => keys.delete(event.key));
  window.addEventListener('blur', () => keys.clear());

  resetButton.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = '0';
    computerScoreElement.textContent = '0';
    player.y = HEIGHT / 2 - PADDLE_HEIGHT / 2;
    computer.y = HEIGHT / 2 - PADDLE_HEIGHT / 2;
    gameOver = false;
    running = true;
    status.textContent = `First to ${WIN_SCORE} points`;
    resetBall(Math.random() < 0.5 ? -1 : 1);
    showMessage(`First to ${WIN_SCORE} wins`);
  });

  resetBall(Math.random() < 0.5 ? -1 : 1);
  showMessage(`First to ${WIN_SCORE} wins`, 2.2);
  requestAnimationFrame(frame);
})();
