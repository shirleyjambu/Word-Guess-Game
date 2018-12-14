// Initialise variables
var wordList = ["pretty", "beautiful", "lovely", "foliage", "summer", "exquisite"];
var chosenWord = "";
var guessWord = "";
var allGuesses = "";
var triesCount = 10;
var arrCorrect = [];
var arrAllGuesses = [];
var isWordFound = false;
var winCounter = 0;
var lossCounter = 0;

// User messages
var msgWin = "<i class='fas fa-award'></i> You Won ! Guess another word.";
var msgGameOver = "Game Over. Start again.";
var msgEnterValidKey = "Please enter a valid alphabet.";
var msgWrongLetter = "Oops ! Try another letter.";
var msgRightLetter = "Cool. Keep trying.";
var msgAlreadyExisting = "You already guessed it. Try another letter.";

// document elements
var $guessWordDisplay = document.getElementById("guessWordDisplay");
var $triesDisplay = document.getElementById("triesDisplay");
var $lettersDisplay = document.getElementById("lettersDisplay");
var $messageDisplay = document.getElementById("messageDisplay");
var $winDisplay = document.getElementById("winDisplay");
var $lossDisplay = document.getElementById("lossDisplay");



// Functions
function getRandomWord() {
  chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
  console.log(" chosen Word : " + chosenWord);
  return chosenWord;
}

function setWordDisplay(len) {
  var startWord = "";
  for (var i = 0; i < len; i++) {
    startWord = startWord + "_ ";
  }
  $guessWordDisplay.innerHTML = startWord;
}

function setSelectedLetters(letter) {
  arrCorrect.push(letter);
  guessWord = "";
  // Based on word chosen, create dashes to guess the word 
  for (var i = 0; i < chosenWord.length; i++) {

    if (arrCorrect.includes(chosenWord.charAt(i))) {
      guessWord = guessWord + chosenWord.charAt(i) + " ";
    } else {
      guessWord = guessWord + "_ ";
    }
  }
  setWordFound(guessWord);
  return guessWord;
}

function setWordFound(word) {
  if (word.indexOf("_") < 0) {
    isWordFound = true;
  }
}

function gameSet() {
  gameReset();
  $messageDisplay.textContent = "";
}

function gameReset() {
  setWordDisplay(getRandomWord().length);
  triesCount = 10;
  isWordFound = false;
  arrCorrect = [];
  arrAllGuesses = [];
  $triesDisplay.textContent = triesCount;
  $lettersDisplay.textContent = "";
}

function setUserMsg(code) {
  console.log("code : " + code);
  switch (code) {
    case ("W"):
      $messageDisplay.innerHTML = msgWin;
      $messageDisplay.className = "p-2 my-flex-item-2 my-message my-success";
      winCounter++;
      $winDisplay.textContent = winCounter;
      break;
    case ("L"):
      $messageDisplay.innerHTML = msgGameOver;
      $messageDisplay.className = "p-2 my-flex-item-2 my-message my-failure";
      lossCounter++;
      $lossDisplay.textContent = lossCounter;
      break;
    case ("RL"):
      $messageDisplay.innerHTML = msgRightLetter;
      $messageDisplay.className = "p-2 my-flex-item-2 my-message my-info";
      break;
    case ("WL"):
      $messageDisplay.innerHTML = msgWrongLetter;
      $messageDisplay.className = "p-2 my-flex-item-2 my-message my-info";
      break;
    case ("V"):
      $messageDisplay.innerHTML = msgEnterValidKey;
      $messageDisplay.className = "p-2 my-flex-item-2 my-message my-warning";
      break;
  }
}


// End of Function Block

// Call the function to set the game    
gameSet();

// When user types in a key
// check if the letter exists in the word,if true set guessWord, else continue
document.onkeyup = function (event) {
  keyEntered = event.key;
  // To check if keyEntered is only alphabets
  if (keyEntered.charCodeAt(0) >= 97 && keyEntered.charCodeAt(0) <= 122) {
    if (triesCount >= 1 && triesCount <= 10) {

      // Display the letters typed 
      allGuesses = $lettersDisplay.textContent;

      if (allGuesses.includes(keyEntered)) {
        $messageDisplay.innerHTML = msgAlreadyExisting;
      } else {
        // decrement the counter and display the value
        triesCount--;

        $triesDisplay.textContent = triesCount;

        if (triesCount == 0) {
          setUserMsg("L");
          gameReset();
        } else {
          $lettersDisplay.textContent = allGuesses + " " + keyEntered;
          if (chosenWord.indexOf(keyEntered) >= 0) {
            $guessWordDisplay.innerHTML = setSelectedLetters(keyEntered);
            if (isWordFound) {
              setUserMsg("W");
              gameReset();
            } else {
              setUserMsg("RL");
            }
          } else {
            setUserMsg("WL");
          }
        }
      }
    }
  } else {
    setUserMsg("V");
  }

}