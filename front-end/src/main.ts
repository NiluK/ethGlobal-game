import Phaser from "phaser";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import Preloader from "./scenes/Preloader";
import Game from "./scenes/Game";
import GameUI from "./scenes/GameUI";
import Moralis from "moralis/dist/moralis.min.js";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';

const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth)
const DEFAULT_HEIGHT = 720 // any height you want
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT

Moralis.initialize("jkxmAgBQsTSqKwOOwv81UXIqGg9us91eDJX0U8mj");
Moralis.serverURL = "https://qguuoj8uvxpj.usemoralis.com:2053/server";
document.getElementById("btn-login")!.onclick = login;

function login() {
  let user = Moralis.User.current();
  if (!user) {
    Moralis.Web3.authenticate().then((user) => {
      launchGame();
    });
  } else {
    launchGame();
  }
}

function launchGame() {
 document.getElementById("connexion-container")!.hidden = true;
  new Phaser.Game({
    type: Phaser.AUTO,
    width: 700,
    height: 300,
	scale: {
		zoom:2,
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: DEFAULT_WIDTH,
		height: DEFAULT_HEIGHT
	},
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },
    scene: [Preloader, Game, GameUI],
    plugins: {
      scene: [
        {
          key: "rexUI",
          plugin: RexUIPlugin,
          mapping: "rexUI",
        },
      ],
    },
  });
}