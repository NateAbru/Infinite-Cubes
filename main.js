let btnContainer = document.getElementById("game-btns-container");
let coverDiv = document.getElementById('cover-page');
let gameBtns = document.getElementById("game-btns");
let options = document.getElementById('options');
let restartBtn = document.getElementById("restart-btns");
let pauseBtn = document.getElementById("pause-btn");
let pauseBtnContainer = document.getElementById("pause-btn-container");
let resumeBtn = document.getElementById("resume-btn");
let seconds = document.getElementById('seconds');
let minutes = document.getElementById('minutes');
let timeProgressBar = document.getElementById('time-progress-bar');
let ascendProgressBar = document.getElementById('ascend-progress-bar');
let realityProgressBar = document.getElementById('reality-progress-bar');
let eraserProgressBar = document.getElementById('eraser-progress-bar');
let dropAudio = document.getElementById("drop_audio");
dropAudio.playbackRate = 1.5;
let scoreAudio = document.getElementById("score_audio");
let realityShiftAudio = document.getElementById("realityshift");
let scoreDisplay = document.getElementById("score");
let levelDisplay = document.getElementById("level");
let countDownDisplay = document.getElementById('countdown');
const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const canvas2 = document.getElementById("static_field");
const context2 = canvas2.getContext("2d");
const canvas3 = document.getElementById("hold_field");
const context3 = canvas3.getContext("2d");
let viewWidth = innerWidth;
let viewHeight = innerHeight;

let countDown = 3;
const powerLimit = 20;
let freezeCount = 0;
let ascendCount = 0;
let eraserCount = 0;
let realityCount = 0;
let powerUpsReady = true;
let total_PU_Used = 0;
let play_btn_activated = false;
let on_hold = false;
let shape_on_hold = shapeMaker();
let shape_switch = 0;
let gameSeconds = 0;
let gameMinutes = 0;
let gameTimerID = null;
let timeStopActivated = false;
let timeStop_interval;
let timeStop_y;
let game_paused = false;
let paused_interval = false;
const numberOfRows = 20;
const numberOfCols = 12;
const borderSize = 0.2;
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
let scoreCount = 0;
let streak = false;
let streakCount = 0;
let level = 1;
let rows = 0;
let in_Play = false;
let shape_onDeck1 = shapeMaker();
let shape_onDeck2 = shapeMaker();
let shape_onDeck3 = shapeMaker();
let shape_onDeck4 = shapeMaker();
let scoresent = false;
let animID;
let max_drop_used = false;
let c_dropTime;
let gradient = context.createLinearGradient(0,6,10,6);
gradient.addColorStop(0,'rgb(255,0,255)');
gradient.addColorStop(1,'rgb(0,164,243)');

scoreDisplay.textContent = scoreCount.toLocaleString('en-US');
levelDisplay.textContent = level;

let dotsContainer = document.getElementById('dots-container');
for(let i = 0; i < 300; i++){
  let dot = document.createElement('DIV');
  dot.className = 'dots';
  dotsContainer.appendChild(dot);
}
let outerCircle = document.querySelectorAll('.outer-circle');
let numSlashes = powerLimit;
let deg = 360 / numSlashes;
outerCircle.forEach((circle,index)=>{
	let slashes ='';
	let powerAssignment ='';
	if(index === 0) powerAssignment = 'time';
	if(index === 1) powerAssignment = 'ascend';
	if(index === 2) powerAssignment = 'reality';
	if(index === 3) powerAssignment = 'eraser';
	for(let i = 1; i <= numSlashes;i++)
	{	
		slashes+=`<div id="${powerAssignment}-${i}" class="slash slash-${i}" style="--i:${i}; --r:${deg}deg;"></div>`;
	}
	circle.innerHTML += slashes;
});
function openOptions()
{
  gameBtns.setAttribute('hidden', true);
  options.removeAttribute('hidden');
}
function returnFromOptions()
{
	options.setAttribute('hidden', true);
  	gameBtns.removeAttribute('hidden');
}
let rules = document.getElementById('rules');
let controls = document.getElementById('controls');
let leaderboard = document.getElementById('leaderboard-official');
function openRules(){
  rules.setAttribute('style', 'height:60vh;');
}
function closeRules(){
  rules.setAttribute('style', 'height:0;');
}
function openControls(){
  controls.setAttribute('style', 'height:60vh;');
}
function closeControls(){
  controls.setAttribute('style', 'height:0;');
}
let leaderboardSlots = document.getElementsByClassName('leaderboard-slots');
let leaderboardData = document.getElementsByClassName('leaderboard-data');
function openLeaderboard(){
  leaderboard.setAttribute('style', 'height:45%;');
  for(let i = 0; i < leaderboardSlots.length;i++)
  {
  	leaderboardSlots[i].removeAttribute('hidden');
  }
}
function closeLeaderboard(){
  leaderboard.setAttribute('style', 'height:0;');
  for(let i = 0; i < leaderboardSlots.length;i++)
  {
  	leaderboardSlots[i].setAttribute('hidden', true);
  }
}
let pageW;
let deviceType; //variable to determine mouse coordinates depending on device size for moving the pieces
gameAreaSizing();
let middleColumn = document.getElementById("middleColumn");
window.addEventListener('resize', ()=>{
  viewWidth = innerWidth;
  gameAreaSizing();
});
//Setting game view size for different devices
function gameAreaSizing()
{
  pageW = viewWidth;
  if (pageW >= 359 && pageW <= 399) //Small devices
  {
    canvas.setAttribute("width", 216);
    canvas.setAttribute("height", 360);
    context.scale(18,18);

    canvas2.setAttribute("width", 70);
    canvas2.setAttribute("height", 224);
    context2.scale(14,14);

    canvas3.setAttribute("width", 70);
    canvas3.setAttribute("height", 84);
    context3.scale(14,14);
    deviceType = "small";
  }
  else if (pageW >= 400 && pageW <= 485) //Small devices
  {
    canvas.setAttribute("width", 252);
    canvas.setAttribute("height", 420);
    context.scale(21,21);

    canvas2.setAttribute("width", 70);
    canvas2.setAttribute("height", 224);
    context2.scale(14,14);

    canvas3.setAttribute("width", 70);
    canvas3.setAttribute("height", 84);
    context3.scale(14,14);
    deviceType = "small";
  }
  else if (pageW >= 485 && pageW <= 604) //medium devices
  {
    canvas.setAttribute("width", 300);
    canvas.setAttribute("height", 500);
    context.scale(25,25);

    canvas2.setAttribute("width", 90);
    canvas2.setAttribute("height", 240);
    context2.scale(15,15);

    canvas3.setAttribute("width", 90);
    canvas3.setAttribute("height", 90);
    context3.scale(15,15);
    deviceType = "medium";
  }
  else if(pageW >= 605)//Desktops
  {
    canvas.setAttribute("width", 300);
    canvas.setAttribute("height", 500);
    context.scale(25, 25);
    canvas2.setAttribute("width", 150);
    canvas2.setAttribute("height", 350);
    context2.scale(25, 25);
    canvas3.setAttribute("width", 150);
    canvas3.setAttribute("height", 150);
    context3.scale(25,25);
    deviceType = "large";
  }
}
const player = {
   pos: {x: 5, y: 0},
   matrix: emptyShape(),
}
const grid = createMatrix(12, 20);
const static_grid = createMatrix(6,16);
const hold_grid = createMatrix(6,6);
document.getElementById("middleColumn").addEventListener('contextmenu', e => e.preventDefault()); //prevent default right click action
function mouse_button(e) //left and right mouse click game function
{
	if(in_Play && !game_paused && pageW > 768)
	{
		var click_value = e.buttons;
		if(click_value == 1)
		{
			maxDrop();
		}
		else if(click_value == 2)
		{
			shapeRotate();
      if(colliderFunc(grid, player)) antiRotateFunc();
			e.preventDefault();
		}
	}
}
canvas.addEventListener("mousemove", function(e){ //mouse controller listener
	mouse_move(e);
});
function mouse_move(e)
{
	if((play_btn_activated) && (in_Play) && (!game_paused))
	{
		let canvaspos = canvas.getBoundingClientRect();
  		let current_x = player.pos.x;
  		let x = Math.round(e.clientX - canvaspos.left);
  		// x = 0
  		if((x > 5 && x < 30 && deviceType == "large") || (x > 5 && x < 20 && deviceType == "small"))
  		{
    		let empty_column = false;
    		let extra_value = 0;
    		let value_found = false;
    		for(let c_val = 0; c_val < player.matrix.length; c_val++)
    		{
    			if(!value_found && c_val > 0) empty_column = true;
    			if(empty_column) extra_value++;
    			for(let r_val = 0; r_val < player.matrix.length; r_val++)
    			{
    				if(player.matrix[r_val][c_val] != 0) 
    				{
    					value_found = true;
    					break;
    				}
    			}
    			if(value_found) break;
    		}
    		let move_value = ((current_x - 0) + extra_value) * (-1);
    		wallLimit(move_value);
  		}
  		// x = 1
  		if((x > 30 && x < 55 && deviceType == "large") || (x > 20 && x < 35 && deviceType == "small"))
  		{
  			let empty_column = false;
    		let extra_value = 0;
    		let value_found = false;
    		for(let c_val = 0; c_val < player.matrix.length; c_val++)
    		{
    			if(!value_found && c_val > 0) empty_column = true;
    			if(empty_column) extra_value++;
    			for(let r_val = 0; r_val < player.matrix.length; r_val++)
    			{
    				if(player.matrix[r_val][c_val] != 0) 
    				{
    					value_found = true;
    					break;
    				}
    			}
    			if(value_found) break;
    		}
    		let move_value = ((current_x - 1) + extra_value) * (-1);
    		wallLimit(move_value);
  		}
  		// x = 2
  		if((x > 55 && x < 80 && deviceType == "large") || (x > 35 && x < 50 && deviceType == "small"))
  		{
  			let empty_column = false;
    		let extra_value = 0;
    		let value_found = false;
    		for(let c_val = 0; c_val < player.matrix.length; c_val++)
    		{
    			if(!value_found && c_val > 0) empty_column = true;
    			if(empty_column) extra_value++;
    			for(let r_val = 0; r_val < player.matrix.length; r_val++)
    			{
    				if(player.matrix[r_val][c_val] != 0) 
    				{
    					value_found = true;
    					break;
    				}
    			}
    			if(value_found) break;
    		}
    		let move_value = ((current_x - 2) + extra_value) * (-1);
    		wallLimit(move_value);
  		}
  		// x = 3
  		if((x > 80 && x < 105 && deviceType == "large") || (x > 50 && x < 65 && deviceType == "small"))
  		{
  			let empty_column = false;
    		let extra_value = 0;
    		let value_found = false;
    		for(let c_val = 0; c_val < player.matrix.length; c_val++)
    		{
    			if(!value_found && c_val > 0) empty_column = true;
    			if(empty_column) extra_value++;
    			for(let r_val = 0; r_val < player.matrix.length; r_val++)
    			{
    				if(player.matrix[r_val][c_val] != 0) 
    				{
    					value_found = true;
    					break;
    				}
    			}
    			if(value_found) break;
    		}
    		let move_value = ((current_x - 3) + extra_value) * (-1);
    		wallLimit(move_value);
  		}
  		// x = 4
  		if((x > 105 && x < 130 && deviceType == "large") || (x > 65 && x < 80 && deviceType == "small"))
  		{
  			let empty_column = false;
    		let extra_value = 0;
    		let value_found = false;
    		for(let c_val = 0; c_val < player.matrix.length; c_val++)
    		{
    			if(!value_found && c_val > 0) empty_column = true;
    			if(empty_column) extra_value++;
    			for(let r_val = 0; r_val < player.matrix.length; r_val++)
    			{
    				if(player.matrix[r_val][c_val] != 0) 
    				{
    					value_found = true;
    					break;
    				}
    			}
    			if(value_found) break;
    		}
    		let move_value = ((current_x - 4) + extra_value) * (-1);
    		wallLimit(move_value);
  		}
  		// x = 5
  		if((x > 130 && x < 155 && deviceType == "large") || (x > 80 && x < 95 && deviceType == "small"))
  		{
  			let empty_column = false;
    		let extra_value = 0;
    		let value_found = false;
    		for(let c_val = 0; c_val < player.matrix.length; c_val++)
    		{
    			if(!value_found && c_val > 0) empty_column = true;
    			if(empty_column) extra_value++;
    			for(let r_val = 0; r_val < player.matrix.length; r_val++)
    			{
    				if(player.matrix[r_val][c_val] != 0) 
    				{
    					value_found = true;
    					break;
    				}
    			}
    			if(value_found) break;
    		}
    		let move_value = ((current_x - 5) + extra_value) * (-1);
    		wallLimit(move_value);
  		}
  		// x = 6
  		if((x > 155 && x < 180 && deviceType == "large") || (x > 95 && x < 110 && deviceType == "small"))
  		{
  			let empty_column = false;
    		let extra_value = 0;
    		let value_found = false;
    		for(let c_val = 0; c_val < player.matrix.length; c_val++)
    		{
    			if(!value_found && c_val > 0) empty_column = true;
    			if(empty_column) extra_value++;
    			for(let r_val = 0; r_val < player.matrix.length; r_val++)
    			{
    				if(player.matrix[r_val][c_val] != 0) 
    				{
    					value_found = true;
    					break;
    				}
    			}
    			if(value_found) break;
    		}
    		let move_value = ((current_x - 6) + extra_value) * (-1);
    		wallLimit(move_value);
  		}	
  		// x = 7
  		if((x > 180 && x < 205 && deviceType == "large") || (x > 110 && x < 125 && deviceType == "small"))
  		{
  			let empty_column = false;
    		let extra_value = 0;
    		let value_found = false;
    		for(let c_val = 0; c_val < player.matrix.length; c_val++)
    		{
    			if(!value_found && c_val > 0) empty_column = true;
    			if(empty_column) extra_value++;
    			for(let r_val = 0; r_val < player.matrix.length; r_val++)
    			{
    				if(player.matrix[r_val][c_val] != 0) 
    				{
    					value_found = true;
    					break;
    				}
    			}
    			if(value_found) break;
    		}
    		let move_value = ((current_x - 7) + extra_value) * (-1);
    		wallLimit(move_value);
  		}	
  		// x = 8
  		if((x > 205 && x < 230 && deviceType == "large") || (x > 125 && x < 140 && deviceType == "small"))
  		{
  			let empty_column = false;
    		let extra_value = 0;
    		let value_found = false;
    		for(let c_val = 0; c_val < player.matrix.length; c_val++)
    		{
    			if(!value_found && c_val > 0) empty_column = true;
    			if(empty_column) extra_value++;
    			for(let r_val = 0; r_val < player.matrix.length; r_val++)
    			{
    				if(player.matrix[r_val][c_val] != 0) 
    				{
    					value_found = true;
    					break;
    				}
    			}
    			if(value_found) break;
   		 	}
    		let move_value = ((current_x - 8) + extra_value) * (-1);
    		wallLimit(move_value);
  		}	

  		// x = 9
  		if((x > 230 && x < 255 && deviceType == "large") || (x > 140 && x < 155 && deviceType == "small"))
  		{
  			let empty_column = false;
    		let extra_value = 0;
    		let value_found = false;
    		for(let c_val = 0; c_val < player.matrix.length; c_val++)
    		{
    			if(!value_found && c_val > 0) empty_column = true;
    			if(empty_column) extra_value++;
    			for(let r_val = 0; r_val < player.matrix.length; r_val++)
    			{
    				if(player.matrix[r_val][c_val] != 0) 
    				{
    					value_found = true;
    					break;
    				}
    			}
    			if(value_found) break;
    		}
    		let move_value = ((current_x - 9) + extra_value) * (-1);
    		wallLimit(move_value);
  		}

  		//x = 10	
  		if((x > 255 && x < 280 && deviceType == "large") || (x > 155 && x < 170 && deviceType == "small"))
  		{
  			let empty_column = false;
    		let extra_value = 0;
    		let value_found = false;
    		for(let c_val = 0; c_val < player.matrix.length; c_val++)
    		{
    			if(!value_found && c_val > 0) empty_column = true;
    			if(empty_column) extra_value++;
    			for(let r_val = 0; r_val < player.matrix.length; r_val++)
    			{
    				if(player.matrix[r_val][c_val] != 0) 
    				{
    					value_found = true;
    					break;
    				}
    			}
    			if(value_found) break;
    		}
    		let move_value = ((current_x - 10) + extra_value) * (-1);
    		wallLimit(move_value);
  		}	

  		//x = 11
  		if((x > 280 && x < 305 && deviceType == "large") || (x > 170 && x < 185 && deviceType == "small"))
  		{
  			let empty_column = false;
    		let extra_value = 0;
    		let value_found = false;
    		for(let c_val = 0; c_val < player.matrix.length; c_val++)
    		{
    			if(!value_found && c_val > 0) empty_column = true;
    			if(empty_column) extra_value++;
    			for(let r_val = 0; r_val < player.matrix.length; r_val++)
    			{
    				if(player.matrix[r_val][c_val] != 0) 
    				{
    					value_found = true;
    					break;
    				}
    			}
    			if(value_found) break;
    		}
    		let move_value = ((current_x - 11) + extra_value) * (-1);
    		wallLimit(move_value);
		}
	}
}
function ascendFunc() //ascend power activation function
{
  if((player.pos.y > 0) && (ascendCount < powerLimit) && powerUpsReady)
  {
    while(player.pos.y > 0)
    {
        player.pos.y--;
    }
    ascendCount++;
    $(`#ascend-${ascendCount}`).addClass('slash-used');
    if(ascendCount === powerLimit) $('#ascend-key').addClass('power-depleted');
    total_PU_Used++;
  }
}
function freeze() //Freeze Time power activation function
{
  if((freezeCount < powerLimit) && !timeStopActivated && powerUpsReady)
  {
    timeStopActivated = true;
    timeStop_interval = dropInterval;
    timeStop_y = player.pos.y;
    dropCounter = 0;
    dropInterval = 5000;
    freezeCount++;
    $(`#time-${freezeCount}`).addClass('slash-used');
    if(freezeCount === powerLimit) $('#freeze-key').addClass('power-depleted');
    total_PU_Used++;
  }
}
function rowEraserFunc() //Row Erase power activation function
{
	if((eraserCount < powerLimit) && powerUpsReady)
	{
		for(let i = numberOfRows - 1; i > 0; i--)
		{
			for(let c = numberOfCols - 1; c >= 0; c--)
			{
				grid[i][c] = grid[i - 1][c];
			}
		}
		eraserCount++;
		$(`#eraser-${eraserCount}`).addClass('slash-used');
		if(eraserCount === powerLimit) $('#eraser-key').addClass('power-depleted');
    	total_PU_Used++;
	}	
}
function realityShiftFunc() //Reality Shift power activation function
{
  if((realityCount < powerLimit) && powerUpsReady)
  {
  	let randRealityNum = Math.floor((Math.random() * 4) + 1 );
  	if(randRealityNum == 1)
  	{
  		for(let r = numberOfRows - 1; r >= 0; r--)
  		{
  			for(let c = 0; c < numberOfCols; c++)
  			{
  				if((r == numberOfRows - 1 && c <= 2) || (r == numberOfRows -3 && c <= 7 && c >= 5) || (r == numberOfRows -2 && (c == 2 || c == 5)))
  				{
  					grid[r][c] = 2;
  				}
  				else if((r == numberOfRows - 1 && (c == 3 || c == 8 || c == 9)) || (r == numberOfRows -3 && c == 4) || (r == numberOfRows -2 && (c == 3 || c == 4 || c == 7 || c == 8)))
  				{
  					grid[r][c] = 5;
  				}
  				else if((r == numberOfRows -1 && c <= 7 && c >= 5) || (r == numberOfRows -2 && c == 6))
  				{
  					grid[r][c] = 1;
  				}
  				else
  				{
  					grid[r][c] = 0;
  				}
  			}
  		}
  	}
  	if(randRealityNum == 2)
  	{
  		for(let r = numberOfRows - 1; r >= 0; r--)
  		{
  			for(let c = 0; c < numberOfCols; c++)
  			{
  				if((r == numberOfRows - 1 && c <= 2) || (r == numberOfRows -2 && c == 0))
  				{
  					grid[r][c] = 8;
  				}
  				else if((r == numberOfRows - 1 && c == 4) || (r == numberOfRows -2 && (c == 4 || c == 5)) || (r == numberOfRows -3 && c == 5))
  				{
  					grid[r][c] = 5;
  				}
  				else if((r == numberOfRows -1 && c <= 7 && c >= 5) || (r == numberOfRows -2 && c == 7))
  				{
  					grid[r][c] = 2;
  				}
  				else if(r == numberOfRows -1 && c <= 11 && c >= 8)
  				{
  					grid[r][c] = 7;
  				}	
  				else
  				{
  					grid[r][c] = 0;
  				}
  			}
  		}
  	}
    if(randRealityNum == 3)
    {
      for(let r = numberOfRows - 1; r >= 0; r--)
      {
        for(let c = 0; c < numberOfCols; c++)
        {
          if(r == numberOfRows - 1 && c <= 2)
          {
            grid[r][c] = 9;
          }
          else if((r == numberOfRows - 1 && (c == 3 || c == 4 || c == 9 || c == 10)) || (r == numberOfRows -2 && (c == 4 || c == 5 || c == 10 || c == 11)))
          {
            grid[r][c] = 4;
          }
          else if(r == numberOfRows -1 && c <= 8 && c >= 5)
          {
            grid[r][c] = 7;
          }
          else
          {
            grid[r][c] = 0;
          }
        }
      }
    }
    if(randRealityNum == 4)
    {
      for(let r = numberOfRows - 1; r >= 0; r--)
      {
        for(let c = 0; c < numberOfCols; c++)
        {
          if((r == numberOfRows - 1 && (c == 0 || c == 1)) || (r == numberOfRows -2 && c == 0) || (r == numberOfRows -3 && c == 0))
          {
            grid[r][c] = 2;
          }
          else if((r == numberOfRows - 1 && (c == 5 || c == 6)) || (r == numberOfRows -3 && c == 6) || (r == numberOfRows -2 && (c == 5 || c == 6)))
          {
            grid[r][c] = 11;
          }
          else if((r == numberOfRows -1 && (c == 10 || c == 11)) || (r == numberOfRows -2 && c == 11) || (r == numberOfRows -3 && c == 11))
          {
            grid[r][c] = 8;
          }
          else
          {
            grid[r][c] = 0;
          }
        }
      }
    }
    realityShiftAudio.play();
    realityCount++;
    $(`#reality-${realityCount}`).addClass('slash-used');
    if(realityCount === powerLimit) $('#reality-key').addClass('power-depleted');
    total_PU_Used++;
  }
}
function hold() //function to hold/store the current shape
{
	if((on_hold === true) && (shape_switch === 0)) //switches current shape with the one on hold
	{
		var tempShape = player.matrix;
		player.matrix = shape_on_hold;
		shape_on_hold = tempShape;
		player.pos.y = 0;
		player.pos.x = 5;
		shape_switch++;
	}
	else if(on_hold === false) //first time current shape is selected on hold
	{
		shape_on_hold = player.matrix;
		shapeReset(); 
    player.pos.y = 0;
    player.pos.x = 5;
		on_hold = true;
    shape_switch++;
	}
}
function countDownUpdate()
{
  countDownDisplay.removeAttribute('hidden');
  countDownDisplay.textContent = 3;
  let countDownID = setInterval(()=>{
    countDown--;
    if(countDown <= 0)
    {
      countDownDisplay.setAttribute('hidden',true);
      clearInterval(countDownID);
      countDown = 3;
    }
    else countDownDisplay.textContent = countDown;
  },1000);
}
function play() //start game function
{
	if(play_btn_activated == false)
	{
    updateAnimation(0);
    coverDiv.setAttribute('hidden', true);
		if(game_paused == true) game_paused = false;
  	btnContainer.setAttribute("hidden", true);
    countDownUpdate();
    setTimeout(()=>{
      pauseBtnContainer.removeAttribute("hidden");
      play_btn_activated = true;
      in_Play = true;
      gameTimerID = setInterval(gameTimerFunc,1000);
      player.matrix = shapeMaker();
      scoreDisplay.textContent = scoreCount.toLocaleString('en-US');
      levelDisplay.textContent = level;
    },3000); 
    let slashDelay = 50;
    setTimeout(()=>{
      for(let i = numSlashes; i >= 1; i--)
      {
        setTimeout(()=>{
          $(`.slash-${i}`).addClass('slash-start');
        },slashDelay);
        slashDelay += 50;
      }
    },500);
	}
}
function pause() //pause game function
{
  	if(in_Play && pauseBtn.className == "paused") //pause game
  	{
      	game_paused = true;
      	$("#pause-btn").removeClass("paused");
      	$("#pause-btn").addClass("play");
      	btnContainer.removeAttribute("hidden");
      	gameBtns.removeAttribute("hidden");
      	clearInterval(gameTimerID);
  	}
    else if(in_Play && pauseBtn.className == "play") //resume game
    {
      	game_paused = false;
      	$("#pause-btn").removeClass("play");
      	$("#pause-btn").addClass("paused");
      	btnContainer.setAttribute("hidden", true);
      	gameBtns.setAttribute("hidden", true);
        options.setAttribute('hidden', true);
        gameTimerID = setInterval(gameTimerFunc, 1000);
    }
}
pauseBtn.addEventListener("click", pause);
resumeBtn.addEventListener("click", pause);
function restart() //restart game function
{
	if(play_btn_activated)
	{
		pauseBtnContainer.removeAttribute("hidden");
		if(pauseBtn.className == "play")
  	{
    	$("#pause-btn").removeClass("play");
    	$("#pause-btn").addClass("paused");
    }
    powerUpsReady = false;
	  in_Play = true;
   	btnContainer.setAttribute("hidden", true);
   	restartBtn.setAttribute("hidden", true);
   	gameBtns.setAttribute("hidden", true);
    player.matrix = shapeMaker();
		shape_on_hold = shapeMaker();
		shape_onDeck1 = shapeMaker();
		shape_onDeck2 = shapeMaker();
		shape_onDeck3 = shapeMaker();
    shape_onDeck4 = shapeMaker();
    variableReset();
    let slashDelay = 50;
    
    for(let i = numSlashes; i >= 1; i--)
    {
      setTimeout(()=>{
        $(`.slash-${i}`).removeClass('slash-used');
        if(i === 1)
        {
          freezeCount = 0;
          ascendCount = 0;
          eraserCount = 0;
          realityCount = 0;
          total_PU_Used = 0;
          powerUpsReady = true;
        }
      },slashDelay);
      slashDelay += 50;
    }
    $('.inner-circle p').removeClass('power-depleted');
    clearInterval(gameTimerID);
		gameTimerID = setInterval(gameTimerFunc,1000);
	}
}
function quit() //quit game
{
  if(play_btn_activated)
  {
    coverDiv.removeAttribute('hidden');
    cancelAnimationFrame(animID);
    variableReset();
    freezeCount = 0;
    ascendCount = 0;
    eraserCount = 0;
    realityCount = 0;
    total_PU_Used = 0;
    player.matrix = emptyShape();
    in_Play = false;
    play_btn_activated = false;
    clearInterval(gameTimerID);
    // for(let i = numSlashes; i >= 1; i--)
    // {
    //   $(`.slash-${i}`).removeClass('slash-start slash-used');
    // }
    $('.slash').removeClass('slash-start slash-used');
    $('.inner-circle p').removeClass('power-depleted');
    draw();
    if(pauseBtn.className == "play")
    {
    	$("#pause-btn").removeClass("play");
    	$("#pause-btn").addClass("paused");
    }
    pauseBtnContainer.setAttribute("hidden", true);
   	gameBtns.setAttribute("hidden", true);
  	restartBtn.setAttribute("hidden", true);
  }
}
function variableReset()
{
  grid.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value !== 0)
      {
        grid[y][x] = 0;
      }
    });
  });
  player.pos.x = 5;
  player.pos.y = 0;
  countDown = 3; //added variable
  scoreCount = 0;
  on_hold = false;
  shape_switch = 0;
  gameSeconds = 0;
  gameMinutes = 0;
  gameTimerID = null; //added variable
  timeStopActivated = false; //added variable
  game_paused = false;
  paused_interval = false;
  scoresent = false;
  level = 1;
  rows = 0;
  dropCounter = 0;
  dropInterval = 1000;
  lastTime = 0;
  streak = false;
  streakCount = 0;
  max_drop_used = false;
  seconds.textContent = '00';
  minutes.textContent = '00';
  scoreDisplay.textContent = scoreCount.toLocaleString('en-US');
  levelDisplay.textContent = level;
  gradient = context.createLinearGradient(0,6,10,6);
  gradient.addColorStop(0,'rgb(255,0,255)');
  gradient.addColorStop(1,'rgb(0,164,243)');
  // shape_on_hold = shapeMaker();
  // let in_Play = false;
}
function createMatrix(w, h) //making game field function
{
	const matrix1 = [];
	while(h--)
	{
		matrix1.push(new Array(w).fill(0));	
	}
	return matrix1;
}
function draw() //drawing to canvas
{	    
	if(in_Play)
	{	   
    	drawGrid(grid, player.pos);//{x:0, y:0});
    	drawGrid(player.matrix, player.pos);
      drawGrid(ghost_block_func(), ghost_coordinates());
    	drawStaticGrid(static_grid, {x:0, y:0});
    	drawHoldGrid(hold_grid, {x:0, y:0});
    	if(on_hold == true) drawHoldGrid(shape_on_hold, {x:1, y:1});
    	if(shape_onDeck1.length == 3)
    	{
    		drawStaticGrid(switchShapeRotate(shape_onDeck1), {x:1, y:1});
    	}
    	else if(shape_onDeck1.length == 4)
    	{
    		drawStaticGrid(switchShapeRotate(shape_onDeck1), {x:1, y:0});
    	}
    	else
    	{
    		drawStaticGrid(shape_onDeck1, {x:2, y:1});
    	}
    	if(shape_onDeck2.length == 2)
    	{
    		drawStaticGrid(shape_onDeck2, {x:2, y:4});
    	}
		else if(shape_onDeck2.length == 4)
		{
			drawStaticGrid(switchShapeRotate(shape_onDeck2), {x:1, y:3});
		}
    	else
    	{
    		drawStaticGrid(switchShapeRotate(shape_onDeck2), {x:1, y:4});
    	}
    	if(shape_onDeck3.length == 2)
    	{
    		drawStaticGrid(shape_onDeck3, {x:2, y:7});
    	}
		else if(shape_onDeck3.length == 4)
		{
			drawStaticGrid(switchShapeRotate(shape_onDeck3), {x:1, y:6});
		}
    	else
    	{
    		drawStaticGrid(switchShapeRotate(shape_onDeck3), {x:1, y:7});
    	}
		if(shape_onDeck4.length == 2)
		{
			drawStaticGrid(shape_onDeck4, {x:2, y:10});
		}
		else if(shape_onDeck4.length == 4)
		{
			drawStaticGrid(switchShapeRotate(shape_onDeck4), {x:1, y:9});
		}
		else
		{
			drawStaticGrid(switchShapeRotate(shape_onDeck4), {x:1, y:10});
		}
    }
    else if(!in_Play)	
    {
    	drawGrid(grid, {x:0, y:0});
    	drawGrid(player.matrix, player.pos);
    	drawStaticGrid(static_grid, {x:0, y:0});
    	drawHoldGrid(hold_grid, {x:0, y:0});
    }
}
let fillOff = document.getElementById("no-fill").checked;
function fillUpdate(){
  fillOff = !fillOff;
}
function drawGrid(matrix, offset)
{
  matrix.forEach((row, y) => {
 	  row.forEach((value, x) => {
 	   	if(fillOff !== true)
 	   	{
   	   	if(value === 1 || value === 2 || value === 3 || value === 4 || value === 5 || value === 6 || value === 7 || value === 8 || value === 9 
          || value === 10 || value === 11 || value === 12) //player pieces
   	   	{
   	   		if(matrix == player.matrix) 
        	{
        		 context.fillStyle = gradient;
 	   			   context.fillRect(x + offset.x + .10, y + offset.y + .10, .80, .80);
             context.strokeStyle = gradient;
             context.lineWidth = borderSize / 3;
             context.lineJoin = "round";
 	   	       context.strokeRect(x + offset.x + .10, y + offset.y + .10, .80, .80);
 			    }
          	else //piece after it has been set
          	{
          	//draw outer box first to avoid white space since block is sized down a bit
          	context.fillStyle = 'rgb(0, 0, 0)';
   	   			context.fillRect(x, y, 1, 1);

   	   			context.fillStyle = gradient;
   	   			context.fillRect(x + .10, y + .10, .80, .80);
   	   			context.strokeStyle = gradient;
            context.lineWidth = borderSize / 3;
            context.lineJoin = "round";
            context.strokeRect(x + .10, y + .10, .80, .80);
          }
   	   	}
        else if(value === 15)
        {
          context.fillStyle = 'rgb(0,0,0)';
          context.fillRect(x + offset.x + .10, y + offset.y + .10, .80, .80);
          context.strokeStyle = 'rgb(0,0,0)';
          context.lineWidth = borderSize / 3;
          context.lineJoin = "round";
          context.strokeRect(x + offset.x + .10, y + offset.y + .10, .80, .80);
        }
        else if(value == 13 && (in_Play)) //ghost piece
        {
          if(matrix != player.matrix && matrix != grid && matrix.length < 5)
          {
            context.strokeStyle = "rgb(255,255,255)"; //white
            context.lineWidth = borderSize / 6;
            context.lineJoin = "round";
            context.strokeRect(x + offset.x + .10, y + offset.y + .10, .80, .80);
          }   
        } 	
   	   	else if((matrix != player.matrix) && (value == 14)) //score row highlight
   	   	{
          
   	   		context.fillStyle = 'rgb(255, 255, 255)';
   	   		context.fillRect(x, y, 1, 1);	  
   			  context.strokeStyle = 'rgb(192, 192, 192)';
          context.lineJoin = "round";
          context.lineWidth = borderSize / 40;
          context.strokeRect(x, y, 1, 1);
   	   	}
   	   	else if((matrix != player.matrix) && (value == 0) && matrix.length > 4) //empty spots
   	   	{
   	   		context.fillStyle = 'rgb(0, 0, 0)';
   	   		context.fillRect(x, y, 1, 1);
   	   	}
      }
 	   	if(fillOff === true)
 	   	{
   	   	if(value === 1 || value === 2 || value ===3 || value === 4 || value === 5 || value === 6 || value === 7 || value === 8 || value === 9 
          || value === 10 || value === 11 || value === 12) 
        {
   	   		if(matrix == player.matrix)
        	{
      			context.fillStyle = 'rgb(0, 0, 0)';
	   			  	context.fillRect(x + offset.x + .10, y + offset.y + .10, .80, .80);
        		context.strokeStyle = gradient;
        		context.lineWidth = borderSize / 3;
        		context.lineJoin = "round";
	   	   			context.strokeRect(x + offset.x + .10, y + offset.y + .10, .80, .80);
   			  }
      		else //piece when its layed out on board
      		{
      			//draw outer box first to avoid white space since block is sized down a bit
      			context.fillStyle = 'rgb(0, 0, 0)';
	   			  	context.fillRect(x, y, 1, 1);
            //inner box black fill
      			context.fillStyle = 'rgb(0, 0, 0)';
	   			  	context.fillRect(x + .10, y + .10, .80, .80);
            //stroke fill
        		context.strokeStyle = gradient;
        		context.lineWidth = borderSize / 3;
        		context.lineJoin = "round";
        		context.strokeRect(x + .10, y + .10, .80, .80);

        		//draw diagonal line for piece thats layed down
        		context.beginPath();
  				  context.moveTo(x + .10, y + .10);
  				  context.lineTo(x + .90, y + .90);
            context.strokeStyle = gradient;
  				  context.lineWidth = borderSize / 3;;
  				  context.stroke();
      		}
   	   	}
        else if(value == 13 && (in_Play))
        {
          if(matrix != player.matrix && matrix != grid && matrix.length < 5)
          {
            context.strokeStyle = "rgb(255,255,255)"; //white
            context.lineWidth = borderSize / 6;
            context.lineJoin = "round";
            context.strokeRect(x + offset.x + .10, y + offset.y + .10, .80, .80);
          }   
        }
   	   	else if((matrix != player.matrix) && (value == 14))
   	   	{
   	   		context.fillStyle = 'rgb(255, 255, 255)';
   	   		context.fillRect(x, y, 1, 1);
   			
   			  context.strokeStyle = 'rgb(192, 192, 192)';
          context.lineJoin = "round";
          context.lineWidth = borderSize / 40;
          context.strokeRect(x, y, 1, 1);
   	   	}
        else if((matrix != player.matrix) && (value == 0) && matrix.length > 4)
        {
          context.fillStyle = 'rgb(0, 0, 0)';
          context.fillRect(x, y, 1, 1);
        }
   	  }
 	  });
  });
}  
function drawStaticGrid(matrix, offset)
{
   matrix.forEach((row, y) => {
   	   row.forEach((value, x) => {
        if(fillOff !== true)
        {
   	   	if(value === 1 || value === 2 || value === 3 || value === 4 || value === 5 || value === 6 || value === 7 || value === 8 || value === 9 
            || value === 10 || value === 11 || value === 12) 
          {
            context2.fillStyle = 'rgb(0, 0, 0)';
            context2.fillRect(x + offset.x, y + offset.y, 1, 1);

            context2.fillStyle = gradient;
            context2.fillRect(x + offset.x + .10, y + offset.y + .10, .80, .80);
            context2.strokeStyle = gradient;
            context2.lineWidth = borderSize / 3;
            context2.lineJoin = "round";
            context2.strokeRect(x + offset.x + .10, y + offset.y + .10, .80, .80);
            }
   	   	else if(matrix.length > 4)
   	   	{
   	   		context2.fillStyle = 'rgb(0, 0, 0)';
   	   		context2.fillRect(x, y, 1, 1);
   	   	}
       }
       if(fillOff === true)
        {
        if(value === 1 || value === 2 || value == 3 || value === 4 || value === 5 || value === 6 || value === 7 || value === 8 || value === 9 
            || value === 10 || value === 11 || value === 12)
        {
        	//draw outer box first to avoid white space since block is sized down a bit
          	context2.fillStyle = 'rgb(0, 0, 0)';
   	   		 context2.fillRect(x + offset.x + .10, y + offset.y + .10, .80, .80);

            context2.fillStyle = 'rgb(0, 0, 0)';
            context2.fillRect(x + offset.x + .10, y + offset.y + .10, .80, .80);
            context2.strokeStyle = gradient;
            context2.lineWidth = borderSize / 3;
            context2.lineJoin = "round";
            context2.strokeRect(x + offset.x + .10, y + offset.y + .10, .80, .80);
        }
        else if(matrix.length > 4)
        {
          context2.fillStyle = 'rgb(0, 0, 0)';
          context2.fillRect(x, y, 1, 1);
        }
       }
   	   });
   });
} 
function drawHoldGrid(matrix, offset)
{
   matrix.forEach((row, y) => {
   	   row.forEach((value, x) => {
   	   	if(fillOff !== true)
        {
        if(value === 1 || value === 2 || value === 3 || value === 4 || value === 5 || value === 6 || value === 7 || value === 8 || value === 9 
            || value === 10 || value === 11 || value === 12) 
        {
        	//draw outer box first to avoid white space since block is sized down a bit
          	context3.fillStyle = 'rgb(0, 0, 0)';
   	   		 context3.fillRect(x + offset.x, y + offset.y, 1, 1);

            context3.fillStyle = gradient;
            context3.fillRect(x + offset.x + .10, y + offset.y + .10, .80, .80);
            context3.strokeStyle = gradient;
            context3.lineWidth = borderSize / 3;
            context3.lineJoin = "round";
            context3.strokeRect(x + offset.x + .10, y + offset.y + .10, .80, .80);
        }
        else if(matrix.length > 4)
        {
          context3.fillStyle = 'rgb(0, 0, 0)';
          context3.fillRect(x, y, 1, 1);
        }
       }
       if(fillOff === true)
        {
        if(value === 1 || value === 2 || value == 3 || value === 4 || value === 5 || value === 6 || value === 7 || value === 8 || value === 9 
            || value === 10 || value === 11 || value === 12) 
        {
        	//draw outer box first to avoid white space since block is sized down a bit
          	context3.fillStyle = 'rgb(0, 0, 0)';
   	   		  context3.fillRect(x + offset.x + .10, y + offset.y + .10, .80, .80);

            context3.fillStyle = 'rgb(0, 0, 0)';
            context3.fillRect(x + offset.x + .10, y + offset.y + .10, .80, .80);
            context3.strokeStyle = gradient;
            context3.lineWidth = borderSize / 3;
            context3.lineJoin = "round";
            context3.strokeRect(x + offset.x + .10, y + offset.y + .10, .80, .80);
        }
        else if(matrix.length > 4)
        {
          context3.fillStyle = 'rgb(0, 0, 0)';
          context3.fillRect(x, y, 1, 1);
        }
       }
   	   });
   });
} 
/* function to set current shape to the one on deck and move up the on deck shapes 
 * and reset the last one on deck
 */
function shapeReset()
{
	player.matrix = shape_onDeck1;
	shape_onDeck1 = shape_onDeck2;
	shape_onDeck2 = shape_onDeck3;
	shape_onDeck3 = shape_onDeck4;
  	shape_onDeck4 = shapeMaker();
}
function shapeMaker() //function that creates the unique shapes of the game
{
	let shape;
	let randNum;
	randNum = Math.floor((Math.random() * 12) + 1);
	if(randNum == 1)
	{
    shape_id = 1;
		shape = [
   			[0, 1, 0],
   			[1, 1, 0],
  			[0, 1, 0],
		];
		
	}
	if(randNum == 2)
	{
    shape_id = 2;
		shape = [
		   [0, 2, 0],
		   [0, 2, 0],
		   [0, 2, 2],
		];
	}
	if(randNum == 3)
	{
    shape_id = 3;
		shape = [
			[0, 3, 0],
			[3, 3, 0],
			[0, 0, 0],
		]
	}
	if(randNum == 4)
	{
    shape_id = 4;
		shape = [
			[4, 0, 0],
			[4, 4, 0],
			[0, 4, 0],
		]
	}
	if(randNum == 5)
	{
    shape_id = 5;
		shape = [
		    [0, 5, 0],
		    [5, 5, 0],
		    [5, 0, 0],
		]
	}
	if(randNum == 6)
	{
    shape_id = 6;
		shape = [
			[6, 6],
			[6, 6],
		]
	}
	if(randNum == 7)
	{
    shape_id = 7;
		shape = [
			[0, 7, 0, 0],
			[0, 7, 0, 0],
			[0, 7, 0, 0],
			[0, 7, 0, 0],
		]
	}
	if(randNum == 8)
	{
    shape_id = 8;
		shape = [
		   [0, 8, 0],
		   [0, 8, 0],
		   [8, 8, 0],
		];
	}
	if(randNum == 9)
	{
    shape_id = 9;
		shape = [
		   [0, 9, 0],
		   [0, 9, 0],
		   [0, 9, 0],
		];
	}
	if(randNum == 10)
	{
    shape_id = 10;
		shape = [
		   [0, 10, 0],
		   [0, 10, 0],
		   [0, 0, 0],
		];
	}
	if(randNum == 11)
	{
    shape_id = 11;
		shape = [
		   [0, 11, 0],
		   [11, 11, 0],
		   [11, 11, 0],
		];
	}
	if(randNum == 12)
	{
    shape_id = 12;
    shape = [
      [0, 12, 0, 0],
      [0, 12, 12, 0],
      [0, 12, 0, 0],
      [0, 12, 0, 0],
    ]
  }
	return shape;
}
function emptyShape()
{
  let shape = [
      [15, 15, 15],
      [15, 15, 15],
      [15, 15, 15],
    ]
    return shape;
}
//Rotation function for 3x3 and 4x4 pieces. 2x2 square needs no rotation
function shapeRotate()
{
	let rot = player.matrix;
	if(player.matrix.length === 3) //Rotation for 3 tuple
	{
		player.matrix = [
			[rot[2][0], rot[1][0], rot[0][0]],
			[rot[2][1], rot[1][1], rot[0][1]],
			[rot[2][2], rot[1][2], rot[0][2]],
		]
		if(player.pos.x > 9) //right wall bounce back during rotation for 3x3
		{
			let tempPlayer = player;
			tempPlayer.pos.x = tempPlayer.pos.x--;
			if(colliderFunc(grid, tempPlayer)) player.pos.x--;
		}
		if(player.pos.y > 17) //Bottom bounds bounce back during rotation out of bounds for 3x3
		{
			let tempPlayer = player;
			tempPlayer.pos.y = tempPlayer.pos.y--;
			if(colliderFunc(grid, player)) player.pos.y--;
		}
	}	
	else if(player.matrix.length === 4) //Rotation for 4 tuple Long piece
	{
		player.matrix = [
			[rot[3][0], rot[2][0], rot[1][0], rot[0][0]],
			[rot[3][1], rot[2][1], rot[1][1], rot[0][1]],
			[rot[3][2], rot[2][2], rot[1][2], rot[0][2]],
			[rot[3][3], rot[2][3], rot[1][3], rot[0][3]],
		];
		if(player.pos.x > 9 || player.pos.x > 8) //right wall out of bounds bounce back for 4x4
		{
			let tempPlayer = player;
			tempPlayer.pos.x = tempPlayer.pos.x - 1;
			if(colliderFunc(grid, tempPlayer)) player.pos.x--;
		}
		if(player.pos.y > 16)
		{
			let tempPlayer = player;
			tempPlayer.pos.y = tempPlayer.pos.y--;
			if(colliderFunc(grid, tempPlayer)) player.pos.y--;
		}
	}
	if(player.pos.x < 0) //bounce piece back if it goes out of bounds during rotation
	{
       let tempPlayer = player;
	   tempPlayer.pos.x = tempPlayer.pos.x++;
	   if(colliderFunc(grid, tempPlayer)) player.pos.x++;
	}	
}
function maxDrop() //drops piece to bottom
{
	if(player.pos.y >= 1)
	{
		while(!colliderFunc(grid, player))
		{
			player.pos.y++;
		}
		player.pos.y--;
    c_dropTime = dropInterval;
    dropInterval = 0;
    max_drop_used = true;
	}
  else 
  {
    player.pos.y++;
    while(!colliderFunc(grid, player))
    {
      player.pos.y++;
    }
    player.pos.y--;
    c_dropTime = dropInterval;
    dropInterval = 0;
    max_drop_used = true;
  }
  $('#game-container').addClass('maxdrop-anim');
  setTimeout(()=>{
    $('#game-container').removeClass('maxdrop-anim');
  },300);
}
function ghost_block_func() //function to set the ghost piece
{
  const ghost = _.cloneDeep(player); //deep copy function from _lodash library
  for(let vy = 0; vy < ghost.matrix.length; vy++)
  {
    for(let vx = 0; vx < ghost.matrix.length; vx++)
    {
      if(ghost.matrix[vy][vx] != 0) ghost.matrix[vy][vx] = 13;
    }
  }
  return ghost.matrix;
}
function ghost_coordinates() //function to set location of ghost piece
{
  let ghost_matrix = player.matrix;
  let gx = player.pos.x;
  let gy = player.pos.y;
  const ghost = {
    pos: {x: gx, y: gy},
    matrix: ghost_matrix,
  };
  if(ghost.pos.y >= 0)
  {
    while(!colliderFunc(grid, ghost))
    {
      ghost.pos.y++;
    }
    ghost.pos.y--;
  }
  return ghost.pos;
}
function colliderFunc(grid, player)
{
	let len = player.matrix.length;
	let matrix = player.matrix;
	let pos = player.pos;
	for(let y = 0; y < len; ++y)
	{
		for(let x = 0; x < player.matrix[y].length; ++x)
		{
			if( matrix[y][x] !== 0 &&
				(grid[y + pos.y] && 
				grid[y + pos.y][x + pos.x]) !== 0)
			{
				return true;
			}
		}
	}
	return false;
}
/* Function to set the shape on the board once it lands
 * and to count the score for each piece that lands.
 * See the "score" function for the addition scoring
 * for completing rows
 */
function merge(grid, player)
{
	player.matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if(value !== 0 && value !== 13){
				grid[y + player.pos.y][x + player.pos.x] = value;
			}
		});	
	});
	// Scoring for level 1
	if((scoreCount >= 0) && (scoreCount < 1000))
	{
    // gradient = context.createLinearGradient(0,6,10,6);
    // gradient.addColorStop(0,'rgb(255,0,255)');
    // gradient.addColorStop(1,'rgb(0,164,243)');
		scoreCount += 37;
	}
	// Scoring for level 2
	else if((scoreCount >= 1000) && (scoreCount < 3000))
	{
    gradient = context.createLinearGradient(0,numberOfCols/2,numberOfRows/2,numberOfCols/2);
    gradient.addColorStop(0,'#02aab0');
    gradient.addColorStop(1,'#00cdac');
		level = 2;
		scoreCount += 53;
		dropInterval = 700;
	}
	// Scoring for level 3
	else if((scoreCount >= 3000) && (scoreCount < 6000))
	{
    gradient = context.createLinearGradient(0,numberOfCols/2,numberOfRows/2,numberOfCols/2);
    gradient.addColorStop(0,'#ff512f');
    gradient.addColorStop(1,'#dd2476');
		level = 3;
		scoreCount += 78;
		dropInterval = 500;
	}
	// Scoring for level 4
	else if((scoreCount >= 6000) && (scoreCount < 12000))
	{
    gradient = context.createLinearGradient(0,numberOfCols/2,numberOfRows/2,numberOfCols/2);
    gradient.addColorStop(0,'#8E2DE2');
    gradient.addColorStop(1,'#4A00E0');
		level = 4;
		scoreCount += 105;
		dropInterval = 400;
	}
	// Scoring for level 5
	else if((scoreCount >= 12000) && (scoreCount < 20000))
	{
    gradient = context.createLinearGradient(0,numberOfCols/2,numberOfRows/2,numberOfCols/2);
    gradient.addColorStop(0,'#8360c3');
    gradient.addColorStop(1,'#2ebf91');
		level = 5;
		scoreCount += 139;
		dropInterval = 300;
	}
	// Scoring for level 6
	else if((scoreCount >= 20000) && (scoreCount < 28000))
	{
    gradient = context.createLinearGradient(0,numberOfCols/2,numberOfRows/2,numberOfCols/2);
    gradient.addColorStop(0,'#59C173');
    gradient.addColorStop(.5,'#a17fe0');
    gradient.addColorStop(1,'#5D26C1');
		level = 6;
		scoreCount += 170;
		dropInterval = 150;
	}
	// Scoring for level 7
	else if((scoreCount >= 28000))
	{
    gradient = context.createLinearGradient(0,numberOfCols/2,numberOfRows/2,numberOfCols/2);
    gradient.addColorStop(0,'#12c2e9');
    gradient.addColorStop(.5,'#c471ed');
    gradient.addColorStop(1,'#f64f59');
		level = 7;
		scoreCount += 250;
		dropInterval = 100;
	}
	scoreDisplay.textContent = scoreCount.toLocaleString('en-US');
}
function playerDrop()
{
	if(play_btn_activated)
	{
		if(max_drop_used)
        {
          dropInterval = c_dropTime;
          max_drop_used = false;
        }
		player.pos.y++;
    if(timeStopActivated)
    {
      if(player.pos.y != timeStop_y)
      {
        dropInterval = timeStop_interval;
        timeStopActivated = false;
      }
    }
    if(game_paused == true) //pausing the game
    {
      player.pos.y--;
      paused_interval = true;
    }
    else if((game_paused == false) && (paused_interval == true)) //unpause game
    {
      paused_interval = false;
    }
		if(colliderFunc(grid, player))
		{	
			if(player.pos.y == 1) //player reaches the top. Game over
			{
	          let count = 0;
	          player.pos.y--;
	          scoreDisplay.textContent = scoreCount.toLocaleString('en-US');
	          levelDisplay.textContent = level; 
	          in_Play = false;
	          pauseBtnContainer.setAttribute("hidden", true);
	          btnContainer.removeAttribute("hidden");
	          restartBtn.removeAttribute("hidden");
	          sendScores(scoreCount, rows, level, total_PU_Used);
	          scoresent = true;
			}
			else
			{	
				player.pos.y--;
				merge(grid, player);
				dropAudio.play();
				score();
				player.pos.y = 0;
				player.pos.x = 5;
				shape_switch = 0;
				shapeReset();
			}
		}
 		dropCounter = 0;
 	}
}
function sendScores(scorex, rowsx, levelx, numpux) //sending scores to database
{
  if(!scoresent)
  {
    let request = new XMLHttpRequest();
    request.open('POST', 'gameover.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send('score=' + scorex + '&rows=' + rowsx + '&level=' + levelx + '&numpu=' + numpux);
  }
}
function score()
{
  let curInterHolder;
  let numRowsCompleted = 0;
	grid.forEach((row, y) => {
		let fullBox = 0;
		row.forEach((value, x) => {
			if(value !== 0) fullBox++;
		});
		if(fullBox == numberOfCols)
		{
      numRowsCompleted++;
      curInterHolder = dropInterval;
      dropInterval = 10000;
      for(let column = 0; column < numberOfCols; column++) grid[y][column] = 14;//sets grid row to white for highlight effect
      setTimeout(function(){//after 100ms of it showing highlighted remove the row
        for(let rComplete = y; rComplete > 0; rComplete--)
        {//start from bottom of grid to remove complete rows. starting from top deletes all rows
          for(let c2 = 0; c2 <= 11; c2++) grid[rComplete][c2] = grid[rComplete - 1][c2];
        }
        streakCount++;
        rows++;
        // Row streak multiplier
        if((scoreCount >= 0) && (scoreCount < 1000)) scoreCount = scoreCount + (100 * streakCount);//level 1 multiplier
        else if((scoreCount >= 1000) && (scoreCount < 3000)) scoreCount = scoreCount + (125 * streakCount);// level 2 multiplier
        else if((scoreCount >= 3000) && (scoreCount < 6000)) scoreCount = scoreCount + (150 * streakCount);//level 3 multiplier
        else if((scoreCount >= 6000) && (scoreCount < 12000)) scoreCount = scoreCount + (200 * streakCount);//level 4 multiplier
        else if((scoreCount >= 12000) && (scoreCount < 20000)) scoreCount = scoreCount + (250 * streakCount);//level 5 multiplier
        else if((scoreCount >= 20000) && (scoreCount < 28000)) scoreCount = scoreCount + (350 * streakCount);//level 6 multiplier
        else if(scoreCount >= 28000) scoreCount = scoreCount + (500 * streakCount); // level 7 multiplier
        scoreDisplay.textContent = `${scoreCount.toLocaleString ('en-US')} (x ${streakCount})`;
        scoreAudio.play();
      }, 100);
			dropInterval = curInterHolder;
		}
		// levelDisplay.textContent = level;	
	});	
  levelDisplay.textContent = level;
  if(numRowsCompleted === 0) streakCount = 0;
}	
function wallLimit(move)
{
	player.pos.x += move;
	if(colliderFunc(grid, player))
	{
		player.pos.x -= move;
	    if(move < 0)
	    {
	      $('#game-container').addClass('left-bump-anim');
	      setTimeout(()=>{
	        $('#game-container').removeClass('left-bump-anim');
	      },300);
	    }
	    else if(move > 0)
	    {
	      $('#game-container').addClass('right-bump-anim');
	      setTimeout(()=>{
	        $('#game-container').removeClass('right-bump-anim');
	      },300);
	    }
	}
}
timeProgressBar.addEventListener('click',()=>{
  if(in_Play && !game_paused)
  {
      freeze();
  }
});
ascendProgressBar.addEventListener('click',()=>{
  if(in_Play && !game_paused)
  {
      ascendFunc();
  }
});
realityProgressBar.addEventListener('click',()=>{
  if(in_Play && !game_paused)
  {
      realityShiftFunc();
  }
});
eraserProgressBar.addEventListener('click',()=>{
  if(in_Play && !game_paused)
  {
      rowEraserFunc();
  }
});
document.addEventListener('keydown', e => {
	if(play_btn_activated && in_Play && !game_paused)
	{
		if(e.keyCode === 37) //left Key move
		{
		  wallLimit(-1);
		}	
		else if(e.keyCode === 39) //right key move
		{
		  wallLimit(1);
		}
		else if(e.keyCode === 40 && !timeStopActivated) //down key move
		{
      e.preventDefault();
		  playerDrop();
		}
		else if(e.keyCode === 38) //up arrow key piece rotate
		{
      e.preventDefault();
		  shapeRotate();
      if(colliderFunc(grid, player)) antiRotateFunc();
		}
		else if((e.keyCode === 32)) //space bar piece drop
		{
      e.preventDefault();
		  maxDrop();
		}
		else if(e.keyCode === 90) //z key hold shape function
		{
		  hold();
		}   
    else if(e.keyCode === 88) //x key time stop power up
    {
      freeze();
    }
    else if(e.keyCode === 65) //A key ascend power up
    {
      ascendFunc();
    }
    else if(e.keyCode === 83)  //s key row eraser power up
    {
      rowEraserFunc();
    }
    else if(e.keyCode === 67) //c key reality shift power up
    {
      realityShiftFunc();
    }
	}
	else if(!play_btn_activated)
	{
		if(e.keyCode === 40) //down key
		{
			e.preventDefault();
		}
		if(e.keyCode === 38) //up arrow key
		{
			e.preventDefault();
		}
	}	
});
function switchShapeRotate(switch_matrix)
{
  let rot = switch_matrix; 
  if(switch_matrix.length === 3) //Rotation for 3 tuple
  {
    switch_matrix = [
      [rot[2][0], rot[1][0], rot[0][0]],
      [rot[2][1], rot[1][1], rot[0][1]],
      [rot[2][2], rot[1][2], rot[0][2]],
    ]
  }
  else if(switch_matrix.length === 4) //Rotation for 4 tuple Long piece
  {
    switch_matrix = [
      [rot[3][0], rot[2][0], rot[1][0], rot[0][0]],
      [rot[3][1], rot[2][1], rot[1][1], rot[0][1]],
      [rot[3][2], rot[2][2], rot[1][2], rot[0][2]],
      [rot[3][3], rot[2][3], rot[1][3], rot[0][3]],
    ]
  }
  return switch_matrix;
}
function antiRotateFunc()
{
  let rot = player.matrix;
  if(player.matrix.length == 3) //Rotation for 3 tuple
  {
    player.matrix = [
      [rot[0][2], rot[1][2], rot[2][2]],
      [rot[0][1], rot[1][1], rot[2][1]],
      [rot[0][0], rot[1][0], rot[2][0]],
    ]
  }
  else if(player.matrix.length == 4) //Rotation for 4 tuple Long piece
  {
    player.matrix = [
      [rot[0][3], rot[1][3], rot[2][3], rot[3][3]],
      [rot[0][2], rot[1][2], rot[2][2], rot[3][2]],
      [rot[0][1], rot[1][1], rot[2][1], rot[3][1]],
      [rot[0][0], rot[1][0], rot[2][0], rot[3][0]],
    ]
  }
}
let gameTimerFunc = ()=>{
	if(in_Play && !game_paused)
	{
		gameSeconds++;
		if(gameSeconds === 60)
		{
			gameMinutes++;
			gameSeconds = 0;
		}
		seconds.textContent = (gameSeconds < 10) ? `0${gameSeconds}` : gameSeconds;
		minutes.textContent = (gameMinutes < 10) ? `0${gameMinutes}` : gameMinutes;
	}
}; 
function updateAnimation(timeStamp)
{
  console.log('hello');
	const deltaTime = timeStamp - lastTime;
	lastTime = timeStamp;
	dropCounter += deltaTime;
	if(dropCounter > dropInterval)
	{
		playerDrop();
	}
	draw();
	animID = requestAnimationFrame(updateAnimation);		
}