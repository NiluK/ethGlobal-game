import Phaser from 'phaser'

import { sceneEvents } from '../events/EventsCenter'

export default class GameUI extends Phaser.Scene
{
	constructor()
	{
		super({ key: 'game-ui' })
	}

	create()
	{
		this.add.image(7, 12, 'treasure', 'coin_anim_f0.png')
		const coinsLabel = this.add.text(13, 7, '0', {
			fontSize: '14'
		})

		sceneEvents.on('player-coins-changed', (coins: number) => {
			coinsLabel.text = coins.toLocaleString()
		})
	}
}
