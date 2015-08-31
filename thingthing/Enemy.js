function Enemy(x,y)
{
	//this.x = 400;
	//this.y = 548;
	this.x = x;
	this.y = y;
	this.gunDisX = 30;
	this.gunDisY = 20; 
	this.tempX = this.x;
	this.velocityX = 0;
	this.velocityY = 0;
	this.size1 = 1;
	this.turn = false;
	this.enemyAlive = true;
	this.enemy1 = new Image();
	this.enemy1.src = 'coin.png';
	this.timer = 10;
}


Enemy.prototype.drawObject = function()
{
	//game.ctx.drawImage(run,this.x ,this.y);
	game.ctx.drawImage(this.enemy1, this.size1, 0,60, 50, this.x, this.y, 60, 50);
	//game.ctx.drawImage(run, 170, 0,150, 300, this.x, this.y, 100, 200);
}

Enemy.prototype.checkCollision = function (player){		

}

Enemy.prototype.update = function (){
	if(this.size1 > 420)
	{
		this.size1 = 1;
	}
}

