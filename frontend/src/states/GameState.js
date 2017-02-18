import RainbowText from '../objects/RainbowText';
let io = require('socket.io-client');

class GameState extends Phaser.State {

	update() {

	}

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		// let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
		// text.anchor.set(0.5);

		this._speed = 150;

		this.connection = io('localhost:3002');

		connection.emit('player-created');

		this.connection.on('send-game-state', (state) => {
			console.log(state);
		});

		this.connection.on('player-created', (player) => {
			console.log(player);
		});

    this.game.time.events.loop(this._speed, this.update, this).timer.start();
	}

}

export default GameState;
