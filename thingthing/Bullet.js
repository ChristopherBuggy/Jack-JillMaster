var bleft = false;
var bright = false;
var fired = false;
var bullet = new Image();
bullet.src = 'bullet.png'; // Set source path
function Bullet(x,y)
{
	this.posX;
	this.posY;
	this.bPosX = 100;
	this.bPosY = 30;
	this.isAlive = true;
	this.velocityX = 10;
}


Bullet.prototype.drawObject = function()
{
	game.ctx.drawImage(bullet,this.posX,this.posY);
}

Bullet.prototype.update = function (){
	/*if(bleft == true)
	{
		this.bPosX = -100;
		this.bPosY = 30;
	}

	if(bright == true)
	{
		this.bPosX = 100;
		this.bPosY = 30;
	}*/
}


Bullet.prototype.checkCollision = function (Enemy){
	var collides=false;		
	//do the two bounding boxes overlap?
	if ((this.posX < Enemy.x + 60) &&
	(this.posX + 16  > Enemy.x) &&
	(this.posY + 16  > Enemy.y) &&
	(this.posY < Enemy.y + 50) )
	{			
			this.isAlive = false;
			player.score +=10;	
			player.noOfKills +=1;
			Enemy.enemyAlive = false;
			Enemy.x = 100000;
			Enemy.y =100000;
		//console.log('collision');	
	}
}

Bullet.prototype.fireRight = function()
{
	this.posX = this.posX + 10;
}
Bullet.prototype.fireLeft = function()
{
	this.posX = this.posX - 10;
}
