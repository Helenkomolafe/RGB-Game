const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.getElementById("message");
const resetButton = document.getElementById("reset");
const easyBtn = document.getElementById("easyBtn");
const hardBtn = document.getElementById("hardBtn");
const attemptsDisplay = document.getElementById("attempts");

let numberOfSquares = 6;
let colors = [];
let pickedColor;
let attempts = 0;

function setupModeButtons() {
  easyBtn.addEventListener("click", () => {
    numberOfSquares = 3;
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
    resetGame();
  });

  hardBtn.addEventListener("click", () => {
    numberOfSquares = 6;
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    resetGame();
  });
}

function setupSquares() {
  squares.forEach((square) => {
    square.addEventListener("click", function () {
      const clickedColor = this.style.backgroundColor;
      attempts++;
      attemptsDisplay.textContent = `Attempts: ${attempts}`;

      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        changeColors(pickedColor);
        animateCorrectSquares();
        setTimeout(() => {
          resetGame(); // move to next color after correct answer
        }, 1000);
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  });
}

function resetGame() {
  colors = generateRandomColors(numberOfSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  messageDisplay.textContent = "";
  attempts = 0;
  attemptsDisplay.textContent = `Attempts: ${attempts}`;

  squares.forEach((square, i) => {
    if (colors[i]) {
      square.style.display = "block";
      square.style.backgroundColor = colors[i];
      square.classList.remove("correct");
    } else {
      square.style.display = "none";
    }
  });
}

function changeColors(color) {
  squares.forEach((square) => {
    square.style.backgroundColor = color;
  });
}

function animateCorrectSquares() {
  squares.forEach((square) => {
    square.classList.add("correct");
  });
}

function pickColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomColors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Initialize game
setupModeButtons();
setupSquares();
resetButton.addEventListener("click", resetGame);
resetGame();