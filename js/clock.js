/**
 * Created by nguyen on 8/30/14.
 */
var canvas = document.getElementById('clock'),
    context = canvas.getContext('2d'),
    fontSize = 12,
    margin = 5,
    numberSpacing = 10;
    radius = canvas.width/2 - margin;
    handRadius = radius + numberSpacing,
    handTruncation = canvas.width/12,
    hourHandTruncation = canvas.width/7;


function drawCircle(){
    context.beginPath(); //begin drawing
    context.arc(canvas.width/2, canvas.height/2,radius, 0, 2*Math.PI, false); //context.arc(x,y,r,startingAngle,endingAngle,counterclockwise_if_true);
    context.stroke(); //path is invisible until stroke() is invoked
}

//function drawNumbers(){
//    var numbers = [1,2,3,4,5,6,7,8,9,10,11,12],
//        angle = 0,
//        numberWidth = 0;
//
//    numbers.forEach(function(number){
//        angle = 2*Math.PI / 12 * (number - 3);
//        numberWidth = context.measureText(number).width;
//        context.fillText(number,canvas.width/2 + Math.cos(angle)*(handRadius) - numberWidth/2, canvas.height/2 + Math.sin(angle)*(handRadius) + fontSize/3);
//    })
//}

function drawCenter(){
    context.beginPath(); //begin path
    context.arc(canvas.width/2, canvas.height/2, 2,0,Math.PI*2, true);
    context.fill(); //fill shape
}


function drawHand(loc, isHour){
    var angle = (Math.PI*2) * (loc/60) - Math.PI/ 2,
        handRadius;

        if(isHour == true){
            handRadius = radius - handTruncation - hourHandTruncation;
        }else{
            handRadius = radius - handTruncation;
        }

    context.moveTo(canvas.width/2, canvas.height/2);
    context.lineTo(canvas.width/2 + Math.cos(angle)*handRadius, canvas.height/2 + Math.sin(angle)*handRadius);
    context.stroke();
}


function drawHands(){
    var date = new Date,
        hour = date.getHours();

    hour = hour > 12 ? hour - 12 : hour;

    drawHand(hour*5 + (date.getMinutes()/60)*5, true);
    drawHand(date.getMinutes(),false);
    drawHand(date.getSeconds(), false);
}





function drawClock(){
    context.clearRect(0,0,canvas.width,canvas.height);

    drawCircle();
    drawCenter();
    drawHands();
}


//initialization.......
context.font = fontSize + 'px Arial';
loop = setInterval(drawClock, 1);