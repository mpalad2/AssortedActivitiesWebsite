var timing = 0;
//sound variables
var wrongSound = document.getElementById("wrongAnswer");
var rightSound = document.getElementById("rightAnswer");
var loseSound = document.getElementById("loseReply");
var winSound = document.getElementById("winReply");

//default value for checking when game is done
var done = true;

//start game
function playGame(){
	//checks if the game is finished
	if (done != true){
		//if not tell user to finish their current game
		document.getElementById("response").innerHTML = "Please finish your game!";
		//exit
		return;
	}
	//set matches to 0
	matches = 0;
	//set index to 0
	var index = 0;
	//delete old game if need be
	while (document.getElementById("picTable").rows.length > 0){
			document.getElementById("picTable").deleteRow(0);
	}
	//retrieve input
	var userNum = document.getElementById("picNum").value;
	//if not a valid input
	if (userNum != 8 && userNum != 10 && userNum != 12){
		//ask user to enter a valid input
		document.getElementById("response").innerHTML = "Please choose to match 8, 10, or 12 pairs.";
	}
	//otherwise if a valid input
	else {
		//set default value
		document.getElementById("stopwatch").innerHTML = "Timer: -";
		//reset variables for starting a (new) game
		done = false;
		rXArr = [];
		rYArr = [];
		xArr = [];
		yArr = [];
		//retrieve the amount of card pairs needed for the game
		var partArray = gallery.slice(0,userNum);
		var dupArray = gallery.slice(0,userNum);
		var combinedArray = partArray.concat(dupArray);
		//shuffle cards around
		var shuffledArray = shuffleMe(combinedArray);
		//update messages with a default of 0 matches at the start
		document.getElementById("note").innerHTML = "";
		document.getElementById("wrongMatch").innerHTML = "Take this time to memorize where cards are placed!";
		document.getElementById("button").innerHTML = "New Game";
		document.getElementById("response").innerHTML = "You are now going <br />to match " + userNum + " pairs!";
		document.getElementById("matches").innerHTML = "Matches: 0";
		//set variable for easy calling
		var table = document.getElementById("picTable");
		//for loop with rows and columns to add the amount of cards needed
		for (var x=0;x<userNum/2;x++){
			//insert new row
			var row = table.insertRow(table.length);
			for (var y=0;y<4;y++){
				//insert cell
				var col = row.insertCell(y);
				//set cell to respective image
				col.innerHTML = "<img src='" + shuffledArray[index].src + "' alt='card'/>";
				//add event listener for when the user clicks in order to match the images
				table.rows[x].cells[y].addEventListener("click", function(){showImage(this.parentNode.rowIndex,this.cellIndex,userNum)});
				//increment to add a different index/image next loop
				index++;
			}
		}
		//set time message and delay in hiding the cards depending on the amount of pairs
		if (userNum == 8){
			setTimeout(function(){ hideCards(); }, 3000);
			document.getElementById("timeLimit").innerHTML = "You have 2 minutes to find all pairs.";
		}
		else if (userNum == 10){
			setTimeout(function(){ hideCards(); }, 5000);
			document.getElementById("timeLimit").innerHTML = "You have 2 and a half minutes to find all pairs.";
		}
		else {
			var stopTime = 180;
			setTimeout(function(){ hideCards(); }, 8000);
			document.getElementById("timeLimit").innerHTML = "You have 3 minutes to find all pairs.";
		}
	}
}

var stopTime = 0;
//timer function
function updateTimer(){
	//if game is over clear timer
	if (done == true){
		clearInterval(timing);
		return;
	}
	//default value for counter
	var countCards = 0;
	//retrieve table
	var table = document.getElementById("picTable");
	//run through loop to find total amount of cards
	for (var i=0;i<table.rows.length;i++){
		for (var c=0;c<table.rows[i].cells.length;c++){
			countCards++;
		}
	}
	//set time limit according to amount of matches needed
	if (countCards/2 == 8){
		stopTime = 120;
	}
	else if (countCards/2 == 10){
		stopTime = 150;
	}
	else if (countCards/2 == 12){
		stopTime = 180;
	}
	//set interval for timing
	var timing = setInterval(function(){
		//if time limit is reached before matches are found
		if (stopTime < 1 && matches != countCards/2){
			//clear interval
			clearInterval(timing);
			//play lose sound
			loseSound.play();
			//tell them the game is over and time is up
			document.getElementById("response").innerHTML = "Game over!";
			document.getElementById("timeLimit").innerHTML = "Your time is up.";
			//show final time
			document.getElementById("stopwatch").innerHTML = "Timer: " + stopTime;
			//set game to done so this function won't be called
			done = true;
		}
		else if (stopTime > 1 && matches == countCards/2){
			//play win game sound
			winSound.play();
			//tell them they won
			document.getElementById("response").innerHTML = "You win!";
			document.getElementById("timeLimit").innerHTML = "Nice job!";
			//clear interval
			clearInterval(timing);
			//set done to true as game is now over
			done = true;
		}
		//otherwise show updated time
		else {
			document.getElementById("stopwatch").innerHTML = "Timer: " + stopTime;
		}
		//subtract time if game isnt over
		if (done == false){
			stopTime--;
		}
	}, 1000);
}

//shuffles the array
function shuffleMe(array){
	//loop through the whole array
	for (var x=0;x<array.length;x++){
		//get a randomized number within the array's element range
		var newIndex = Math.floor(Math.random()*array.length);
		//set temp value to equal array[x] as a placeholder
		var temp = array[x];
		//set the current index to the new index value
		array[x] = array[newIndex];
		//set the new index to the original value at index x
		array[newIndex] = temp;
	}
	//return shuffled array
	return array;
}

//default variables for matching
//used for checking current cards that are selected
var xArr = new Array();
var yArr = new Array();
//default value for matches and pairs
var matches = 0;
var pair = false;

//used for adding matched pairs for data checking
var rXArr = new Array();
var rYArr = new Array();


//on click function
function showImage(x,y,userNum){
	//if game is done, exit out of function
	if (done == true){
		return;
	}
	//while time isn't up and the game is still going
	//set variable for easy calling
	var table = document.getElementById("picTable");
	//show card selected
	table.rows[x].cells[y].style.opacity = 1;
	//if no other card selected (aka first card picked)
	if (xArr.length == 0){
		//add x value to array for data and checking
		xArr.push(x);
		//add y to array for data and checking
		yArr.push(y);
		//exit
		return;
	}
	//otherwise if it is the second card selected
	else {
		//run through all the cards
		for (var i=0;i<table.rows.length;i++){
			for (var c=0;c<table.rows[i].cells.length;c++){
				//when current card is found when running through all cells, go to next loop
				if (i == x && c == y){
						continue;
				}
				//otherwise when the first card's cell is found
				else if (i == xArr[0] && c == yArr[0]){
					//show both cards
					table.rows[x].cells[y].style.opacity = 1;
					table.rows[i].cells[c].style.opacity = 1;
					//if their details are equal to each other (the images)
					if (table.rows[i].cells[c].innerHTML == table.rows[x].cells[y].innerHTML){
						//play right sound
						rightSound.play();
						//set both card backgrounds to green to indicate it is a match
						table.rows[x].cells[y].style.backgroundColor = "green";
						table.rows[i].cells[c].style.backgroundColor = "green";
						//only increment if the max matches have not been reached
						if (matches == 8 && userNum == 8){
							matches = 8;
						}
						else if (matches == 10 && userNum == 10){
							matches = 10;
						}
						else if (matches == 12 && userNum == 12){
							matches = 12;
						}
						else {
							matches++;
						}
						//update matches count
						document.getElementById("matches").innerHTML = "Matches: " + matches;
						//set value to true because it's a match
						pair = true;
						//tell user it is a match
						document.getElementById("wrongMatch").innerHTML = "It's a match!";
						//add both cards into the arrays for matched pairs
						rXArr.push(i);
						rYArr.push(c);
						rXArr.push(x);
						rYArr.push(y);
					}
					//if not a match
					else {
						//if the game is over and won, keep the message the same
						if (matches == 8 && userNum == 8){
							document.getElementById("wrongMatch").innerHTML = "It's a match!";
						}
						else if (matches == 10 && userNum == 10){
							document.getElementById("wrongMatch").innerHTML = "It's a match!";
						}
						else if (matches == 12 && userNum == 12){
							document.getElementById("wrongMatch").innerHTML = "It's a match!";
						}
						//otherwise
						else {
							//play wrong sound
							wrongSound.play();
							//clear arrays
							xArr = [];
							yArr = [];
							//show both cards
							reShow(x,y,i,c);
							//set both card backgrounds to red to indicate it is not a match
							table.rows[x].cells[y].style.backgroundColor = "red";
							table.rows[i].cells[c].style.backgroundColor = "red";
							//tell user it doesn't match
							document.getElementById("wrongMatch").innerHTML = "They don't match!";
							//wait for a bit before hiding the cards again
							setTimeout(function(){ reHide(); }, 1000);
						}
					}
				}
			}
		}
		//if pair is matched
		if (pair == true){
			//clear arrays
			xArr = [];
			yArr = [];
		}
	}
	//set default value for next pair
	pair = false;
	//if max pairs is reached
	if (matches == userNum){
		//play win game sound
		winSound.play();
		//tell them they won
		document.getElementById("response").innerHTML = "You win!";
		document.getElementById("timeLimit").innerHTML = "Nice job!";
		//reset arrays
		rXArr = [];
		rYArr = [];
		//set game being done to true
		done = true;
		updateTimer();
	}
}

//show the clicked cards - wrong match
function reShow(x,y,i,c){
	//if not a pair
	if (pair == false){
		//set variable for easy calling
		var table = document.getElementById("picTable");
		//show both chosen cards
		table.rows[x].cells[y].style.opacity = 1;
		table.rows[i].cells[c].style.opacity = 1;
	}
}

//rehide cards that are not matches
function reHide(){
	//update HTML to question with given id
	document.getElementById("wrongMatch").innerHTML = "Will they match?";
	//set default value to check if the card that will be checked is not matched
	var isWrong = true;
	//set variable for easy calling
	var table = document.getElementById("picTable");
	//run through all cards
	for (var i=0;i<table.rows.length;i++){
		for (var c=0;c<table.rows[i].cells.length;c++){
			//run through all matched images
			for (var x=0; x<rXArr.length;x++){
				//if found in matched images array
				if (i == rXArr[x] && c == rYArr[x]){
					//keep the card shown
					table.rows[i].cells[c].style.opacity = 1;
					//set card background to green (right/matched)
					table.rows[i].cells[c].style.backgroundColor = "green";
					//set checking variable to false because the card is matched
					isWrong = false;
					//break out of the loop
					break;
				}
				//otherwise if not found
				else {
					//set value to true
					isWrong = true;
					//continue onto next loop
					continue;
				}
			}
			//if card is not matched
			if (isWrong == true){
				//hide card
				table.rows[i].cells[c].style.opacity = 0;
				//set card background to white (neutral)
				table.rows[i].cells[c].style.backgroundColor = "white";
			}
		}
	}
}

//hide all cards
function hideCards(){
	//update message
	document.getElementById("wrongMatch").innerHTML = "Will they match?";
	//run through all cards to set them to invisible
	var table = document.getElementById("picTable");
	for (var i=0;i<table.rows.length;i++){
		for (var c=0;c<table.rows[i].cells.length;c++){
			table.rows[i].cells[c].style.opacity = 0;
		}
	}
	//call timer
	updateTimer();
}

//FOR TESTING PURPOSES ONLY - show all cards
function showCards(){
	//run through all cards to set them to visible
	var table = document.getElementById("picTable");
	for (var i=0;i<table.rows.length;i++){
		for (var c=0;c<table.rows[i].cells.length;c++){
			table.rows[i].cells[c].style.opacity = 1;
		}
	}
}


//car images gallery
var gallery = new Array();

gallery[0] = new Image();
gallery[0].src = "beidou.jpg";

gallery[1] = new Image();
gallery[1].src = "chongyun.jpg";

gallery[2] = new Image();
gallery[2].src = "amber.jpg";

gallery[3] = new Image();
gallery[3].src = "jean.jpg";

gallery[4] = new Image();
gallery[4].src = "lisa.jpg";

gallery[5] = new Image();
gallery[5].src = "kaeya.jpg";

gallery[6] = new Image();
gallery[6].src = "diluc.jpg";

gallery[7] = new Image();
gallery[7].src = "xiangling.jpg";

gallery[8] = new Image();
gallery[8].src = "diona.jpg";

gallery[9] = new Image();
gallery[9].src = "barbara.jpg";

gallery[10] = new Image();
gallery[10].src = "dainsleif.jpg";

gallery[11] = new Image();
gallery[11].src = "noelle.jpg";