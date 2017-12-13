// GLOBAL VARIABLES
// ----------------------------------------------------------------------
// Arrays and varibales for holding data
var wordOptions = ["hippopotamus", "jellyfish", "tarantula", "flamingo", 
"alligator", "baboon", "iguana", "caribou", "toucan", "tortoise"]
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = []; 
var wrongLetters = [];

// Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

// FUNCTIONS (Reusable blocks of code that I will call upon when needed)
// ----------------------------------------------------------------------
function startGame () {
	selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	lettersInWord = selectedWord.split(""); 
	numBlanks = lettersInWord.length;

	// Reset
	guessesLeft = 9;
	wrongLetters = [];
	blanksAndSuccesses = [];

	// Populate blanks and successes with right number of blanks
	for (var i=0; i<numBlanks; i++){
		blanksAndSuccesses.push("_");
	}
	// Change HTML to reflect round conditions
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("  ");
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("winCounter").innerHTML = winCount;
	document.getElementById("lossCounter").innerHTML = lossCount;

	// Testing / Debugging
	console.log(selectedWord);
	console.log(lettersInWord);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);
}

function checkLetters(letter) {
	// Check if letter exists at all
	var isLetterInWord = false;
	for (var i=0; i<numBlanks; i++) {
		if(selectedWord[i] == letter) {
			isLetterInWord = true;
		}
	}

	// Check where in the word letter exists, then populate out blanksAndSuccesses array.
	if(isLetterInWord) {
		for (var i=0; i<numBlanks; i++) {
			if(selectedWord[i] == letter) {
				blanksAndSuccesses[i] = letter;
			}
		}
	}
	// Letter wasn't found
	else {
		wrongLetters.push(letter);
		guessesLeft --
	}

	// Testing and Debugging
	console.log(blanksAndSuccesses);

}

function roundComplete(){
	console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left " + guessesLeft);

	//  Update the HTML to reflect the most recent count stats
	document.getElementById("numGuesses").innerHTML = guessesLeft; 
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");


	// Check if user won
	if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
		winCount++;
		alert("YOU WIN!");
		// Update the win counter in the HTML
		document.getElementById("winCounter").innerHTML = winCount;

		startGame();
	}

	// Check if user lost
	else if (guessesLeft == 0) {
		lossCount++;
		alert("YOU LOSE!");

		// Update the HTML
		document.getElementById("lossCounter").innerHTML = lossCount;

		startGame();
	}
}

// MAIN PROCESS
// ----------------------------------------------------------------------

// Initiates the code the first time
startGame();

// Register keyclicks
document.onkeyup = function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();

	// Testing / Debugging
	console.log(letterGuessed);
}







