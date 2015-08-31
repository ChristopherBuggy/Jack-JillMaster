touchable = 'createTouch' in document; 
var game;
var run = new Image();   // Create new img element
var gun = new Image();
var player = new Player();
var coins = [];
var jump = false;
var fire = false;
var bullets = [];
//var bullet1 = new Bullet();
var platforms = [];
var moveLeft = false;
var moveRight = false;
var enemyIm = new Image();
var hud = new Image();
var stop = true;
var soundLoaded = false;
var audio = new Audio('BackgroundSound.mp3');
var blocks = new Block();
var movePlayer = false;
var bulletNo= 0;
var score = 1001;
//touchable = 'createTouch' in document,

function Game()
{
	this.screenWidth = window.innerWidth;
	this.screenheight = window.innerHeight;
}

Game.prototype.initCanvas = function()
{
	//create canvas element
	var canvas = document.createElement("canvas");

	//create a 2d context for drawing
	this.ctx = canvas.getContext('2d');

	//add the canvas to html body
	document.body.appendChild(canvas);
	
	canvas.width = this.screenWidth;
	canvas.height = this.screenheight;
}

Game.prototype.draw = function()
{
	game.ctx.font = "175px Arial";
	game.ctx.fillStyle = "red";
	game.ctx.fillText('Game Over',35,350);
	//game.ctx.drawImage(run, this.size1, 0,60, 50, this.x, this.y, 60, 50);
}

Game.prototype.gameLoop = function()
{
	if(player.health > 0)
	{
		game.ctx.clearRect(0,0,1300,1300);
		//game.draw();
		player.drawObject(run,gun);
		blocks.drawObject();
		for(i=0;i<7;i++)
		{
			platforms[i].drawObject();
		}
		player.update();

		
			for(s=0;s<3;s++)
			{
				if(coins[s].enemyAlive == true)
				{
					coins[s].update();
					coins[s].drawObject();
					player.checkCollision(coins[s]);
					coins[s].checkCollision(player);
				}
			}

			for(i = 3;i<7;i++)
			{
				if(coins[i].enemyAlive == true)
				{
					coins[i].drawObject();
					player.checkCollision(coins[i]);
				}
			}

		if(jump == true && player.timer>0)
		{	
			player.moveUp();
		}
	
		if(moveRight == true)
		{
			player.moveRight();
			run.src = 'player.png'; 
		}
		if(moveLeft == true)
		{
			player.moveLeft();
			run.src = 'player.png'; 
		}
	}
	else
	{
		game.draw();
	}
	window.requestAnimationFrame(game.gameLoop);
}

function main()
{	
	game = new Game();
	audio.loop = true;
	audio.volume = 0.2;
	//audio.play();
	platforms[0] = new Platform(225,485);
	platforms[1] = new Platform(30,375);
	platforms[2] = new Platform(750,375);
	platforms[3] = new Platform(30,125);
	platforms[4] = new Platform(750,125);
	platforms[5] = new Platform(218,250);
	platforms[6] = new Platform(350,375);

	platforms[1].platformSize = 2;
	platforms[3].platformSize = 2;
	platforms[2].platformSize = 2;
	platforms[4].platformSize = 2;
	platforms[6].platformSize = 2;

	coins[0] = new Enemy(400,548);
	coins[1] = new Enemy(325,435);
	coins[2] = new Enemy(318,201);
	coins[3] = new Enemy(50,325);
	coins[4] = new Enemy(50,75);
	coins[5] = new Enemy(860,75);
	coins[6] = new Enemy(860,325);
    
	run.src = 'player.png'; // Set player source path
	enemyIm.src = 'player.PNG'; //coin
	game.initCanvas();
	document.addEventListener('keydown',move);
	var src = document.getElementById("controller");
	rightC.style.position = "absolute";
	rightC.style.left = "105px";
	rightC.style.top = "530px";
	leftC.style.position = "absolute";
	leftC.style.left = "45px";
	leftC.style.top = "530px";
	upC.style.position = "absolute";
	upC.style.left = "75px";
	upC.style.top = "495px";
	downC.style.position = "absolute";
	downC.style.left = "75px";
	downC.style.top = "560px";
	Abutton.style.position = "absolute";
	Abutton.style.left = "850px";
	Abutton.style.top = "530px";
	Bbutton.style.position = "absolute";
	Bbutton.style.left = "895px";
	Bbutton.style.top = "555px";
 	rightC.addEventListener( 'touchstart', movePlayerRight, false );
 	leftC.addEventListener( 'touchstart', movePlayerLeft, false );
 	rightC.addEventListener( 'touchend', endPlayerRight, false );
 	leftC.addEventListener( 'touchend', endPlayerLeft, false );
 	Abutton.addEventListener( 'touchstart', playerJump, false );
	game.gameLoop();
}


function movePlayerRight(e) {
     	e.preventDefault();
     	moveRight = true;
} 

function movePlayerLeft(e) {
     	e.preventDefault();
     	moveLeft = true;
} 
function endPlayerRight(e) {
     	e.preventDefault();
     	moveRight = false;
}
function endPlayerLeft(e) {
     	e.preventDefault();
     	moveLeft = false;
}
function playerJump(e) {
     	e.preventDefault();
     	player.moveUp();
		jump = true;
}


function move(e)
{
	if(e.keyCode == 38)
	{
		if(player.hasJumped == false)
		{
			player.moveUp();
			//player.velocityY = 5;
			jump = true;
			console.log('keydown*' +'' +  e.keyCode);
		}
	}
	else if(e.keyCode == 36)
	{
		player.moveDown();
	}
	else if(e.keyCode == 39)
	{
		player.moveRight();
		run.src = 'player.png'; 
	}
	else if(e.keyCode == 37)
	{
		player.moveLeft();
		bullets[bulletNo].bright = false;
		bullets[bulletNo].bleft = true;
		run.src = 'playerML.png'; 
	}
	else
	{
		player.size1 = 0;
	}
}
/*helper function*/
function clamp(value, min, max) { 
	if(max<min) { 
		var temp = min; 
		min = max; 
		max = temp; 
	}
	return Math.max(min, Math.min(value, max)); 
};