import Phaser from "phaser";
import Chest from "../items/Chest";

import { sceneEvents } from "../events/EventsCenter";

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      faune(
        x: number,
        y: number,
        texture: string,
        frame?: string | number
      ): Faune;
    }
  }
}

export default class Faune extends Phaser.Physics.Arcade.Sprite {
  private _coins = 0;
  private isModalActivated: boolean = false;
  private activeChest?: Chest;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    this.anims.play("faune-idle-down");
  }

  setChest(chest: Chest) {
    this.activeChest = chest;
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (!cursors) {
      return;
    }

    if (Phaser.Input.Keyboard.JustDown(cursors.space!)) {
      const hasKey = false;
      if (this.activeChest && hasKey) {
        const coins = this.activeChest.open();
        this._coins += coins;
        const coinNumber = document.getElementById("coin-number");
        coinNumber!.innerHTML = this._coins.toString();
        sceneEvents.emit("player-coins-changed", this._coins);
      } else {
        this.openModal();
      }

      return;
    }

    const speed = 100;

    const leftDown = cursors.left?.isDown;
    const rightDown = cursors.right?.isDown;
    const upDown = cursors.up?.isDown;
    const downDown = cursors.down?.isDown;

    if (leftDown) {
      this.anims.play("faune-run-side", true);
      this.setVelocity(-speed, 0);

      this.scaleX = -1;
      this.body.offset.x = 24;
    } else if (rightDown) {
      this.anims.play("faune-run-side", true);
      this.setVelocity(speed, 0);

      this.scaleX = 1;
      this.body.offset.x = 8;
    } else if (upDown) {
      this.anims.play("faune-run-up", true);
      this.setVelocity(0, -speed);
    } else if (downDown) {
      this.anims.play("faune-run-down", true);
      this.setVelocity(0, speed);
    } else {
      const parts = this.anims.currentAnim.key.split("-");
      parts[1] = "idle";
      this.anims.play(parts.join("-"));
      this.setVelocity(0, 0);
    }

    if (leftDown || rightDown || upDown || downDown) {
      this.activeChest = undefined;
    }
  }

  async openModal() {
    console.log(this.activeChest);
    if (this.activeChest) {
      console.log(this.activeChest);
      try {
        const question = await fetch(
          `http://localhost:3000/questions/1`
          // `http://localhost:3000/questions/${this.activeChest?.chestId}`
        );
        const data = await question.json();

        document.getElementById("modal")!.style.display = "block";

        const modalTitle = document.getElementById("modalQuestion");
        const modalBody = document.getElementById("modalBody");

        const options = data.options.map((option) => {
          return `
          <div class="form-check">
          <input class="form-check-input" type="radio" name="${data._id}" id="${option._id}">
          <label class="form-check-label" for=${data._id}>
          ${option.text}
        </label>
        </div>
          `;
        });
        console.log(data);
        console.log(options);
        modalTitle!.innerHTML = data.questionText;
        modalBody!.innerHTML = `
      ${options.join("")}
        `;
      } catch (error) {
        console.log(error);
      }
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  "faune",
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    var sprite = new Faune(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(
      sprite,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    );

    sprite.body.setSize(sprite.width * 0.5, sprite.height * 0.8);

    return sprite;
  }
);
