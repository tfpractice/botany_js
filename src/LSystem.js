var myTurtle;

function setup() {


    createCanvas(windowWidth, windowHeight);
    console.log(windowWidth);
    background(255);
    stroke('#00ff00');
    // fill('#ff00ff');
    strokeWeight(4);
    // myLoc = new p5.Vector(200, 200);
    myTurtle = new Turtle(windowWidth / 2, windowHeight / 2, 0);

    console.log(myTurtle);
    // myTurtle.interpret();
    // myTurtle.display();
}

function draw() {
    // stroke('#ff00ff');

    // myTurtle.display();
    // background(128);




}