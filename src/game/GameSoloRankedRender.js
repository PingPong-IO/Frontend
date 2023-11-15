const GameSoloRankedRender = (canvasRef, gameElement) => {
	if (!canvasRef.current) return;
	const cvs = canvasRef.current;
  
	const ctx = cvs.getContext('2d');
	if (!ctx) return;
  
	const leftPaddle = {
	  x: (gameElement.paddleList[0].posX * cvs.width) / 100,
	  y: (gameElement.paddleList[0].posY * cvs.height) / 100,
	  width: (gameElement.paddleList[0].width * cvs.width) / 100,
	  height: (gameElement.paddleList[0].height * cvs.height) / 100,
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
  
	const drawBall = (x, y, radius, color) => {
	  ctx.fillStyle = color;
	  ctx.beginPath();
	  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
	  ctx.closePath();
	  ctx.fill();
	};
  
	const render = () => {
	  drawPaddle(0, 0, cvs.width, cvs.height, 'BLACK');
	  drawScore(gameElement.score, cvs.width / 4, cvs.height / 5, 'WHITE');
	  drawPaddle(
		leftPaddle.x,
		leftPaddle.y,
		leftPaddle.width,
		leftPaddle.height,
		'WHITE',
	  );
	  gameElement.ballList.forEach((ballData) => {
		const ball = {
			x: ballData.posX * cvs.width / 100,
			y: ballData.posY * cvs.height / 100,
			radius: ballData.radius * ((cvs.width + cvs.height) / 2) / 100,
		};
		drawBall(ball.x, ball.y, ball.radius, 'WHITE');
	  });
	};
	const game = () => {
	  render();
	};
  
	game();
  };
  
  export default GameSoloRankedRender;
  