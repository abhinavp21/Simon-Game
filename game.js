const buttonColors = ['red', 'blue', 'green', 'yellow']
var userClickedPattern = []
var gamePattern = []
var c = 0
var level = 0
var sublevel =0
var userChosenColour =""
$('html').on('keypress', function () {
    c++
    if (c == 1)
        nextSequence();
})
$('.btn').on('click', function () {
    sublevel++                                              
    userChosenColour = $(this).attr('id')
    console.log(userChosenColour);
    var cond = checkAnswer(sublevel-1)
    if (cond == true) {
        playSound(userChosenColour)
        animatePress(userChosenColour)
        userClickedPattern.push(userChosenColour)
        if(sublevel == level)
            setTimeout(() => {
                nextSequence()
            }, 1000);
    }
    else{
        $('body').addClass('game-over')
        playSound('wrong')
        $('h1').text('Game Over, Press Any Key to Restart')
        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 200);
        startOver()
    }   
})
function checkAnswer(currentLevel) {         // index of last element of userInput
    return gamePattern[currentLevel] == userChosenColour
}
function nextSequence() {
    level++
    sublevel=0
    userClickedPattern=[]
    $('h1').text(`Level ${level}`)
    var variableNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColors[variableNumber]
    gamePattern.push(randomChosenColour)
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)
}
function playSound(name) {
    var sound = new Audio(`sounds/${name}.mp3`)
    sound.play()
}
function animatePress(currentColor) {
    var element = $(`#${currentColor}`)
    element.addClass('pressed')
    setTimeout(function () {
        element.removeClass('pressed')
    }, 100)
}
function startOver(){
    c=0
    level=0
    gamePattern = []
}
