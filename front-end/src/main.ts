import Phaser from "phaser";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import Preloader from "./scenes/Preloader";
import Game from "./scenes/Game";
import GameUI from "./scenes/GameUI";
import Moralis from "moralis/dist/moralis.min.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";

const ratio = Math.max(
  window.innerWidth / window.innerHeight,
  window.innerHeight / window.innerWidth
);
const DEFAULT_HEIGHT = 720; // any height you want
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT;

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

document.getElementById("btn-submit")!.onclick = submitAnswer;

async function submitAnswer() {

  const user = Moralis.User.current().attributes.ethAddress;
  console.log("user", user);
  var radioGroup = document.getElementById("modalBody");
  var radios = radioGroup!.getElementsByTagName("input");
  const question = radios[0].name;
  console.log(radios);
  var selected = 0;
  for (var i = 0; i < radios!.length; i++) {
    if (radios![i].checked) {
      selected = i;
      break;
    }
  }
  console.log("selected", selected);
  console.log(question);
  console.log("user", user);

  const data = await fetch("http://localhost:3000/answers", {
    method: "POST",
    body: JSON.stringify({
      answerIndex: selected,
      questionId: question,
      user: user,
    }),
  });
  const json = await data.json();
  console.log(json);
}

function launchGame() {
  document.getElementById("connexion-container")!.hidden = true;
  new Phaser.Game({
    type: Phaser.AUTO,
    width: 700,
    height: 300,
    scale: {
      zoom: 2,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
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
