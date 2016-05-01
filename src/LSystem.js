var myTurtle, qFlake, src, dest;

function setup() {
    frameRate(20);

    createCanvas(windowWidth, windowHeight);
    console.log(windowWidth);
    background(255);
    stroke('#00ff00');
    src = new p5.Vector(20, 100);
    dest = new p5.Vector(300, 600);
    // fill('#ff00ff');
    // strokeWeight(4);
    var island = new TSystem(200, Math.PI / 2, 0.25, 'F,-,F,-,F,-,F,-');
    island.addVocab('F', 'F', 'F,-,F,+,F,+,F,F,-,F,-,F,+,F');
    var qFlake = new TSystem(200, Math.PI / 2, 0.25, '-,F');
    qFlake.addVocab('F', 'F', 'F,+,F,-,F,-,F,+,F');
    var chain = new TSystem(400, Math.PI / 2, 0.25, 'F,-,F,-,F,-,F,-');
    chain.addVocab('F', 'F', 'F,F,-,F,-,F,-,F,-,F,-,F,+,F');
    var box = new TSystem(4, Math.PI / 2, 0.25, 'F,-,F,-,F,-,F,-');
    box.addVocab('F', 'F', 'F,F,-,F,-,F,-,F,-,F,F');
    var serpienski = new TSystem(100, Math.PI / 3, 0.33, 'R');
    serpienski.addVocab('R', 'F', '-,L,+,R,+,L');
    serpienski.addVocab('L', 'F', '+,R,-,L,-,R');
    serpienski.addVocab('-', '-', '+');
    serpienski.addVocab('+', '+', '-');

    myTurtle = new Turtle(windowWidth / 8, windowHeight / 8, 0, island);

    // myTurtle.setTrace(src);
    var boxT = new Turtle(windowWidth / 6, windowHeight / 6, 0, box);



    var flakeT = new Turtle(windowWidth / 2, windowHeight / 2, 0, qFlake);
    var chainT = new Turtle(windowWidth / 8, windowHeight / 2, 0, chain);
    var serpT = new Turtle(windowWidth / 8, windowHeight / 2, 0, serpienski);
    // console.log(myTurtle);
    // myTurtle.interpret();
    // serpT.interpret();
    // serpT.spawn(3);
    // boxT.spawn(6);
    // myTurtle.spawn(3);
    // flakeT.spawn(3);
    // chainT.spawn(3);
    // myTurtle.display();
    // flakeT.display();
    // chainT.display();
}

function draw() {
    // stroke('#ff00ff');
    // background(128);
    // traceLine    
    // for (var i = myTurtle.points.length - 1; i > 0; i--) {

    // myTurtle.display();

    // } // myTurtle.traceLine(myTurtle.startPosition, dest);
    // console.log(dest);
    // myTurtle.incrementTrace(src, dest);
    // console.log(myTurtle.tracePoint);
    // myTurtle.display();
    // background(128);




}