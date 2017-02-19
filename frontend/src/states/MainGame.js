import RainbowText from '../objects/RainbowText';
let io = require('socket.io-client');


let shipProperties =  {
	maxVelocities: 90,
  drag: 30,
	acceleration: 100
};

class MainGame extends Phaser.State {

	preload() {
    this.game.load.image('triangle', 'images/triangle.png');

    // this.game.load.start();
	}

	checkPlayerInput() {
		if (this.key_left.isDown) {
			this.myShip.body.velocity.x -= shipProperties.acceleration;
		} if (this.key_right.isDown) {
      this.myShip.body.velocity.x += shipProperties.acceleration;
		} if (this.key_up.isDown) {
      this.myShip.body.velocity.y -= shipProperties.acceleration;
		} if (this.key_down.isDown) {
      this.myShip.body.velocity.y += shipProperties.acceleration;
    }
	}

	update() {
		this.checkPlayerInput();
	}

	initPhysics() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.enable(this.myShip, Phaser.Physics.ARCADE);
    this.myShip.body.drag.set(shipProperties.drag);
    this.myShip.body.maxVelocity.set(shipProperties.maxVelocities);
  }

	initKeyboard() {
		this.key_left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.key_right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.key_up = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.key_down = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
	}

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		// let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
		// text.anchor.set(0.5);

    this.myShip = this.game.add.sprite(0,0,'triangle');
    this.myShip.scale.x = .1;
    this.myShip.scale.y = .1;

		this.initKeyboard();
		this.initPhysics();

		this._speed = 150;

		this.socket = io('localhost:3002');

		this.socket.on('connect', () => {
			console.log('connected');
      this.socket.emit('create-player')
		});

    this.socket.on('send-game-state', (state) => {
    	this.state = state;
      // console.log(state);
    });

    this.socket.on('player-created', (player) => {
      // console.log(player);
    });



    this.game.time.events.loop(this._speed, this.update, this).timer.start();
	}

}

export default MainGame;
