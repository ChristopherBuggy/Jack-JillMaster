function Player()
{
	this.x = 145;
	this.y = 548;
	this.tempY = 0;
	this.velocityX = 0;
	this.velocityY = 0;
	this.size1 = 1;
	this.gunDisX = 30;
	this.gunDisY = 20;
	this.hudX = 10;
	this.hudy = 157;
	this.hasJumped = false;
	this.hudsize = 0;
	this.health = 1;
	this.score = 0;
	this.noOfKills = 0;
	this.ammo = 100;
	this.lastUpdate = Date.now();
}
//<audio src="BackgroundSound.mp3" preload="auto" autoplay></audio>

Player.prototype.drawObject = function(run,gun)
{
	//game.ctx.drawImage(run,this.x ,this.y);
	game.ctx.drawImage(run, this.size1, 0,60, 50, this.x, this.y, 60, 50);
	//game.ctx.drawImage(run, 170, 0,150, 300, this.x, this.y, 100, 200);
	game.ctx.drawImage(gun,this.x + this.gunDisX ,this.y + this.gunDisY);
	game.ctx.drawImage(hud,this.hudsize ,0,157,47,45,this.hudX,this.hudy,47);
	game.ctx.font = "15px Arial";
	game.ctx.fillStyle = "red";
	game.ctx.fillText(this.noOfKills,137,38.5);
	game.ctx.fillText(this.ammo,56,38);
	game.ctx.font = "10px Arial";
	game.ctx.fillStyle = "red";
	game.ctx.fillText('Score: ',100,53);
	game.ctx.fillText(this.score,135,53);
}

Player.prototype.checkCollision = function (Enemy){	
	//do the two bounding boxes overlap?
	if ((this.x < Enemy.x + 60) &&
	(this.x + 25  > Enemy.x) &&
	(this.y + 25  > Enemy.y) &&
	(this.y < Enemy.y + 50) )
	{		
		this.hudsize = this.hudsize +157;
		this.x = 150;	
		this.score += 100;
		this.health--;
		console.log('enemycollision');	
	}	
}

Player.prototype.update = function (){
	this.y += this.velocityY;
	if(this.y > 548)
	{
		this.y = 548;
		this.velocityY = 0;
		this.hasJumped = false;
	}
	if(this.hudsize > 471)
	{
		this.hudsize = 471;
		this.health = 0;
	}
	if(this.x <35)
	{
		this.x = 35;
	}
	if(this.x > 887)
	{
		this.x = 887;
	}
	this.y = this.y + this.velocityY;
	var now = Date.now();
	var time = now - this.lastUpdate;
	if(this.size1 > 420)
	{
		this.size1 = 1;
	}
	if(this.hasJumped == true)
	{
		//var i = 1;
		//console.log('is jumping');
		//this.tempY = this.y;
		//this.velocityY = 3;
		this.velocityY = this.velocityY + 13.5*(1/60);
		this.y = this.y + this.velocityY;
	}
	/*if(this.velocityY > 0 && this.y > 435)
	{
		if(this.x > 255 && this.x < 805)
		{
			if(this.hasJumped == true)
			{
				this.y = 435;
				this.velocityY = 0;
			}
		}
	}*/

	//if(this.tempY >= this.tempY + 100)
	//{
		//this.hasJumped= false;
	//}
}

Player.prototype.moveRight = function()
{
	this.x = this.x + 2;
	this.size1 = this.size1 + 60;
	this.gunDisX = 30;
	this.gunDisY = 20;
}
Player.prototype.moveLeft = function()
{
	this.x =this.x -2;
	this.size1 = this.size1 + 60;
	this.gunDisX = -3;
	this.gunDisY = 20;
}
Player.prototype.moveUp = function()
{
	this.velocityY = -5;
	this.hasJumped = true;
}
Player.prototype.moveDown = function()
{
	this.y =this.y + 5;
}
