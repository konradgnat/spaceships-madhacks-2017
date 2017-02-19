import RainbowText from '../objects/RainbowText';
let io = require('socket.io-client');


let shipProperties =  {
	maxVelocities: 400,
  drag: 80,
	acceleration: 10,
	angularAcceleration: 60,
  rotation: 60
};

class MainGame extends Phaser.State {

	preload() {
    this.game.load.image('triangle', 'images/triangle.png');
	}

	checkPlayerInput() {
    if (this.key_left.isDown) {
      this.myShip.body.angularVelocity += -shipProperties.angularAcceleration;
    } else if (this.key_right.isDown) {
      this.myShip.body.angularVelocity += shipProperties.angularAcceleration;
    } else {
      this.myShip.body.angularVelocity = 0;
    }

    if (this.key_up.isDown) {
      this.myShip.body.facing.y += shipProperties.acceleration; //.arcade.accelerationFromRotation(this.myShip.rotation, shipProperties.acceleration, this.myShip.body.acceleration);
    } else {
      this.myShip.body.acceleration.set(0);
    }
	}

	update() {
		this.checkPlayerInput();
	}

	sendUpdatesToServer() {
		this.socket.emit('send-player-state', {
			id: this.clientId,
      ...(this.myShip.body)
		})
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
    //this.key_thrust = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	}

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		// let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
		// text.anchor.set(0.5);


		this._speed = 150;
		this._updateSpeed = 500;

		this.socket = io('localhost:3002');

		this.socket.on('connect', () => {
      this.socket.emit('create-player')
		});

    this.socket.on('send-game-state', (state) => {
    	this.state = state;
    });

    this.socket.on('player-created', ({newClientId}) => {
    	this.clientId = newClientId;
      this.myShip = this.game.add.sprite(0,0,'triangle');
      this.myShip.scale.x = .1;
      this.myShip.scale.y = .1;

      this.initKeyboard();
      this.initPhysics();

      // Star the main loops
      this.game.time.events.loop(this._speed, this.update, this).timer.start();
      this.game.time.events.loop(this._updateSpeed, this.sendUpdatesToServer, this).timer.start();
    });



	}

}

export default MainGame;
