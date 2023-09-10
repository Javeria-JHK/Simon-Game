

var buttonColours = ["red","blue","green","yellow"];


var level = 0;
var started = false;

var gamePattern =[];
var userClickedPattern =[];


$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextsequence();
        started = true;
    }
});

$(".btn").on("click",function(){
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);

    playSound(userChoosenColor);
    animatePress(userChoosenColor);

    checkAnswer(userClickedPattern.length-1);

});

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function nextsequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColours[randomNumber];

    gamePattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChoosenColor);
   

}



function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");

        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextsequence()
            },1000);
        }
    }else{
        console.log("wrong");

        playSound("wrong");
        
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press any Key to Restart");
        startOver();
      
    }
}

function startOver(){
    level = 0;
    gamePattern=[];
    started=false;
}





