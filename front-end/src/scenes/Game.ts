import Phaser from "phaser";
import { debugDraw } from "../utils/debug";
import { createCharacterAnims } from "../anims/CharacterAnims";
import { createChestAnims } from "../anims/TreasureAnims";
import "../characters/Faune";
import Faune from "../characters/Faune";
import Chest from "../items/Chest";

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private faune!: Faune;
  rexUI;

  constructor() {
    super("game");
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
   // this.scene.run("game-ui");

    createCharacterAnims(this.anims);
    createChestAnims(this.anims);

    const map = this.make.tilemap({ key: "map" });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createLayer("World", tileset, 0, 0);
    const aboveLayer = map.createLayer("Above Player", tileset, 0, 0);
    worldLayer.setCollisionByProperty({ collides: true });
    worldLaye
    const chests = this.physics.add.staticGroup({
      classType: Chest,
    });
    const chestsLayer = map.getObjectLayer("Chests");
    chestsLayer.objects.forEach((chestObj) => {
      chests.get(
        chestObj.x! + chestObj.width! * 0.5,
        chestObj.y! - chestObj.height! * 0.5,
        "treasure"
      );
    });

    const spawnPoint = map.findObject(
      "Objects",
      (obj) => obj.name === "Spawn Point"
    );

    this.faune = this.add.faune(
      Number(spawnPoint.x),
      Number(spawnPoint.y),
      "faune"
    );

    this.cameras.main.startFollow(this.faune, true);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    aboveLayer.setDepth(10);

    this.physics.add.collider(this.faune, worldLayer);

    this.physics.add.collider(
      this.faune,
      chests,
      this.handlePlayerChestCollision,
      undefined,
      this
    );
  }

  private handlePlayerChestCollision(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  ) {
    const chest = obj2 as Chest;
    this.faune.setChest(chest);
	
  }

  update(t: number, dt: number) {
    if (this.faune) {
      this.faune.update(this.cursors);
    }
  }
}
