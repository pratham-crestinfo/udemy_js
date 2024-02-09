"use strict";
let secretNumber = Math.trunc(Math.random() * 20) + 1;
// console.log(secretNumber);
// document.querySelector(".number").textContent = secretNumber;

let guess;
let score = 20;
let highscore = 0;
document.querySelector(".check").addEventListener("click", function () {
  guess = Number(document.querySelector(".guess").value);
  if (score > 1) {
    if (!guess) {
      document.querySelector(".message").textContent = "NO NUMBER!!!";
    } else if (guess == secretNumber) {
      document.querySelector(".message").textContent =
        "Yey!, You guessed it right!";
      document.querySelector("body").style.backgroundColor = "lightgreen";
      document.querySelector(".number").textContent = secretNumber;

      if (score > highscore) {
        document.querySelector(".message").textContent =
          "Yey!, You guessed it right! and made highscore";
        highscore = score;
        document.querySelector(".highscore").textContent = score;
      }
    } else if (guess > secretNumber) {
      document.querySelector(".message").textContent =
        " you guessed it high!!!";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent =
        " you guessed it Low !!!";
      score--;
      document.querySelector(".score").textContent = score;
    }
  } else {
    document.querySelector(".message").textContent = "You lost!!!!";
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector("body").style.backgroundColor = "red";
    document.querySelector(".score").textContent = 0;
  }
});

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  document.querySelector(".guess").value = null;
  document.querySelector(".message").textContent = "Start guessing!!!";
  document.querySelector(".score").textContent = score;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  // console.log(secretNumber);
  document.querySelector(".number").textContent = "?";
  document.querySelector("body").style.backgroundColor = "black";
});
