import RainbowText from '../objects/RainbowText';
let io = require('socket.io-client');


let shipProperties =  {
	maxVelocities: 400,
  drag: 80,
	acceleration: 10,
	angularAcceleration: 60,
  rotation: 60
};

let playerSprites = []
let id = null

class MainGame extends Phaser.State {

	preload() {
    this.game.load.image('triangle', 'images/triangle.png');

    // this.game.load.start();
	}

	checkPlayerInput() {
    if (this.key_left.isDown) {
      this.myShip.body.angularVelocity += -shipProperties.angularAcceleration;
    } else if (this.key_right.isDown) {
      this.myShip.body.angularVelocity += shipProperties.angularAcceleration;
    } else {
      this.myShip.body.angularVelocity = 0;
    }

    if (this.key_thrust.isDown) {
      this.myShip.body.velocity.y += shipProperties.acceleration; //.arcade.accelerationFromRotation(this.myShip.rotation, shipProperties.acceleration, this.myShip.body.acceleration);
    } else {
      this.myShip.body.acceleration.set(0);
    }
	}

	update() {
		this.checkPlayerInput();
		this.socket.emit('send-player-state', {
		  id: id,
      posX: this.myShip.body.position.x,
      posY: this.myShip.body.position.y,
      velX: this.myShip.body.velocity.x,
      velY: this.myShip.body.velocity.y
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
    this.key_thrust = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    //this.key_thrust = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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
      //console.log(state)
    	this.state = state;
      for(let i = 0; i < state.players.length; i++) {
        let foundPlayer = playerSprites.find((player) => {
          return player.id === state.players[i].id
        })
        console.log(foundPlayer)
        if (foundPlayer === undefined) {
          let newShip = this.game.add.sprite(0,0,'triangle');
          newShip.scale.x = .1;
          newShip.scale.y = .1;
          this.game.physics.enable(newShip, Phaser.Physics.ARCADE);
          playerSprites.push({id: state.players[i].id, sprite: newShip})
          console.log('new player connected')
        } else {
          let serverStateOfPlayer = state.players[i];
          console.log('updating...')
          console.log(serverStateOfPlayer)
          // set player state
          foundPlayer.sprite.body.position.x = serverStateOfPlayer.posX
          foundPlayer.sprite.body.position.y = serverStateOfPlayer.posY
          foundPlayer.sprite.body.velocity.x = serverStateOfPlayer.velX
          foundPlayer.sprite.body.velocity.y = serverStateOfPlayer.velY
        }
      }
    });

    this.socket.on('player-created', (player) => {
      id = player.id
    });



    this.game.time.events.loop(this._speed, this.update, this).timer.start();
	}

}

export default MainGame;
