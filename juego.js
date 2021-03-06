
	alto  = document.documentElement.clientHeight;
    ancho = document.documentElement.clientWidth;
	
	var game = new Phaser.Game(alto, ancho, Phaser.CANVAS,'PenaltyPong',{preload: preload, create: create, update: update});

	var paddle1;
	var paddle2;
	var ball;
	var puntuacion1;
	var puntuacion2;
	var introd1;
	var introd2;

	var ball_launched;
	var ball_velocity;
	app.iniciaJuego();

	function preload(){
		game.load.image('paddle','assets/paddle.png');
		game.load.image('ball','assets/ball.png');
		game.load.image('porteria','assets/porteria.png')
	}
	function create(){

		ball_launched = false;
		ball_velocity = 400;
		puntuacion1 = 0;
		puntuacion2 = 0;
		scoreText1 = game.add.text(16,16, puntuacion1,{fontSize: '100px',fill: '#757676'});
		scoreText2 = game.add.text(ancho-116,16, puntuacion2,{fontSize: '100px',fill: '#757676'});
		paddle1 = create_paddle(0,game.world.centerY);
		paddle2 = create_porteria(game.world.width-16,game.world.centerY);
		ball = create_ball(game.world.centerX,game.world.centerY);
		ball.x = game.world.centerX;
		ball.y = game.world.centerY;
		ball.body.velocity.setTo(150,150);
		
		tituloText1 = game.add.text(ancho/4,alto/3,introd1,{fontSize: '50px',fill: '#757676'});
		tituloText2 = game.add.text(ancho/4,(alto/3)+75,introd2,{fontSize: '25px',fill: '#757676'});
		introd1 = "Penalty Pong";
		introd2 = "by Amartinb, 2017. Haz tap para empezar";
		tituloText1.text = introd1;
		tituloText2.text = introd2; 

		game.input.onDown.add(launch_ball,this);
	}
	function update(){
		control_paddle(paddle1,game.input.y);
		game.physics.arcade.collide(paddle1,ball,hit1);
		game.physics.arcade.collide(paddle2,ball,hit2);
		if(ball.body.blocked.left){
			console.log('Player 1 no llega!');
			puntuacion2 = puntuacion2 +1;
			scoreText2.text = puntuacion2;
		}	
		else if(ball.body.blocked.right){
			console.log('Player 1 falla!');
			puntuacion1 = puntuacion1 -1;
			scoreText1.text = puntuacion1;
		}	
	}
	function create_paddle(x,y){
		var paddle = game.add.sprite(x,y,'paddle');
		paddle.anchor.setTo(0.5,0.5);
		game.physics.arcade.enable(paddle);
		paddle.body.collideWorldBounds = true;
		paddle.body.inmovable = true;

		return paddle;
	}
		function create_porteria(x,y){
		var paddle = game.add.sprite(x,y,'porteria');
		paddle.anchor.setTo(0.5,0.5);
		game.physics.arcade.enable(paddle);
		paddle.body.collideWorldBounds = true;
		paddle.body.inmovable = true;

		return paddle;
	}
	function control_paddle(paddle,y){
		paddle.y = y;

		if(paddle.y < paddle.height / 2){
			paddle.y = paddle.height /2;
		} else if (paddle.y > game.world.height - paddle.height /2){
			paddle.y = game.world.height - paddle.height /2;
		}
	}
	function create_ball(x,y){
		var ball = game.add.sprite(x,y,'ball');
		ball.anchor.setTo(0.5,0.5);
		game.physics.arcade.enable(ball),
		ball.body.collideWorldBounds = true;
		ball.body.bounce.setTo(1,1);

		return ball;
	}
	function launch_ball(){
		tituloText1.text = "";
		tituloText2.text = "";
		if(ball_launched){
			ball.x = game.world.centerX;
			ball.y = game.world.centerY;
			ball.body.velocity.setTo(150,150);
			ball_launched = false;
			ball_velocity = 400;
			puntuacion1 = 0;
			puntuacion2 = 0;
			scoreText1.text = puntuacion1;
			scoreText2.text = puntuacion2;
		} else{
			ball.x = game.world.centerX;
			ball.y = game.world.centerY;
			ball.body.velocity.x = -ball.velocity;
			ball.body.velocity.y = ball.velocity;
			ball_launched = true;
		}
	}
	function hit1(){
		console.log('Rebota en paddle1!');
		console.log(ball_velocity);
		ball.body.velocity.x = ball_velocity;
		ball_velocity += 25;
		if(ball.body.velocity.y == 0){
			ball.body.velocity.y = -10;
		}
	}
	function hit2(){
		console.log('Portería: Gol!');
		console.log(ball_velocity);
		puntuacion1 = puntuacion1 +2;
		scoreText1.text = puntuacion1;
		ball.body.velocity.x = -ball_velocity;
		ball_velocity += 50;
	}
}

