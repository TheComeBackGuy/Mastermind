const answer = [];
const colors = ["red", "blue", "yellow", "green", "black", "white"];
let pastGuesses = [];
let currentGuess = [" ", " ", " ", " "];
let currentColumn = 1; //Math.floor(Math.random() * 10);
let currentNodes = [];

function getAnswer() {
  let i = 0;
  for (i = 0; i <= 3; i++) {
    answer.push(colors[Math.floor(Math.random() * 4)]);
    // console.log(answer);
  }
}

function endGame() {
  currentColumn = 10;
  let loseBox = false;
  if (!loseBox) {
    let loser = document.createElement("div");
    document.body.appendChild(loser);
    loser.classList.add("youLose");
    loser.innerHTML = "you're a loser  <br/> and nobody really loves you";
    loseBox = true;
  } else {
    return;
  }
}

function submitAnswer() {
  /// code here that disables previous row
  pastGuesses.push(currentGuess);
  console.log("PastGuesses:" + pastGuesses);
  currentColumn += 1;
  if (currentColumn <= 10) {
    activateColumn();
  } else if (currentColumn >= 11) {
    endGame();
  }
}

document.getElementById("submit").addEventListener("click", submitAnswer);

function activateColumn() {
  let c = 0;
  for (c = 1; c <= 4; c++) {
    let theColor = 0;
    // console.log(`r${c}c${currentColumn}`);
    let hole = document.getElementById(`r${c}c${currentColumn}`);
    currentNodes.push(`r${c}c${currentColumn}`);
    console.log(currentNodes);
    // console.log(`r${c}c${currentColumn}`);
    hole.classList.add("currentGuess", "newMarble");

    //      /**
    //        * adding rollover states till it's clicked
    //        */
    function mouseIn() {
      hole.classList.replace("newMarble", `${colors[theColor]}`);
    }

    function mouseOut() {
      hole.classList.replace("red", "newMarble");
    }
    function mouseClick() {
      currentGuess.splice(0, 1, `${colors[theColor + 1]}`);
      console.log(c);
      console.log(currentGuess);
      // console.log(theColor);
      // console.log(colors[theColor]);

      hole.removeEventListener("mouseenter", mouseIn);
      hole.removeEventListener("mouseleave", mouseOut);

      if (theColor <= 4) {
        hole.classList.replace(
          `${colors[theColor]}`,
          `${colors[theColor + 1]}`
        );
        theColor += 1;
      } else if (theColor >= 5) {
        hole.classList.replace(`${colors[5]}`, `${colors[0]}`);
        theColor = 0;
      }
    }

    hole.addEventListener("mouseenter", mouseIn);
    hole.addEventListener("mouseleave", mouseOut);
    hole.addEventListener("click", mouseClick);

    if (currentColumn >= 2) {
      let lastHole = document.getElementById(`r${c}c${currentColumn - 1}`);
      // console.log("This is : " + lastHole);
      lastHole.classList.replace("currentGuess", "disabled");
    }
  }
}

function startGame() {
  activateColumn();
  getAnswer();
}

startGame();
