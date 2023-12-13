const GameSoloRankedRender = (canvasRef, gameElement) => {
	if (!canvasRef.current) return;
	const cvs = canvasRef.current;
  
	const ctx = cvs.getContext('2d');
	if (!ctx) return;
  
	const leftPaddle = {
	  x: (gameElement.leftPaddlePosX * cvs.width) / 100,
	  y: (gameElement.leftPaddlePosY * cvs.height) / 100,
	  width: (gameElement.paddleWidth * cvs.width) / 100,
	  height: (gameElement.paddleHeight * cvs.height) / 100,
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
	  drawScore(gameElement.score, (2 * cvs.width) / 4, cvs.height / 5, 'WHITE');
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
	  gameElement.itemList.forEach((itemData) => {
		const item = {
			x: itemData.posX * cvs.width / 100,
			y: itemData.posY * cvs.height / 100,
			radius: itemData.radius * ((cvs.width + cvs.height) / 2) / 100,
		};
		drawBall(item.x, item.y, item.radius, 'PURPLE');
	});
	};
	const game = () => {
	  render();
	};
  
	game();
  };
  
  export default GameSoloRankedRender;
  