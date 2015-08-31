function Block()
{
	this.yPos = 0;
	this.platform1 = new Image();
	this.floor = new Image();
	this.platform1.src = 'block.png';
	this.floor.src = 'platform.png';
}


Block.prototype.drawObject = function()
{
		game.ctx.drawImage(this.platform1,-34,0);
		game.ctx.drawImage(this.platform1,-34,68);
		game.ctx.drawImage(this.platform1,-34,136);
		game.ctx.drawImage(this.platform1,-34,204);
		game.ctx.drawImage(this.platform1,-34,272);
		game.ctx.drawImage(this.platform1,-34,340);
		game.ctx.drawImage(this.platform1,-34,408);
		game.ctx.drawImage(this.platform1,-34,476);
		game.ctx.drawImage(this.platform1,-34,544);

		game.ctx.drawImage(this.platform1,950,0);
		game.ctx.drawImage(this.platform1,950,68);
		game.ctx.drawImage(this.platform1,950,136);
		game.ctx.drawImage(this.platform1,950,204);
		game.ctx.drawImage(this.platform1,950,272);
		game.ctx.drawImage(this.platform1,950,340);
		game.ctx.drawImage(this.platform1,950,408);
		game.ctx.drawImage(this.platform1,950,476);
		game.ctx.drawImage(this.platform1,950,544);

		game.ctx.drawImage(this.floor,0,0,460,12,30,598,920,12);
		//game.ctx.drawImage(run, this.size1, 0,60, 50, this.x, this.y, 60, 50);
}

Block.prototype.update = function (){
}


/*Player.prototype.checkCollision = function (Paddle){
	/*var collides=false;		
	//do the two bounding boxes overlap?
	if ((this.x < Paddle.x + Paddle.paddleW) &&
	(this.x + this.radius  > Paddle.x) &&
	(this.y + this.radius  > Paddle.y) &&
	(this.y < Paddle.y + Paddle.paddleH) )
	{				
		this.velocityX=this.velocityX*-1;		
	}
}*/
