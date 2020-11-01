const answer = [];
const colors = ["red", "blue", "yellow", "green", "black", "white"];
let pastGuesses = [];
let currentGuess = [" ", " ", " ", " "];
let currentColumn = 1; //Math.floor(Math.random() * 10);

function getAnswer() {
  let i = 0;
  for (i = 0; i <= 3; i++) {
    answer.push(colors[Math.floor(Math.random() * colors.length)]).toString();
    console.log("The Answer is: " + answer);
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

function chickenDinner() {
  for (let a = 0; a < answer.length; a++) {
    let answerBlock = document.getElementById(`r${a + 1}c11`);
    answerBlock.classList.replace("answer", `${answer[a]}`);
    answerBlock.classList.add("guess");
    console.log(answerBlock);
    // console.log("answer");
  }
}
// fuction exactlyRight(){

// }

function compareAnswers() {
  let rightColorSpace = 0;
  let rightColor = 0;
  let leftoverGuess = [];
  let leftoverAnswer = [];
  for (let a = 0; a <= answer.length - 1; a++) {
    // console.log(answer[a] + " + " + currentGuess[a]);
    if (answer[a] === currentGuess[a]) {
      rightColorSpace += 1;
      console.log("Got it.");
    } else {
      leftoverGuess.push(currentGuess[a]);
      leftoverAnswer.push(answer[a]);
      console.log("Bummer.");
    }
  }
  if (rightColorSpace === 4) {
    console.log("YOU DID IT YOU LUCKY SUMMABISH!");
    chickenDinner();
  }

  console.log("leftoverGuess: " + leftoverGuess);
  console.log("leftoverAnswer: " + leftoverAnswer);
  stragglers();
  function stragglers() {
    for (let b = 0; b < leftoverGuess.length; b++) {
      for (let c = 0; c < leftoverAnswer.length; c++) {
        if (leftoverGuess[b] === leftoverAnswer[c]) {
          rightColor += 1;
          console.log("leftoverGuess taper: " + leftoverGuess);
          console.log("leftoverAnswer taper: " + leftoverAnswer);
          leftoverAnswer.splice(b, 1);
          leftoverGuess.splice(c, 1);
          stragglers();
        }
      }
      // console.log("no other matches.");
    }
  }

  function addPegs() {
    let pegNumber = 0;
    if (rightColorSpace > 0) {
      for (let rcs = 0; rcs <= rightColorSpace - 1; rcs++) {
        pegNumber += 1;
        document
          .getElementById(`r5c${currentColumn}_${pegNumber}`)
          .classList.replace("peg", "greenPeg");
      }
    }
    if (rightColor > 0) {
      for (let rc = 0; rc <= rightColor - 1; rc++) {
        pegNumber += 1;
        document.getElementById(
          document
            .getElementById(`r5c${currentColumn}_${pegNumber}`)
            .classList.replace("peg", "redPeg")
        );
      }
    }
  }
  addPegs();
  console.log(
    rightColorSpace + " of them are the right color in the right spot!"
  );
  console.log(rightColor + " left are the right color!");
  console.log(leftoverGuess);
  console.log(leftoverAnswer);
}

function submitAnswer() {
  compareAnswers();
  pastGuesses.splice(0, 0, currentGuess);
  currentGuess = [" ", " ", " ", " "];

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
  for (c = 0; c <= 3; c++) {
    let theColor = 0;
    // console.log(`r${c}c${currentColumn}`);
    let hole = document.getElementById(`r${c + 1}c${currentColumn}`);

    hole.classList.add("currentGuess", "newMarble");

    //      /**
    //        * adding rollover states till it's clicked
    //        */
    function mouseIn() {
      hole.classList.replace("newMarble", `${colors[0]}`);
    }

    function mouseOut() {
      hole.classList.replace("red", "newMarble");
    }

    function mouseClick() {
      console.log(currentGuess);
      // console.log(theColor);
      // console.log(colors[theColor]);
      hole.removeEventListener("mouseenter", mouseIn);
      hole.removeEventListener("mouseleave", mouseOut);

      let node = event.target.id;

      switch (node) {
        case "r1c" + currentColumn:
          // console.log("Row One Column One");
          currentGuess.splice(0, 1, colors[theColor]);
          break;
        case "r2c" + currentColumn:
          // console.log("Row Two Column One");
          currentGuess.splice(1, 1, colors[theColor]);
          break;
        case "r3c" + currentColumn:
          // console.log("Row Three Column One");
          currentGuess.splice(2, 1, colors[theColor]);
          break;
        case "r4c" + currentColumn:
          // console.log("Row Four Column One");
          currentGuess.splice(3, 1, colors[theColor]);
          break;
        default:
          return;
      }

      if (theColor <= colors.length - 2 && theColor !== 0) {
        hole.classList.replace(
          `${colors[theColor - 1]}`,
          `${colors[theColor]}`
        );
        console.log("theColor is : " + colors[theColor]);
        theColor += 1;
        console.log("the next color will be: " + colors[theColor]);
      } else if (theColor === colors.length - 1) {
        hole.classList.replace(
          `${colors[theColor - 1]}`,
          `${colors[theColor]}`
        );
        console.log("theColor is : " + colors[theColor]);
        theColor = 0;
        console.log("the next color will be: " + colors[theColor]);
      } else if (theColor === 0) {
        hole.classList.replace(`${colors[colors.length - 1]}`, `${colors[0]}`);
        theColor += 1;
      }
    }

    hole.addEventListener("mouseenter", mouseIn);
    hole.addEventListener("mouseleave", mouseOut);
    hole.addEventListener("click", mouseClick);
  }
}

function startGame() {
  activateColumn();
  getAnswer();
}

startGame();
