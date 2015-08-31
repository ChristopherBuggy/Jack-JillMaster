function Platform(x,y)
{
	this.posX = x;
	this.posY = y;
	this.platform1 = new Image();
	this.platform1.src = 'platform1.png';
	this.platformSize = 1;
}


Platform.prototype.drawObject = function()
{
	if(this.platformSize == 1)
	{
		game.ctx.drawImage(this.platform1,0,0,123,46,this.posX,this.posY,123,46);
	}
	if(this.platformSize == 2)
	{
		game.ctx.drawImage(this.platform1,0,0,123,46,this.posX,this.posY,123,46);
	}
}

Platform.prototype.update = function (){
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
