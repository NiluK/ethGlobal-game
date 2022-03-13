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
document.getElementById("btn-close")!.onclick = closeModal;
document.getElementById("btn-leaderboard-close")!.onclick = closeLeaderboard;

document.getElementById("btn-leaderboard")!.onclick = showLeaderboard;

async function showLeaderboard() {
  try {
    const leaderboard = await fetch(
      `https://citizen-global.herokuapp.com/leaderboard`
      // `http://localhost:3000/questions/${this.activeChest?.chestId}`
    );
    const json = await leaderboard.json();
    const modalBody = document.getElementById("leaderboardBody");
    const options = json.map((score) => {
      return `
      <li class="list-group-item disabled" aria-disabled="true">User: ${score.user} Score: ${score.count} </li>
      `;
    });
    modalBody!.innerHTML = `
    <ul class="list-group">
  ${options.join("")}
  </ul>
  `;
    document.getElementById("leaderboard")!.style.display = "block";
  } catch (error) {
    console.log(error);
  }
  document.getElementById("leaderboard")!.style.display = "block";
}
function closeModal() {
  const md = document.getElementById("modal");
  md!.style.display = "none";
}

function closeLeaderboard() {
  const md = document.getElementById("leaderboard");
  md!.style.display = "none";
}

async function submitAnswer() {
  const spinner = `
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Submitting...
  `;
  const submitButton = document.getElementById("btn-submit");
  submitButton!.innerHTML = spinner;
  const errorMessage = document.getElementById("errorMessage");
  if (errorMessage) {
    errorMessage.parentNode!.removeChild(errorMessage);
  }
  const user = Moralis.User.current().attributes.ethAddress;
  var radioGroup = document.getElementById("modalBody");
  var radios = radioGroup!.getElementsByTagName("input");
  const question = radios[0].name;
  var selected = 0;
  for (var i = 0; i < radios!.length; i++) {
    if (radios![i].checked) {
      selected = i;
      break;
    }
  }
  const data = await fetch("https://citizen-global.herokuapp.com/answers", {
    method: "POST",
    body: JSON.stringify({
      answerIndex: selected,
      questionId: question,
      user: user,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const json = await data.json();
  if (!json.isCorrect) {
    const modalBody = document.getElementById("modalBody");
    modalBody!.insertAdjacentHTML(
      "beforeend",
      `<div id="errorMessage" class="alert alert-danger mt-3" role="alert"> I'm sorry, you answered incorrectly. Please try again </div>`
    );
  } else {
    const x = document.getElementById("modalBody");
    x!.innerHTML = `
    <div class="alert alert-success" role="alert">Success, here is your NFT</div>
    <img class="w-100" src=${json.transaction.metadata.image_url} alt="">
    <p class="mt-2"> Visit the <a href="https://market.ropsten.immutable.com/"> Immutable X marketplace </a> to see and trade your NFT. </p>
    `;
    document.getElementById("btn-submit")!.hidden = true;
  }
  submitButton!.innerHTML = "Submit Answer";
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
