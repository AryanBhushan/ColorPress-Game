let buttonColours=["red","blue","green","yellow"];
let gamePattern=[];
let userPattern=[];
var num=0;
var started = false;

$(document).keypress(function(event){
    if(!started)
    {
    var startGame=event.key;
    if(startGame==="s")
      nextSequence();
    
      started=true;
    }
});

function nextSequence()
{
  userPattern=[];
  $("#level-title").text("Level "+num++);

  var randomN =Math.floor(Math.random()*4);
  var randomColorS=buttonColours[randomN];
  gamePattern.push(randomColorS);

  $("#"+randomColorS).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); 
  makeSound(randomColorS);
  animatePress(randomColorS);
  
  
}


$(".btn").on("click",function(){
   
    var userChosenColour=this.id;
    userPattern.push(userChosenColour);
   
    makeSound(userChosenColour);
    animatePress(userChosenColour);
    
    var currentLevel=userPattern.length-1;
    checkAnswer(currentLevel);
    
});

function checkAnswer(currentLevel)
{
    console.log(userPattern);
    console.log(gamePattern);
   
    if(userPattern[currentLevel]==gamePattern[currentLevel])
    {
        if(userPattern.length==gamePattern.length)

        {

            setTimeout(function(){
            nextSequence(); 
            },1000);
        }
    }
    else
    {
        makeSound("any");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over!! Press any key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },500);
        
        startOver();
    }


}

function startOver()
{    
        gamePattern=[];
        num=0;
        started=false;  
}
function makeSound(randomColorS)
{
    switch (randomColorS) {
        case "blue":
            var audio=new Audio("sounds/blue.mp3");
            audio.play();
            break;
        case "red":
            var audio=new Audio("sounds/red.mp3");
            audio.play();
            break;
        case "yellow":
            var audio=new Audio("sounds/yellow.mp3");
            audio.play();
            break;
        case "green":
            var audio=new Audio("sounds/green.mp3");
            audio.play();
            break;            
      
        default: 
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
            break;
      }
}

function animatePress(currentColor)
{
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  },50)
}