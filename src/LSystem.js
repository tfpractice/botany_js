var islandT, qFlake, src, dest, show;

function setup() {
    frameRate(20);
    createCanvas(windowWidth, windowHeight);
    console.log(windowWidth);
    background(255);
    stroke('#00ff00');
    src = new p5.Vector(20, 100);
    dest = new p5.Vector(300, 600);
    var island = new Botany.TSystem(10, Math.PI / 2, 0.25, 'F,-,F,-,F,-,F,-');
    island.addVocab('F', 'F', 'F,-,F,+,F,+,F,F,-,F,-,F,+,F');
    var qFlake = new Botany.TSystem(200, Math.PI / 2, 0.25, '-,F');
    qFlake.addVocab('F', 'F', 'F,+,F,-,F,-,F,+,F');
    var chain = new Botany.TSystem(400, Math.PI / 2, 0.25, 'F,-,F,-,F,-,F,-');
    chain.addVocab('F', 'F', 'F,F,-,F,-,F,-,F,-,F,-,F,+,F');
    var box = new Botany.TSystem(4, Math.PI / 2, 0.25, 'F,-,F,-,F,-,F,-');
    box.addVocab('F', 'F', 'F,F,-,F,-,F,-,F,-,F,F');
    var serpienski = new Botany.TSystem(100, Math.PI / 3, 0.33, 'R');
    serpienski.addVocab('R', 'F', '-,L,+,R,+,L');
    serpienski.addVocab('L', 'F', '+,R,-,L,-,R');
    serpienski.addVocab('-', '-', '+');
    serpienski.addVocab('+', '+', '-');
    islandT = new Botany.Turtle(windowWidth / 8, windowHeight / 8, 0, island);
    var boxT = new Botany.Turtle(windowWidth / 6, windowHeight / 6, 0, box);
    var flakeT = new Botany.Turtle(windowWidth / 2, windowHeight / 2, 0, qFlake);
    var chainT = new Botany.Turtle(windowWidth / 8, windowHeight / 2, 0, chain);
    var serpT = new Botany.Turtle(windowWidth / 8, windowHeight / 2, 0, serpienski);
    islandT.spawn(4);
}

function mousePressed() {
    show = true;
}

function mouseReleased() {
    show = false;
}

function draw() {
    if (show == true) {
        islandT.display();
    }
}