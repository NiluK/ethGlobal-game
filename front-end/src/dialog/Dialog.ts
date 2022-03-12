import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import { CustomShapes } from "phaser3-rex-plugins/templates/ui/ui-components";



export default class  SpeechBubble  extends CustomShapes {
  constructor(scene: Phaser.Scene, fillColor?: number, strokeColor?: number) {
    super(scene, {
      create: { lines: 1 },
      update: function () {
        var radius = 20;
        var indent = 15;

        var left = 0,
          right = this.width,
          top = 0,
          bottom = this.height,
          boxBottom = bottom - indent;
        var lines = this.getShapes()[0] as CustomShapes.Lines;
        lines
          .lineStyle(2, this.getData("strokeColor"), 1)
          .fillStyle(this.getData("fillColor"), 1)
          // top line, right arc
          .startAt(left + radius, top)
          .lineTo(right - radius, top)
          .arc(right - radius, top + radius, radius, 270, 360)
          // right line, bottom arc
          .lineTo(right, boxBottom - radius)
          .arc(right - radius, boxBottom - radius, radius, 0, 90)
          // bottom indent
          .lineTo(right * 0.5, boxBottom)
          .lineTo(right * 0.4, bottom)
          .lineTo(right * 0.3, boxBottom)
          // bottom line, left arc
          .lineTo(left + radius, boxBottom)
          .arc(left + radius, boxBottom - radius, radius, 90, 180)
          // left line, top arc
          .lineTo(left, top + radius)
          .arc(left + radius, top + radius, radius, 180, 270)
          .close();
      },
    });

    this.setData("fillColor", fillColor).setData("strokeColor", strokeColor);

    scene.add.existing(this);
  }
}
