var ball;
var database;
var position;

function setup(){
    createCanvas(500,500);

    database = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //ball's position to the database
    //.ref() - reference to the node/field in the database
    var ballPosition = database.ref('ball/position');

    //.on() - listener - listens to the values of the node
    ballPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
        drawSprites();
    }
    
}

function readPosition(data){
    //reading info from the database
    position = data.val();
    console.log(position);
    console.log(position.x);
    console.log(position.y);
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
    consol.log("Error: Cant write into database")
}

function writePosition(x,y){
    //change the position in the database
    //.set() - new values to the database
    database.ref('ball/position').set({
        'x' : position.x + x,
        'y' : position.y + y
    });
}
