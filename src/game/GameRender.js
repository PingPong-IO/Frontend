const GameRender = (canvasRef, gameElement) => {
  if (!canvasRef.current) return;
  const cvs = canvasRef.current;

  const ctx = cvs.getContext('2d');
  if (!ctx) return;

  const net = {
    x: cvs.width / 2 - 1,
    y: 0,
    width: 2,
    height: 10,
    color: 'WHITE',
  };

  const leftPaddle = {
    x: (gameElement.leftPaddlePosX * cvs.width) / 100,
    y: (gameElement.leftPaddlePosY * cvs.height) / 100,
    width: (gameElement.paddleWidth * cvs.width) / 100,
    height: (gameElement.paddleHeight * cvs.height) / 100,
  };

  const rightPaddle = {
    x: (gameElement.rightPaddlePosX * cvs.width) / 100,
    y: (gameElement.rightPaddlePosY * cvs.height) / 100,
    width: (gameElement.paddleWidth * cvs.width) / 100,
    height: (gameElement.paddleHeight * cvs.height) / 100,
  };

  const ball = {
    x: (gameElement.ballPosX * cvs.width) / 100,
    y: (gameElement.ballPosY * cvs.height) / 100,
    radius: (gameElement.ballRadius * ((cvs.width + cvs.height) / 2)) / 100,
  };

  const drawPaddle = (x, y, width, height, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  };

  const drawScore = (score, x, y, color) => {
    ctx.fillStyle = color;
    ctx.font = '45px Arial';
    ctx.fillText(score.toString(), x, y);
  };

  const drawNet = () => {
    for (let i = 0; i < cvs.height; i += 15) {
      drawPaddle(net.x, net.y + i, net.width, net.height, net.color);
    }
  };

  const drawBall = (x, y, radius, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  };

  const render = () => {
    drawPaddle(0, 0, cvs.width, cvs.height, 'BLACK');
    drawScore(gameElement.leftScore, cvs.width / 4, cvs.height / 5, 'WHITE');
    drawScore(
      gameElement.rightScore,
      (3 * cvs.width) / 4,
      cvs.height / 5,
      'WHITE',
    );
    drawNet();
    drawPaddle(
      leftPaddle.x,
      leftPaddle.y,
      leftPaddle.width,
      leftPaddle.height,
      'WHITE',
    );
    drawPaddle(
      rightPaddle.x,
      rightPaddle.y,
      rightPaddle.width,
      rightPaddle.height,
      'WHITE',
    );
    drawBall(ball.x, ball.y, ball.radius, 'WHITE');
  };
  const game = () => {
    render();
  };

  game();
};

export default GameRender;
