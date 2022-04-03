function addEmployee(){
	//bool value to use for checking later
	var eraseData = true;
	
	//ask how many hours the employee worked by using a prompt
	var hours = prompt("How many hours did they work? Enter -1 to stop.");
	
	//check if hours is a valid number (not empty or something other than a number)
	if (hours == "" || isNaN(hours) == true){
		//reprompt if not a valid number
		var hours = prompt("How many hours did they work? Enter -1 to stop.");
	}
	while (hours != -1){
		eraseData = false;
		//retrieve table element
		var table = document.getElementById("employeeTable");
		
		//set employee number to current row index
		var index = table.rows.length;
		
		//set default values
		var extraHours = 0;
		var weeklyPay = 0;
		
		//check if there was any overtime (more than 40 hours)
		if (hours > 40){
			//if so, find how many hours are overtime
			extraHours = hours - 40;
			//weekly pay is equal to 40 hours of regular rate 
			//plus 1.5x the rate for extra hours worked
			weeklyPay = (40*15) + (extraHours*15*1.5);
		}
		//otherwise, if no overtime
		else {
			//weekly pay is equal to the amount of hours work times the regular rate
			weeklyPay = hours*15;
		}
		
		//insert new row
		var row = table.insertRow(index);
		
		//add new employee number to first column of that row
		var addIndex = row.insertCell(0);
		addIndex.innerHTML = index;
		
		//add hours worked to second column of that row
		var addHours = row.insertCell(1);
		addHours.innerHTML = hours;
		
		//add pay to third column of that row
		var addPay = row.insertCell(2);
		addPay.innerHTML = "$" + weeklyPay;
		
		//ask how many hours the employee worked by using a prompt
		var hours = prompt("How many hours did they work? Enter -1 to stop.");
		
		//check if hours is a valid number (not empty or something other than a number)
		if (hours == "" || isNaN(hours) == true){
			//reprompt if not a valid number
			var hours = prompt("How many hours did they work? Enter -1 to stop.");
		}
	}
	//check if any data was inputted before stopping
	if (eraseData == true && hours == -1){
		//if -1 is entered as the first input, clear table
		while (document.getElementById("employeeTable").rows.length > 1){
			document.getElementById("employeeTable").deleteRow(1);
		}
	}
}