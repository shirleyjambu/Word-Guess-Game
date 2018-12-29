//Variables
var keyEntered="";
var chosenWord = "";
var isGameOn = false;
var placeholder = [];
var arrIncorrect = [];
var triesCount = 10;
var wins = 0;
var losses = 0;

var $messageDisplay = document.getElementById("messageDisplay");
var $placeholderDisplay = document.getElementById("guessWordDisplay");
var $startGameBtn = document.getElementById("startGame");
var $triesDisplay = document.getElementById("triesDisplay");
var $winDisplay = document.getElementById("winDisplay");
var $lossDisplay = document.getElementById("lossDisplay");
var $lettersDisplay = document.getElementById("lettersDisplay");

// User messages
var msgWin = "<i class='fas fa-award'></i> You Won ! Guess another word.";
var msgGameOver = "Game Over. Try another word.";
var msgEnterValidKey = "Please enter a valid alphabet.";
var msgWrongLetter = "Oops ! Try another letter.";
var msgRightLetter = "Cool. Keep trying.";
var msgAlreadyExisting = "You already guessed it. Try another letter.";
var msgStartBtn ="Please click 'Start Game' to begin."

// Functions
function newGame(){
  isGameOn = true;
  triesCount=10;
  setWordDisplay();
  $messageDisplay.innerText ="";
  $lettersDisplay.innerText="";
  $triesDisplay.innerText=triesCount;
  //for mobile
  $('#dummy').focus();
}

// Functions
function setWordDisplay() {
  placeholder = [];
  arrIncorrect = [];

  chosenWord = wordList[Math.floor(Math.random() * wordList.length)].trim();
  console.log(" chosen Word : " + chosenWord);

  for (var i = 0; i < chosenWord.length; i++) {
    // check if chosen word has space
    if(chosenWord[i] === " "){
      placeholder.push("-"); // Space does not work
    }else{
      placeholder.push("_");
    }
  }
  
  $placeholderDisplay.innerHTML = placeholder.join(" ");
  $triesDisplay.innerHTML=triesCount;
}


function checkLetter(letter){
   // Check if letter in chosen word
   for(var i=0;i < chosenWord.length ; i++){
      if(chosenWord[i].toLowerCase() === letter.toLowerCase()){
        placeholder[i] = chosenWord[i];
        setUserMsg("RL");
        }
    }  

    // Write the word to page
    $placeholderDisplay.innerHTML = placeholder.join(" ");

    //if Letter was not in the chosen word
    if(!arrIncorrect.includes(letter)){
      // decrement the counter and display the value
      triesCount--;
      $triesDisplay.textContent = triesCount;

      // Add letter to allGuesses
      arrIncorrect.push(letter);
      $lettersDisplay.textContent = arrIncorrect.join(", ");
      setUserMsg("WL");
    }else{
      setUserMsg("E");
    }

     //Check if win
    if(chosenWord === placeholder.join("").toLowerCase()){
      setUserMsg("W");
    }

    // Check for loss
   if(triesCount === 0){
     setUserMsg("L");
    }
}

function setUserMsg(code) {
  switch (code) {
    case ("W"):
      $messageDisplay.innerHTML = msgWin;
      $messageDisplay.className = "p-2 my-flex-item-2 my-message my-success";
      wins++;
      $winDisplay.textContent = wins;
      isGameOn=false;
      document.activeElement.blur(); // For mobile
      break;
    case ("L"):
      $messageDisplay.innerHTML = msgGameOver;
      $messageDisplay.className = "p-2 my-flex-item-2 my-message my-failure";
      losses++;
      $lossDisplay.textContent = losses;
      isGameOn=false;
      document.activeElement.blur(); // For mobile
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
    case ("SB"):
      $messageDisplay.innerHTML = msgStartBtn;
      $messageDisplay.className = "p-2 my-flex-item-2 my-message my-warning";
      break;
    case ("E"):
      $messageDisplay.innerHTML = msgAlreadyExisting;
      $messageDisplay.className = "p-2 my-flex-item-2 my-message my-info";
      break;  
  }
}


//End of Functions

//Event handlers
document.onkeyup = function(event){
  keyEntered = event.key;

  //handle eventcode
  if(event.keyCode==229){
    event.keyCode=$('#dummy').val().slice(('#dummy').val().length-1,('#dummy').val().length).toUpperCase().charCodeAt(0);}
  
  
  // Check for isGameOn mode
  if(!isGameOn){
    setUserMsg("SB");
    return false;
  } 

  // To check if keyEntered is only alphabets
  if (keyEntered.charCodeAt(0) >= 97 && keyEntered.charCodeAt(0) <= 122) {
    checkLetter(keyEntered);
  } else {
    setUserMsg("V");
    return false;
  }
};

$startGameBtn.addEventListener("click",newGame);

//For mobile
$(document).on("click",function(){
  $('#dummy').focus();
});
