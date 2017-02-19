import * as html from '../static/index.html'
import * as css from '../static/styles/main.css'
import MainGame from './states/MainGame';

class Game extends Phaser.Game {

	constructor() {
		super(500, 500, Phaser.AUTO, 'content', null);
		this.state.add('MainGame', MainGame, false);
		this.state.start('MainGame');
	}

}

new Game();
