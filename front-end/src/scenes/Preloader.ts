import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene
{
	constructor()
	{
		super('preloader')
	}

	preload()
	{
		this.load.image('tiles', 'tiles/citizen.png')
		this.load.tilemapTiledJSON('map', 'tiles/citizen.json')

		this.load.atlas('faune', 'character/fauna.png', 'character/fauna.json')
		this.load.atlas('treasure', 'items/treasure.png', 'items/treasure.json')

		this.load.image('ui-heart-empty', 'ui/ui_heart_empty.png')
		this.load.image('ui-heart-full', 'ui/ui_heart_full.png')
		this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        }); 
	}

	create()
	{
		this.scene.start('game')
	}

	
}