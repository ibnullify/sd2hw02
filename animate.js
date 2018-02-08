//Ibnul Jahan
//SoftDev2 pd07
//K01 -- They lock us in the tower whenever we get caught                       //2018-02-08

var frameNum;//Most recent animation frame ID
var growing;//Boolean to tell whether the ball is in growing or shrinking mode
var radius;//The current radius to draw the circle with
var maxRad;//The maximum radius to grow to
var minRad;//The minimum radius to shrink to

//Get the console, and get the context
var c = document.getElementById("slate");
var ctx = c.getContext("2d");

//Get the two buttons from the DOM and set their onclick functions
//When the start button is pressed, start the animation
var start = document.getElementById("start");
start.addEventListener("click", function(){startAnimation();});
//When the stop button is pressed, stop the animation
var stop = document.getElementById("stop");
stop.addEventListener("click", function(){stopAnimation();});


//Staying in line with the Processing comparison made in class
var setup = function(e){
    //Initializes variable
    frameNum = -1;
    growing = true;
    radius = 10;
    maxRad = 100;
    minRad = 0;

    //Draws first circle
    ctx.beginPath();
    ctx.arc(300, 300, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

}

//Sets up the variables and starts the animation
var startAnimation = function(){
    setup();
    window.requestAnimationFrame(setSize);
}
//Throws out the frame and stops the animation
var stopAnimation = function(e){
    window.cancelAnimationFrame(frameNum);
}

//Draws the ball at a new size
var setSize = function(e){
    clear(e);
    //Changes size of the circle
    if (growing) {
	grow();
    } else {
	shrink();
    }
    console.log(radius);

    //Draws circle at the new size
    ctx.beginPath();
    ctx.arc(300, 300, radius, 0, Math.PI * 2);
    //The fillStyle is set in the grow and shrink functions
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    //recursive call below to make frames chain
    frameNum = window.requestAnimationFrame(setSize);
    console.log("This is the current Frame ID: " + frameNum);
}

//Increases the radius of the ball
var grow = function(){
    var increment = 3;
    //check if the next rendering of the circle would be an appropriate size
    if (radius+increment < maxRad) {
	radius+=increment;
    } else {
	growing = false;
	ctx.fillStyle = 'red';
	shrink();
    }
}

//Decreases the radius of the ball
var shrink = function(){
    var increment = 3;
    //check if the next rendering of the circle would be an appropriate size
    if (radius-increment > minRad) {
	radius-=increment;
    } else {
	growing = true;
	ctx.fillStyle = 'blue';
	grow();
    }
}

//Throws out the last frame of the animation
//frameNum should be the most recent result of window.requestAnimationFrame
var stopAnimation = function(e){
    window.cancelAnimationFrame(frameNum);
}

//Used in between frames to prevent that streaking tail
var clear = function(e){
    //e.preventDefault();
    ctx.clearRect(0,0, 600,600);
}


