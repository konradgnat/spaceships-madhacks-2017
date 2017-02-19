import RainbowText from '../objects/RainbowText';
let io = require('socket.io-client');

class MainGame extends Phaser.State {

	update() {
		console.log(this.state)
	}

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		// let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
		// text.anchor.set(0.5);

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

export default GameState;
