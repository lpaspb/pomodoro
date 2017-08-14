var DOMStrings = {
 
 breakLabel : document.querySelector("#break-value"),
 sessionLabel : document.querySelector("#session-value"),
 timerValue : document.querySelector("#timer-value"),
 timerLabel : document.querySelector("#timer-label")

}

var Slider = function(label, time) {
	
	this.label = label;
	this.time = time;
}

Slider.prototype.makeOperation = function (operator) {
		
	switch (operator) {	
		
		case "+" : return this.time = this.time + 1;
		case "-" : return this.time = this.time - 1;
	}	
	
}

Slider.prototype.pause = function () {
	
	clearInterval(counter);
}

String.prototype.toHHMMSS = function () {
	
	var sec_num = parseInt(this, 10);
	var hours = Math.floor(sec_num/ 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
	
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
}

function countDown () {

    if (parseInt(time) < 0) {
        //clearInterval(counter);
		changeTimer()
        //return;
    }
    var temp = time.toHHMMSS();
    time = (parseInt(time) - 1).toString();

    DOMStrings.timerValue.innerHTML = temp;
	
	
}

var breakTime = new Slider("Break Length", 5);

var sessionTime = new Slider("Session Length", 25);

var timer = new Slider("Session", sessionTime.time);

var time = (2).toString();

var counter;

var isPause = true;
var isSession = true;

function changeTimer () {
	
	if (time == "-1" && DOMStrings.timerLabel.innerHTML == "Session") {
		
		DOMStrings.timerLabel.innerHTML = "Break";
		DOMStrings.timerValue.innerHTML = breakTime.time;
		time = (breakTime.time * 60).toString();
		
		console.log(DOMStrings.timerLabel, time);
		
	} else if (time == "-1" && DOMStrings.timerLabel.innerHTML == "Break") {
		
		DOMStrings.timerLabel.innerHTML = "Session";
		DOMStrings.timerValue.innerHTML = sessionTime.time;
		time = (sessionTime.time * 60).toString();
		
		console.log(DOMStrings.timerLabel, time);
	}
	
}

function setUpEventListeners () {
	
document.querySelector("#session-plus").addEventListener("click", function(){
	
	if (isPause == true) {
	
		sessionTime.makeOperation("+");
	
	if (DOMStrings.timerLabel.innerHTML == "Session" ) {
		
		time = (sessionTime.time * 60).toString();
	
		DOMStrings.timerValue.innerHTML = sessionTime.time;
		
		}
	
	updateValues(breakTime.time, sessionTime.time);
	}
});
document.querySelector("#session-minus").addEventListener("click", function(){
	
	if (sessionTime.time > 1) {
		
		if (isPause == true) {
		
		sessionTime.makeOperation("-");
		
		
		if (DOMStrings.timerLabel.innerHTML == "Session" ) {
		
		time = (sessionTime.time * 60).toString();
	
		DOMStrings.timerValue.innerHTML = sessionTime.time;
		
		}
			
		updateValues(breakTime.time, sessionTime.time);
	}
	}
	
});
document.querySelector("#break-plus").addEventListener("click", function(){
    
	if (isPause == true) {
	
		breakTime.makeOperation("+");
	
	
	if (DOMStrings.timerLabel.innerHTML == "Break" ) {
		
		time = (breakTime.time * 60).toString();
	
		DOMStrings.timerValue.innerHTML = breakTime.time;
	
	}
	
	}
	updateValues(breakTime.time, sessionTime.time);
});
document.querySelector("#break-minus").addEventListener("click", function(){
	
	
	
	if (breakTime.time > 1) {
		
		if (isPause == true) {
		
		breakTime.makeOperation("-");
		
		
		if (DOMStrings.timerLabel.innerHTML == "Break") {
			
			time = (breakTime.time * 60).toString();
		
			DOMStrings.timerValue.innerHTML = breakTime.time;
		}
		
		updateValues(breakTime.time, sessionTime.time);
		
		}
	}
	
});

DOMStrings.timerValue.addEventListener("click", function(){
	
	if (isPause == true) {
	
	counter = setInterval(countDown, 1000);
	
	isPause = false;
	
	} 
	
	else if (isPause == false) {
		
	clearInterval(counter);
	
	isPause = true;
	}
})

}

function updateValues(breakTime, sessionTime) {
	
	DOMStrings.breakLabel.innerHTML = breakTime;
	DOMStrings.sessionLabel.innerHTML = sessionTime;
}

updateValues(breakTime.time, sessionTime.time);

setUpEventListeners ();









