let buttonColours = ["red","blue","green","yellow"]

let gamePattern = []

let userClickedpattern = []






function nextSequence(){
  let randomNumber = Math.floor(Math.random()*4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  let sound = new Audio("sounds/"+randomChosenColour+".mp3");
  sound.play();

  level1++;

  $("#level-title").text("Level "+level1);

  userClickedpattern = [];
}


$(".btn").click(function(){
  let userChosenColour = $(this).attr("id");
  userClickedpattern.push(userChosenColour);

  $("#"+userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  let usound = new Audio("sounds/"+userChosenColour+".mp3");
  usound.play();

  checkAnswer(userClickedpattern.length-1);
});

function animatePress(curentColour){
  $("#"+curentColour).addClass("pressed");

  setTimeout(function(){
    $("#"+curentColour).removeClass("pressed");
  },100);
}


let level1 = 0;

let started = false;

$(document).keydown(function(){
  if (!started){
    $("#level-title").text("Level "+level1);
    nextSequence();
    stated = true;
  }

});


function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedpattern[currentLevel]){
    console.log("success");

    if (userClickedpattern.length === gamePattern.length){
      setTimeout (function(){
        nextSequence();
      },1000);
    }

  } else {
    console.log("wrong");
    let wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key To Restart")

    startOver();
  }
}


function startOver(){
  level1 = 0;
  gamePattern = [];
  sarted = false;
}
