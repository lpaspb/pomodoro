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

function setUpEventListeners () {
	
document.querySelector("#session-plus").addEventListener("click", function(){
	
	if (GameState.isPause == true) {
	
		sessionTime.makeOperation("+");
	
	if (DOMStrings.timerLabel.innerHTML == "Session" ) {
		
		timer.time = (sessionTime.time * 60).toString();
	
		DOMStrings.timerValue.innerHTML = sessionTime.time;
		
		}
	
	breakTime.updateLength();
    sessionTime.updateLength();
	}
});
document.querySelector("#session-minus").addEventListener("click", function(){
	
	if (sessionTime.time > 1) {
		
		if (GameState.isPause == true) {
		
		sessionTime.makeOperation("-");
		
		
		if (DOMStrings.timerLabel.innerHTML == "Session" ) {
		
		timer.time = (sessionTime.time * 60).toString();
	
		DOMStrings.timerValue.innerHTML = sessionTime.time;
		
		}
			
		breakTime.updateLength();
        sessionTime.updateLength();
	}
	}
	
});
document.querySelector("#break-plus").addEventListener("click", function(){
    
	if (GameState.isPause == true) {
	
		breakTime.makeOperation("+");
	
	
	if (DOMStrings.timerLabel.innerHTML == "Break" ) {
		
		timer.time = (breakTime.time * 60).toString();
	
		DOMStrings.timerValue.innerHTML = breakTime.time;
	
	}
	
	}
	breakTime.updateLength();
    sessionTime.updateLength();
});
document.querySelector("#break-minus").addEventListener("click", function(){
	
	
	
	if (breakTime.time > 1) {
		
		if (GameState.isPause == true) {
		
		breakTime.makeOperation("-");
		
		
		if (DOMStrings.timerLabel.innerHTML == "Break") {
			
			timer.time = (breakTime.time * 60).toString();
		
			DOMStrings.timerValue.innerHTML = breakTime.time;
		}
		
		breakTime.updateLength();
        sessionTime.updateLength();
		
		}
	}
	
});

DOMStrings.timerValue.addEventListener("click", function(){
	
	if (GameState.isPause == true) {
	
	counter = setInterval(function(){timer.countDown()} , 1000);
		
	GameState.isPause = false;
	
	} 
	
	else if (GameState.isPause == false) {
		
	clearInterval(counter);
	
	GameState.isPause = true;
	
	}
})

}

var DOMStrings = {
 
 breakLabel : document.querySelector("#break-value"),
 sessionLabel : document.querySelector("#session-value"),
 timerValue : document.querySelector("#timer-value"),
 timerLabel : document.querySelector("#timer-label")

}

var GameState = {
	
	isPause: true,
	isSession : true
}

var Slider = function(label, time) {
	
	this.label = label;
	this.time = time;
}
var Timer = function(label, time) {
	
	this.label = label;
	this.time = time;
	
}

Slider.prototype.makeOperation = function (operator) {
		
	switch (operator) {	

		case "+" : return this.time = this.time + 1;
		case "-" : return this.time = this.time - 1;
	}	
	
}
Slider.prototype.updateLength = function() {
	
	if (breakTime) {
		DOMStrings.breakLabel.innerHTML = breakTime.time;
	} 
	
	if (sessionTime) {
		DOMStrings.sessionLabel.innerHTML = sessionTime.time;
	}
}

Timer.prototype.countDown = function () {

	if (parseInt(this.time) < 0) {
		this.changeTimer()
    }
    var temp = (this.time).toHHMMSS();
	this.time = (parseInt(this.time) - 1).toString();
    DOMStrings.timerValue.innerHTML = temp;

	
}
Timer.prototype.updateTimer = function(time , label) {
	
	DOMStrings.timerLabel.innerHTML = label;
	DOMStrings.timerValue.innerHTML = time;
}
Timer.prototype.changeTimer = function  () {
	
	
	
	if (this.time == "-1" && this.label == "Session") {
		
		this.label = "Break";
		this.time = (breakTime.time * 60).toString();

		this.updateTimer(breakTime.time, this.label)
	
	} else if (this.time == "-1" && this.label == "Break") {
		
		this.label = "Session";
		this.time = (sessionTime.time * 60).toString();
		
		this.updateTimer(sessionTime.time, this.label);
		
	}
	
}


var breakTime = new Slider("Break Length", 5);
var sessionTime = new Slider("Session Length", 25);

var timer = new Timer("Session", (sessionTime.time * 1).toString());


var counter;

breakTime.updateLength();
sessionTime.updateLength();

setUpEventListeners ();
