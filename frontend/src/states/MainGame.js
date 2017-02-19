import RainbowText from '../objects/RainbowText';
let io = require('socket.io-client');


let shipProperties =  {
	maxVelocities: 400,
  maxAngular: 100,
  drag: 80,
	acceleration: 150,
	angularAcceleration: 15,
  rotation: 60
};

var bulletProperties = {
  speed: 400,
  interval: 250,
  lifeSpan: 2000,
  maxCount: 30,
}


let playerSprites = []
let id = null
let k = 0;

class MainGame extends Phaser.State {

	preload() {
    this.bulletInterval = 0;
    this.game.load.image('triangle', 'images/triangle.png');
    this.game.load.image('bullet', 'images/bullet.png');

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
      this.game.physics.arcade.accelerationFromRotation(this.myShip.rotation, shipProperties.acceleration, this.myShip.body.acceleration);
    } else {
      this.myShip.body.acceleration.set(0);
    }

    if (this.key_fire.isDown) {
      this.fire(this.myShip, this.myBulletGroup);
      this.socket.emit('my-bullet-fired', {id: id})
    }
	}

  checkBoundaries(sprite) {
    if (sprite.x < 0) {
      sprite.x = this.game.width;
    } else if (sprite.x > this.game.width) {
      sprite.x = 0;
    }

    if (sprite.y < 0) {
      sprite.y = this.game.height;
    } else if (sprite.y > this.game.height) {
      sprite.y = 0;
    }
  }

	update() {
	  //console.log(playerSprites)
    //console.log(this.state)
		this.checkPlayerInput();
		//console.log(this.myShip.body.rotation)
		this.socket.emit('send-player-state', {
		  id: id,
      posX: this.myShip.body.position.x,
      posY: this.myShip.body.position.y,
      velX: this.myShip.body.velocity.x,
      velY: this.myShip.body.velocity.y,
      orientation: this.myShip.body.rotation
    })
    for (let i = 0; i < playerSprites.length; i++) {
      this.checkBoundaries(playerSprites[i].sprite);
    }
    this.game.physics.arcade.overlap(this.myShip, this.bulletGroup, () => {
      this.myShip.position.x = 0
      this.myShip.position.y = 0
      this.myShip.body.velocity.x = 0
      this.myShip.body.velocity.y = 0
      this.myShip.angle = 0
    })
  }

  fire(sprite, bulletGroup) {
    if (this.game.time.now > this.bulletInterval) {
      var bullet = bulletGroup.getFirstExists(false);
      bullet.scale.x = 0.01
      bullet.scale.y = 0.01
      if (bullet) {
        var length = sprite.width * 0.5;
        var x = sprite.x + (Math.cos(sprite.rotation) * length);
        var y = sprite.y + (Math.sin(sprite.rotation) * length);

        bullet.reset(x, y);
        bullet.lifespan = bulletProperties.lifeSpan;
        bullet.rotation = sprite.rotation;

        this.game.physics.arcade.velocityFromRotation(sprite.rotation, bulletProperties.speed, bullet.body.velocity);
        this.bulletInterval = this.game.time.now + bulletProperties.interval;
      }
    }
  }

	initPhysics() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.enable(this.myShip, Phaser.Physics.ARCADE);
    this.myShip.body.drag.set(shipProperties.drag);
    this.myShip.body.maxVelocity.set(shipProperties.maxVelocities);
    this.myShip.body.maxAngular = shipProperties.maxAngular

    this.myBulletGroup = this.game.add.group();
    this.myBulletGroup.enableBody = true;
    this.myBulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
    this.myBulletGroup.createMultiple(bulletProperties.maxCount, 'bullet');
    this.myBulletGroup.setAll('anchor.x', 0.5);
    this.myBulletGroup.setAll('anchor.y', 0.5);
    this.myBulletGroup.setAll('lifespan', bulletProperties.lifeSpan);

    this.bulletGroup = this.game.add.group();
    this.bulletGroup.enableBody = true;
    this.bulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
    this.bulletGroup.createMultiple(bulletProperties.maxCount, 'bullet');
    this.bulletGroup.setAll('anchor.x', 0.5);
    this.bulletGroup.setAll('anchor.y', 0.5);
    this.bulletGroup.setAll('lifespan', bulletProperties.lifeSpan);
  }

	initKeyboard() {
		this.key_left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.key_right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.key_thrust = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.key_fire = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	}

	create() {
    let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		// let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");

    this.myShip = this.game.add.sprite(0,0,'triangle');
    this.myShip.anchor.set(0.5);
    this.myShip.scale.x = .1;
    this.myShip.scale.y = .1;

		this.initKeyboard();
		this.initPhysics();

		this._speed = 100;

		let host = process.env.SERVER_HOSTNAME
    let port = process.env.SERVER_PORT
    this.socket = io(host + ':' + port);

		this.socket.on('connect', () => {
			console.log('connected');
      this.socket.emit('create-player')
		});

    this.socket.on('player-created', (player) => {
      id = player.id
      playerSprites.push({id: id, sprite: this.myShip})
      this.socket.on('bullet-fired', (data) => {
        console.log('recv b f')
        for (let i = 0; i < playerSprites.length; i++) {
          if (playerSprites[i].id === data.id && data.id !== id) {
            this.fire(playerSprites[i].sprite, this.bulletGroup)
          }
        }
      })
      this.socket.on('send-game-state', (state) => {
        k++
        if (k === 1000) {
          for (let i = 0; i < playerSprites.length; i++) {
            if (playerSprites[i].id != id) {
              playerSprites[i].sprite.kill()
              playerSprites[i].sprite.destroy()
              playerSprites.splice(i, 1)
            }
          }

          for (let i = 0; i < this.state.players.length; i++) {
            if (playerSprites[i].id != id) {
              let newShip = this.game.add.sprite(0, 0, 'triangle');
              newShip.scale.x = .1;
              newShip.scale.y = .1;
              newShip.anchor.set(0.5)
              this.game.physics.enable(newShip, Phaser.Physics.ARCADE);
              playerSprites.push({id: state.players[i].id, sprite: newShip})
            }
          }
        }

        //console.log(state)
        this.state = state;
        for(let i = 0; i < state.players.length; i++) {
          if (state.players[i].id == id)
            continue;
          let foundPlayer = playerSprites.find((player) => {
            return player.id === state.players[i].id
          })
          //console.log(foundPlayer)
          if (foundPlayer === undefined) {
            let newShip = this.game.add.sprite(0,0,'triangle');
            newShip.scale.x = .1;
            newShip.scale.y = .1;
            newShip.anchor.set(0.5)
            this.game.physics.enable(newShip, Phaser.Physics.ARCADE);
            playerSprites.push({id: state.players[i].id, sprite: newShip})
            console.log('new player connected')
          } else {
            let serverStateOfPlayer = state.players[i];
            //
            // console.log('updating...')
            //console.log(serverStateOfPlayer)
            // set player state
            foundPlayer.sprite.position.x = serverStateOfPlayer.posX
            foundPlayer.sprite.position.y = serverStateOfPlayer.posY
            foundPlayer.sprite.body.velocity.x = serverStateOfPlayer.velX
            foundPlayer.sprite.body.velocity.y = serverStateOfPlayer.velY
            foundPlayer.sprite.angle = serverStateOfPlayer.orientation
          }
        }

        for (let i = 0; i < playerSprites.length; i++) {
          let p = this.state.players.find((player) => {
            return player.id == playerSprites[i].id
          })
          if (p == undefined) {
            playerSprites[i].sprite.kill()
            playerSprites[i].sprite.destroy()
            playerSprites.splice(i, 1)
          }
        }

        this.socket.on('player-disconnected', (data) => {
          for (let i = 0; i < playerSprites.length; i++) {
            if (playerSprites[i].id == data.id) {
              playerSprites[i].sprite.kill()
              playerSprites[i].sprite.destroy()
              playerSprites.splice(i, 1)
              break
            }
          }
        })
      });
    });



    this.game.time.events.loop(this._speed, this.update, this).timer.start();
	}

}

export default MainGame;
