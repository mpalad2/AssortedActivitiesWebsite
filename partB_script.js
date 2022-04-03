//default randomized number to guess
var num = Math.floor(Math.random()*100)+1;

//max amount of guesses
var count = 5;

//timer variables
var hours = 0;
var minutes = 0;
var seconds = 0;
var fullSec = 0;

var myTimer = setInterval(startTimer, 1000);
startTimer();

//sound values
var wrongSound = document.getElementById("wrongAnswer");
var rightSound = document.getElementById("rightAnswer");
var loseSound = document.getElementById("loseReply");
var winSound = document.getElementById("winReply");

//guess function - called when user presses the guess button
function guessNum(){
	//retrieve user input
	var guess = document.getElementById("guess").value;
	
	//NEXT LINE FOR TESTING PURPOSES ONLY
	//document.getElementById("showNum").innerHTML = num;
	
	//if guess is not a number, blank, or out of range
	//guesses left is not decremented
	if (guess == "" || isNaN(guess) == true || guess < 1 || guess > 100){
		//play wrong sound
		wrongSound.play();
		//tell them to enter a valid input
		document.getElementById("hint").innerHTML = "Guess a valid integer!";
		//update guesses left
		if (count == 1){
			document.getElementById("guessesLeft").innerHTML = "You have " + count + " guess left.";
		}
		else {
			document.getElementById("guessesLeft").innerHTML = "You have " + count + " guesses left.";
		}
	}
	
	//if guess is the right number
	else if (guess == num){
		//play win sound
		winSound.play();
		//show winning image
		document.getElementById("interaction").innerHTML = "<img src='" + dog[1].src + "' alt='dog'/>";
		//tell user they won
		document.getElementById("result").innerHTML = "You win!";
		//tell them the number
		document.getElementById("answer").innerHTML = "The number was " + num + "!";
		//tell user how many guesses they had left this game
		if (count == 1){
			document.getElementById("end").innerHTML = "You had " + count + " guess left last game.";
		}
		else {
			document.getElementById("end").innerHTML = "You had " + count + " guesses left last game.";
		}
		//reset hint to default message
		document.getElementById("hint").innerHTML = "Can you guess it?";
		//reset guesses left to default message
		document.getElementById("guessesLeft").innerHTML = "You have 5 guesses.";
		//reset guesses left to max amount
		count = 5; 
		//set num to new randomized number
		num = Math.floor(Math.random()*100)+1;
		//show final time
		showTime();
		//reset timer
		resetTimer();
		//keep results showing for ten seconds
		setTimeout(function(){ clearResults(); }, 10000);
	}
	//else if guess is greater than the number
	else if (guess > num){
		//play wrong sound
		wrongSound.play();
		//decrement the guesses left
		count--;
		//tell use the number is less than their guess
		document.getElementById("hint").innerHTML = "The number is less than " + guess + ".";
		//update guesses left
		if (count == 1){
			document.getElementById("guessesLeft").innerHTML = "You have " + count + " guess left.";
		}
		else {
			document.getElementById("guessesLeft").innerHTML = "You have " + count + " guesses left.";
		}
		//document.getElementById("totalTime").innerHTML = "";
		//call function to check if they have enough guesses to continue
		guessLimit();
	}
	//else if guess is less than the number
	else{
		//play wrong sound
		wrongSound.play();
		//decrement the guesses left
		count--;
		//tell use the number is greater than their guess
		document.getElementById("hint").innerHTML = "The number is greater than " + guess + ".";
		//update guesses left
		if (count == 1){
			document.getElementById("guessesLeft").innerHTML = "You have " + count + " guess left.";
		}
		else {
			document.getElementById("guessesLeft").innerHTML = "You have " + count + " guesses left.";
		}
		//document.getElementById("totalTime").innerHTML = "";
		//call function to check if they have enough guesses to continue
		guessLimit();
	}
}

//check if the user still has guesses left or if the game is over
function guessLimit(){
	//if they have no more guesses left
	if (count == 0){
		//play lose game sound
		loseSound.play();
		//show losing image
		document.getElementById("interaction").innerHTML = "<img src='" + dog[0].src + "' alt='dog'/>";
		//tell user the game is over
		document.getElementById("result").innerHTML = "Game over!";
		//reveal the number
		document.getElementById("answer").innerHTML = "The number was " + num + "!";
		//tell them how many guesses they had left
		document.getElementById("end").innerHTML = "You had " + count + " guesses left last game.";
		//reset messages to default
		document.getElementById("hint").innerHTML = "Can you guess it?";
		document.getElementById("guessesLeft").innerHTML = "You have 5 guesses.";
		//set guesses left to max amount
		count = 5; 
		//set num to new randomized number
		num = Math.floor(Math.random()*100)+1;
		//show final time
		showTime();
		//reset timer
		resetTimer();
		//keep results showing for ten seconds
		setTimeout(function(){ clearResults(); }, 10000);
	}
}

//show current time since starting
function startTimer(){
	//increment seconds and fullSeconds
	seconds++;
	fullSec++;
	//if seconds is over 60
	if (seconds >= 60){
		//set minutes equal to the nearest whole number for all seconds (fullSec) divided by 60
		minutes = Math.floor(fullSec/60);
		//set seconds equal to nearest whole number for seconds divided by 60
		seconds = Math.floor(seconds%60);
	}
	//if minutes are equal to or over 60
	if (minutes >= 60){
		//set hours equal to the nearest whole number for all seconds (fullSec) divided by 3600
		hours = Math.floor(fullSec/3600);
		//set minutes equal to nearest whole number for minutes divided by 60
		minutes = Math.floor(minutes%60);
	}
	//if minutes is a not a double digit (two numbers)
	if (minutes.length != 2){
		//call function to add leading zero
		minutes = addZero(minutes);
	}
	//add leading zero to seconds
	seconds = addZero(seconds);
	//create a variable with hour,min,sec info, each separated with a colon and their respective representative letters
	var time = hours + "h:" + minutes + "m:" + seconds + "s";
	//show time with given id
	document.getElementById("stopwatch").innerHTML = "Timer: " + time;
	return time;
}

//show final time
function showTime(){
	//call function for time
	var timeTaken = startTimer();
	//update total time message
	document.getElementById("totalTime").innerHTML = "Total Time: " + timeTaken;
}

//reset timer
function resetTimer(){
	//clear interval
	clearInterval(myTimer);
	//reset to default values
	hours = 0;
	minutes = 0;
	seconds = 0;
	myTimer = setInterval(startTimer, 1000);
	//start new timer
	startTimer();
}

//add leading zeros
function addZero(i){
	if (i < 10){
		i = "0" + i;
	}
	return i;
}

//reset results values to default
function clearResults(){
	document.getElementById("interaction").innerHTML = "<img src = 'goodluckdog.jpg' alt='goodluckdog'/>";
	document.getElementById("result").innerHTML = "Results reset!";
	document.getElementById("answer").innerHTML = "";
	document.getElementById("end").innerHTML = "";
	document.getElementById("totalTime").innerHTML = "";
}

//show current time
function currentTime(){
	//get current time 
	var today = new Date();
	//set to current hour
	var h = today.getHours();
	//set to current minute
	var m = today.getMinutes();
	//set to current second
	var s = today.getSeconds();
	//set to default value of AM
	var point = "AM";
	//add leading zeros
	m = addZero(m);
	s = addZero(s);
	
	//if hours is past 12
	if (h > 12){
		//set to how many hours after noon
		h = h - 12;
		//update to PM
		point = "PM";
	}
	//set hour,minute,point info to variable
	document.getElementById("currentTime").innerHTML = h + ":" + m + " " + point;
	//delay
	var t = setTimeout(currentTime, 500);
}

//image gallery
var dog = new Array();

dog[0] = new Image();
dog[0].src = "loss.jpg";

dog[1] = new Image();
dog[1].src = "win.jpg";