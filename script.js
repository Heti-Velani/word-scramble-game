var words = [
  "javascript",
  "programming",
  "computer",
  "algorithm",
  "internet",
  "development",
  "html",
  "css",
  "python",
  "certify",
  "sucessful",
  "madam",
  "databinding",
  "cartoon",
  "joker",
  "happy"
];

var currentWordIndex = 0;
var score = 0;
var rounds = 0;

// Shuffle the words array
words = shuffleArray(words);

function generateNewWord() {
  if (rounds === 5) {
    endGame();
    return;
  }
  currentWordIndex++;
  if (currentWordIndex >= words.length) {
    currentWordIndex = 0; // Reset index if it exceeds the length of the words array
  }
  rounds++;
  var currentWord = words[currentWordIndex];
  var scrambledWord = shuffleWord(currentWord);
  document.getElementById("word").innerText = "Unscramble the word: " + scrambledWord;
  document.getElementById("guess").value = "";
  document.getElementById("result").innerText = "";
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function shuffleWord(word) {
  var shuffled = word.split('').sort(function(){return 0.5-Math.random()}).join('');
  if (shuffled === word) {
    return shuffleWord(word); // Recursive call if the shuffled word is same as original word
  }
  return shuffled;
}

function checkGuess() {
  var guess = document.getElementById("guess").value.toLowerCase();
  var currentWord = words[currentWordIndex];
  if (guess === currentWord) {
    document.getElementById("result").innerText = "Correct! The word is " + currentWord + ".";
    score++;
    document.getElementById("scoreValue").innerText = score;
  } else {
    document.getElementById("result").innerText = "Incorrect! Try again.";
  }
  generateNewWord();
}

function endGame() {
  document.getElementById("word").innerText = "Game Over!";
  document.getElementById("guess").disabled = true;
  document.getElementById("result").innerText = "Final Score: " + score;
  document.getElementById("container").innerHTML += `
    <button onclick="replayGame()">Replay</button>
    <button onclick="exitGame()">Exit</button>
  `;
}

function replayGame() {
  currentWordIndex = 0;
  score = 0;
  rounds = 0;
  // Shuffle the words array for the new game
  words = shuffleArray(words);
  generateNewWord();
  document.getElementById("guess").disabled = false;
  document.getElementById("scoreValue").innerText = "0";
  var container = document.getElementById("container");
  // Remove the buttons
  var replayButton = container.querySelector('button:nth-last-child(1)');
  var exitButton = container.querySelector('button:nth-last-child(2)');
  container.removeChild(replayButton);
  container.removeChild(exitButton);
}

function exitGame() {
  window.close(); // Close the window/tab
}

// Initial word generation
generateNewWord();