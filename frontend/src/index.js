import * as html from '../static/index.html'
import * as css from '../static/styles/main.css'
import MainGame from './states/MainGame';
import $ from 'jquery';

class Game extends Phaser.Game {

	constructor() {
	  let width = 800
    let height = 800
		super(width, height, Phaser.AUTO, 'content', null);
		this.state.add('MainGame', MainGame, false);
		this.state.start('MainGame');
	}
}

new Game();
