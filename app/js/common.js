


var breakLabel = document.querySelector("#break-value");
var sessionLabel = document.querySelector("#session-value");
var timerValue = document.querySelector("#timer-value");
var timerLabel = document.querySelector("#timer-label");

var sessionPlus = document.querySelector("#session-plus");
var sessionMinus = document.querySelector("#session-minus");

var breakPlus = document.querySelector("#break-plus");
var breakMinus = document.querySelector("#break-minus");







breakPlus.addEventListener("click", change);
breakMinus.addEventListener("click", change);
sessionPlus.addEventListener("click", change);
sessionMinus.addEventListener("click", change);

var isSession = true;
var isPause = false;



var breakLength = 5;
var sessionLength = 25;
var timerLength = 0;

var ss = 60;

var timer;
timerValue.addEventListener("click", function() {

  if (isPause == false) {
 
  timer = setInterval(function(){
 
  if (timerLength == 0) {

  changeTimer ();
    
  }
  
  if (timerLength > 0) {
    
  ss = ss - 1;
	  
	  if (ss == 0) {
  
		  timerLength = timerLength - 1;
		  
		  ss = 59;
		  
	  }
	  
	  if (ss < 10) {
			  
			  ss = "0" + ss;
			  
		  }
	timerValue.innerHTML = (timerLength - 1) + ":" + ss; 
	  
	  console.log(timerLength);
    
  }

  
}, 1000);


    isPause = true;
    
    
  } 
  
  else if (isPause == true) {
    
    clearInterval(timer);
    
    isPause = false;
  } 

  
});



function changeTimer () {
  if (isSession == false) {

    timerLength = breakLength;
  
    timerLabel.innerHTML = "Break";

    timerValue.innerHTML = timerLength;

    isSession = true;  
   
    }
 else if (isSession == true) {
  
   timerLength = sessionLength;
  
   timerLabel.innerHTML = "Session";

   timerValue.innerHTML = timerLength;
  
   isSession = false;
 
    } 
}
  

function update (breakVal, sessionVal) { 
  
  breakLabel.innerHTML = breakVal;
  
  sessionLabel.innerHTML = sessionVal;
}

function updateTimer (label) { 

   timerLabel.innerHTML = label;

   timerValue.innerHTML = timerLength;

  
}


function change () {
  
	if (isPause == false) {
	
  if (this.id == "break-plus" || this.id == "break-minus" ) {
    
    breakLength = eval(breakLength + this.innerHTML + 1);
    
    if (isPause == false &&  timerLabel.innerHTML == "Break") {

        timerValue.innerHTML = breakLength;
		
		timerLength = breakLength;
		
		ss = 60;

    }
    
    

    if (breakLength < 1) {
      
      breakLength = 1;
 
    }
  
  
  } else if (this.id == "session-plus" || this.id == "session-minus" ) {
    
    sessionLength = eval(sessionLength + this.innerHTML + 1);
    
    if (isPause == false &&  timerLabel.innerHTML == "Session") {
      
      timerValue.innerHTML = sessionLength;
      
	  timerLength = sessionLength;
		
	ss = 60;
		
		
    }
    
    if (sessionLength < 1) {
      
      sessionLength = 1;

    }
   
  }
  

}
  update(breakLength, sessionLength);
}
update(breakLength, sessionLength);

