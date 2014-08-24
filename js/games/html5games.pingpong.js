/**
 * Created by nsnguyen on 3/20/14.
 */
// setting variable names to key pressed
var KEY = {
    UP: 38, DOWN: 40, W: 87, S: 83
}
//global variables
var pingpong ={
    scoreA: 0, //score for player A
    scoreB: 0  //score for player B
}

//array to store pressedKeys
pingpong.pressedKeys =[];

pingpong.ball = {
    speed: 5, x: 150, y: 100, directionX: 1, directionY: 1
}

$(function(){
   //set interval to call gameloop every 30 milliseconds
    pingpong.timer = setInterval(gameloop, 30);

    //mark down what key is down and up into array
    $(document).keydown(function(event){
        pingpong.pressedKeys[event.which] = true;
    });
    $(document).keyup(function(event){
       pingpong.pressedKeys[event.which] = false;
    });
});

//initializer
function gameloop(){
    moveBall();
    movePaddles();

}

function moveBall(){
    //reference useful variables
    var playgroundHeight = parseInt($("#playground").height());
    var playgroundWidth = parseInt($("#playground").width());
    var ball = pingpong.ball;

    //check playground boundary
    //check bottom edge
    if(ball.y + ball.speed * ball.directionY > playgroundHeight){
        ball.directionY = -1;
    }

    //check top edge
    if(ball.y + ball.speed * ball.directionY < 0){
        ball.directionY = 1;
    }

    //check right edge
    if(ball.x + ball.speed * ball.directionX > playgroundWidth){
        ball.directionX = -1;
    }

    //check left edge
    if(ball.x + ball.speed * ball.directionX < 0){
        ball.directionX = 1;
    }
    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;

    //check moving paddle here
    //check left paddle
    var paddleAX = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
    var paddleAYBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
    var paddleAYTop = parseInt($("#paddleA").css("top"));
    if(ball.x + ball.speed * ball.directionX < paddleAX){
        if (ball.y + ball.speed * ball.directionY <= paddleAYBottom && ball.y + ball.speed * ball.directionY >= paddleAYTop){
            ball.directionX = 1;
        }
    }

    //check right paddle
    var paddleBX = parseInt($("#paddleB").css("left"));
    var paddleBYBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
    var paddleBYTop = parseInt($("#paddleB").css("top"));
    if(ball.x + ball.speed * ball.directionX >= paddleBX){
        if(ball.y + ball.speed * ball.directionY <= paddleBYBottom && ball.y + ball.speed * ball.directionY >= paddleBYTop){
            ball.directionX = -1;
        }
    }

    //check right edge
    if(ball.x + ball.speed * ball.directionX > playgroundWidth){
        //player B lost
        pingpong.scoreA++;
        $("#scoreA").html(pingpong.scoreA);

        //reset the ball;
        ball.x = 250;
        ball.y = 100;
        $("#ball").css({
            "left": ball.x,
            "right": ball.y
        });
        ball.directionX = -1;
    }

    //check left edge
    if(ball.x + ball.speed * ball.directionX < 0){
        //player A lost
        pingpong.scoreB++;
        $("#scoreB").html(pingpong.scoreB);

        //reset the ball;
        ball.x = 250;
        ball.y = 100;
        $("#ball").css({
            "left": ball.x,
            "right": ball.y
        });
        ball.direcitonX =1;
    }

    //actually move ball with speed and direction
    $("#ball").css({
        "left" : ball.x,
        "top" : ball.y
    });
};

function movePaddles(){
    //use our custom timer to check if key is pressed
    if(pingpong.pressedKeys[KEY.UP]) {
        //arrow up key
        //move paddle B up 5 pixels
        var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top",top -5);

    }
    if(pingpong.pressedKeys[KEY.DOWN]){
        //arrow down key
        //move paddle B down 5 pixels
        var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top",top+5);
    }
    if(pingpong.pressedKeys[KEY.W]){
        //w key
        //move paddle A up 5 pixels
        var top = parseInt($("#paddleA").css("top"));
        $("#paddleA").css("top",top-5);
    }
    if(pingpong.pressedKeys[KEY.S]){
        //s key
        //move paddle A down 5 pixels
        var top = parseInt($("#paddleA").css("top"));
        $("#paddleA").css("top",top+5);
    }
};