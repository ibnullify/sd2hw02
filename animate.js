//Ibnul Jahan
//SoftDev2 pd07
//K03 -- They lock us in the tower whenever we get caught                   //2018-02-09


//-----------Variables for Sizing
var frameNum;//Most recent animation frame ID
var growing;//Boolean to tell whether the ball is in growing or shrinking mode
var radius;//The current radius to draw the circle with
var maxRad;//The maximum radius to grow to
var minRad;//The minimum radius to shrink to

//-----------Variables for Bouncing
var xcor;//X-coordinate
var ycor;//Y-coordinate 
var dx;//Speed in the x direction
var dy;//Speed in the y direction
var bounceRad;//Radius for the bouncing ball

//Get the console, and get the context
var c = document.getElementById("slate");
var ctx = c.getContext("2d");

//Get the two buttons from the DOM and set their onclick functions
//When the size button is pressed, start the animation
var size = document.getElementById("size");
size.addEventListener("click", function(){startSizeAnimation();});
//When the bounce button is pressed, start the animation
var bounce = document.getElementById("bounce");
bounce.addEventListener("click", function(){startBounceAnimation();});
//When the stop button is pressed, stop the animation
var stop = document.getElementById("stop");
stop.addEventListener("click", function(){stopAnimation();});


//Staying in line with the Processing comparison made in class
var setup = function(e){
    //Initializes variables for sizing
    frameNum = -1;
    growing = true;
    radius = 10;
    maxRad = 100;
    minRad = 0;

    //Initializes variables for bouncing
    dx = Math.floor(Math.random() * 5);
    dy = Math.floor(Math.random() * 5);
    xcor = 300;
    ycor = 300;
    console.log("Inital dx,dy: " + dx + "," + dy);

    //Draws first circle
    ctx.beginPath();
    ctx.arc(300, 300, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

}

//Sets up the variables and starts the animation
var startSizeAnimation = function(){
    setup();
    size.disabled = true;
    window.requestAnimationFrame(setSize);
}

//Sets up the variables and starts the animation
var startBounceAnimation = function(){
    setup();
    bounce.disabled = true;
    window.requestAnimationFrame(setBounce);
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
    ctx.arc(xcor, ycor, radius, 0, Math.PI * 2);
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

//Draws the ball at a new position based on the speed
var setBounce = function(e){
    clear(e);
    move();
    console.log("Coordinate: " + xcor + "," + ycor);
    
    //Draws circle at the new coordinates
    ctx.beginPath();
    ctx.arc(xcor, ycor, radius, 0, Math.PI * 2);
    //The fillStyle is set in the move function
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    //recursive call below to make frames chain
    frameNum = window.requestAnimationFrame(setBounce);
    console.log("This is the current Frame ID: " + frameNum);

}

//Checks if the ball needs to be redirected or bounced
var move = function(e){
    //Boundaries for x are 0 and c.width
    //Boundaries for y are 0 and c.height
    if (xcor - radius + dx <= 0 || xcor + radius + dx >= c.width) {
	dx*=-1;
	ctx.fillStyle = 'orange';
    }
    if (ycor - radius + dy <= 0 || ycor + radius + dy >= c.height) {
	dy*=-1;
	ctx.fillStyle = 'pink';
    }
    xcor+=dx;
    ycor+=dy;

}

//Throws out the last frame of the animation
//frameNum should be the most recent result of window.requestAnimationFrame
var stopAnimation = function(e){
    window.cancelAnimationFrame(frameNum);
    window.cancelAnimationFrame(frameNum-1);
}

//Used in between frames to prevent that streaking tail
var clear = function(e){
    //e.preventDefault();
    ctx.clearRect(0,0, 600,600);
}


