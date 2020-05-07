// YOU WILL ALWAYS WIN NO MATTER WHAT.

// when clicking an image, you inizialize this game
function rpsGame(humanChoice) {
  const yourChoice = humanChoice.id;
  const computerChoice = ComputerGuess(yourChoice);

  //  [1 , 0]  human won | computer lost
  const results = decideWinner(yourChoice, computerChoice);

  //  { message: "You won", color: "green" }        [1 , 0]
  const message = finalMessage(results);

  // handling the graphic part
  rpsFrontEnd(yourChoice, computerChoice, message);
}

// this f() returns (with equal possibilities) a random string between "rock", "paper" and "scissors"
// NO actually it doesn't
function ComputerGuess(yourChoice) {
  if (yourChoice === "rock") {
    return "scissors";
  } else if (yourChoice === "paper") {
    return "rock";
  } else {
    return "paper";
  }
}

// this f() receives the input from the user and the random pick from the computer
// and determines who is the winner
function decideWinner(yourChoice, computerChoice) {
  // using 2-dimensional array optimization
  const rpsDataBase = {
    rock: {
      scissors: 1,
      rock: 0.5,
      paper: 0,
    },
    paper: {
      rock: 1,
      paper: 0.5,
      scissors: 0,
    },
    scissors: {
      paper: 1,
      scissors: 0.5,
      rock: 0,
    },
  };

  // swapping the first with the second index means changing perspective,
  // 2-dimensional arrays are used here for this property
  const yourScore = rpsDataBase[yourChoice][computerChoice];
  const computerScore = rpsDataBase[computerChoice][yourChoice];

  return [yourScore, computerScore];
}

// this f() takes your score and determines if you have won or lost
// .color method in the object returned will be used in the front for displaying text in different colros
function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { message: "You Lost", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "You Tied", color: "yellow" };
  } else {
    return { message: "You Won", color: "green" };
  }
}

// this f() handles the graphics
function rpsFrontEnd(humanImageChoice, computerImageChoice, finalMessage) {
  const imagesDataBase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };

  ///removing all the images
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  // creating divs for displaying content
  const humanDiv = document.createElement("div");
  const computerDiv = document.createElement("div");
  const messageDiv = document.createElement("div");

  humanDiv.innerHTML =
    "<img src='" +
    imagesDataBase[humanImageChoice] +
    "' height='150' width='150' style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'/>";

  messageDiv.innerHTML =
    "<h1 style='color: " +
    finalMessage.color +
    "; font-size: 60px; padding: 30px;'>" +
    finalMessage.message +
    "</h1>";

  computerDiv.innerHTML =
    "<img src='" +
    imagesDataBase[computerImageChoice] +
    "' height='150' width='150' style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'/>";

  document.getElementById("flex-box-rps-div").appendChild(humanDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
  document.getElementById("flex-box-rps-div").appendChild(computerDiv);
}
