var islandT, qFlake, src, dest, show;

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
    var island = new TSystem(100, Math.PI / 2, 0.25, 'F,-,F,-,F,-,F,-');
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

    islandT = new Turtle(windowWidth / 8, windowHeight / 8, 0, island);

    // islandT.setTrace(src);
    var boxT = new Turtle(windowWidth / 6, windowHeight / 6, 0, box);



    var flakeT = new Turtle(windowWidth / 2, windowHeight / 2, 0, qFlake);
    var chainT = new Turtle(windowWidth / 8, windowHeight / 2, 0, chain);
    var serpT = new Turtle(windowWidth / 8, windowHeight / 2, 0, serpienski);
    // console.log(islandT);
    // islandT.interpret();
    // serpT.interpret();
    // serpT.spawn(3);
    // boxT.spawn(6);
    islandT.spawn(2);
    // flakeT.spawn(3);
    // chainT.spawn(3);
    // islandT.display();
    // flakeT.display();
    // chainT.display();
    // display(22);
}

function mousePressed() {
    // set our isDrawing variable equal to true
    show = true;
}

function mouseReleased() {
    // set our isDrawing variable equal to false
    show = false;
}

function draw() {
    // stroke('#ff00ff');
    // background(128);
    // traceLine    
    // for (var i = islandT.points.length - 1; i > 0; i--) {
    // display
    if (show == true) {
        islandT.display();
    }
    // } // islandT.traceLine(islandT.startPosition, dest);
    // console.log(dest);
    // islandT.incrementTrace(src, dest);
    // console.log(islandT.tracePoint);
    // islandT.display();
    // background(128);




}