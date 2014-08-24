/**
 * Created by nsnguyen on 3/22/14.
 */

//global object to hold all gobal variables related to the game
var matchingGame={};

//all Jacks Kings Queens card
matchingGame.deck =[
'cardAK', 'cardAK',
'cardAQ', 'cardAQ',
'cardAJ', 'cardAJ',
'cardBK', 'cardBK',
'cardBQ', 'cardBQ',
'cardBJ', 'cardBJ'
];

//every $(function(){}) will run after DON is loaded and ready.
$(function(){
    //shuffle deck
    matchingGame.deck.sort(shuffle);

    //clone 12 copies of card
    for(var i = 0; i < 11; i++){
        $(".card:first-child").clone().appendTo("#cards");
    }

    //initialize each card
    $("#cards").children().each(function(index){
        $(this).css({
            "left" : ($(this).width() + 20) * (index % 4),
            "top" : ($(this).height() + 20) * Math.floor(index / 4)
        });
        //get a pattern from the shuffled deck
        var pattern = matchingGame.deck.pop();

        //visually apply the pattern on the card's back side
        //pattern value is actually a CSS class with the corresponding playing card graphic
        $(this).find(".back").addClass(pattern);

        //embed the pattern data into the DOM element
        $(this).attr("data-pattern",pattern);

        //listen the click event on each card DIV element
        $(this).click(selectCard);
    });
});


//flip card and schedule checking function when click on card
function selectCard(){
    //we do nothing if there are already two card flipped
    if($(".card-flipped").size() > 1 ){
        return;
    }

    //add class "card-flipped"
    //browser will animate the styles between current state and card-flipped
    $(this).addClass("card-flipped");

    //check the pattern of both flipped card 0.7s later.
    if($(".card-flipped").size() == 2 ){

        //delay checkPattern by 700 milliseconds
        setTimeout(checkPattern,700);
    }
}

//shuffle (randomize)
function shuffle(){
    //return a random number
    //sort function determine by either positive and negative number
    //math.random range from 0 -1
    //0.5 - math.random results either positive or negative numbers
    return 0.5 - Math.random();
}

//function to do action when both cards are matched
function checkPattern(){
    if(isMatchPattern()){
        $(".card-flipped").removeClass("card-flipped").addClass("card-removed");

        //delete the card DOM node after transition finished
        $(".card-removed").bind("webkitTransitionEnd", removeTookCards);
    } else{
        $(".card-flipped").removeClass("card-flipped");
    }
}

function removeTookCards(){
    $(".card-removed").remove();
}

function isMatchPattern(){
    var cards = $(".card-flipped");
    var pattern = $(cards[0]).data("pattern");
    var anotherPattern = $(cards[1]).data("pattern");
    return (pattern == anotherPattern);
}



