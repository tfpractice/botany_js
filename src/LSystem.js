var myTurtle, qFlake;

function setup() {


    createCanvas(windowWidth, windowHeight);
    console.log(windowWidth);
    background(255);
    stroke('#00ff00');
    // fill('#ff00ff');
    // strokeWeight(4);
    var island = new TSystem(200, Math.PI / 2, 0.25, 'F,-,F,-,F,-,F,-');
    island.addVocab('F', 'F', 'F,-,F,+,F,+,F,F,-,F,-,F,+,F');
    var qFlake = new TSystem(200, Math.PI / 2, 0.25, '-,F');
    qFlake.addVocab('F', 'F', 'F,+,F,-,F,-,F,+,F');
    var chain = new TSystem(400, Math.PI / 2, 0.25, 'F,-,F,-,F,-,F,-');
    chain.addVocab('F', 'F', 'F,F,-,F,-,F,-,F,-,F,-,F,+,F');
    myTurtle = new Turtle(windowWidth / 8, windowHeight / 8, 0, island);
    var flakeT = new Turtle(windowWidth / 2, windowHeight / 2, 0, qFlake);
    var chainT = new Turtle(windowWidth / 8, windowHeight / 2, 0, chain);
    // console.log(myTurtle);
    // myTurtle.interpret();
    // myTurtle.spawn(3);
    // flakeT.spawn(3);
    // chainT.spawn(3);
    // myTurtle.display();
    // flakeT.display();
    // chainT.display();
}

function draw() {
    // stroke('#ff00ff');

    // myTurtle.display();
    // background(128);




}