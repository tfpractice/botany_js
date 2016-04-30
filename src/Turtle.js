function Turtle(x = 0, y = 0, head = 0, system = new TSystem()) {
    this.position = new p5.Vector(x, y);
    this.startPosition = this.position.copy();
    this.hVector = new p5.Vector.fromAngle(head)
    this.system = system;
    this.points = [this.position];
    this.commands = {
        'F': this.forward,
        'f': this.blankForward,
        '-': this.clockwise,
        '+': this.counterClockwise
    };
    // TSystem.call(this, this.system.step, this.system.delta, this.system.stepFactor);
    // this.copyVocab(system);
    this.resetMag();
    this.getHeading();
}

Turtle.prototype = Object.create(TSystem.prototype);

Turtle.prototype.sysUpdate = function(sys) {
    this.system = sys;
};
Turtle.prototype.copyVocab = function(system) {
    this.vocabulary = system.vocabulary;
};
Turtle.prototype.getHeading = function() {
    this.heading = this.hVector.heading();
};

Turtle.prototype.resetMag = function() {
    this.hVector.setMag(this.system.step);
};

Turtle.prototype.scaleStep = function() {
    this.system.scaleStep();
    // TSystem.prototype.scaleStep.call(this);
    this.resetMag();
};

Turtle.prototype.forward = function(draw = true) {
    var oldPos = this.position;

    this.position = p5.Vector.add(this.position, this.hVector);
    // console.log('oldPos:', oldPos);
    // console.log('thisPos:', this.position);
    if (draw == true) {
        line(oldPos.x, oldPos.y, this.position.x, this.position.y);
    }
    // this.position.add(this.hVector);
    this.points.push(this.position);
};

Turtle.prototype.blankForward = function() {
    this.forward(false);
};

Turtle.prototype.clockwise = function() {
    this.hVector.rotate(this.system.delta);
    this.getHeading();
};

Turtle.prototype.counterClockwise = function() {
    this.hVector.rotate(-1 * (this.system.delta));
    this.getHeading();
};

Turtle.prototype.interpret = function() {
    this.system.splitFilter().forEach(function(el) {
        if (this.commands[el] != false) {
            var comm = this.getCommand(el);
            this.commands[comm].call(this);
        }
    }, this);
};

Turtle.prototype.getCommand = function(term) {
    return this.system.vocabulary[term].command;
};

Turtle.prototype.spawn = function(depth = 1) {
    for (var i = depth - 1; i >= 0; i--) {
        this.interpret();
        this.system.spawn();

    }
    this.string = this.system.string;
    this.resetMag();
};

Turtle.prototype.display = function() {
    this.interpret();
    stroke('#00ff00');
    // beginShape();
    // for (var i = this.points.length - 1; i > 0; i--) {
    // vertex(this.points[i].x, this.points[i].y);
    // vertex(this.points[i - 1].x, this.points[i - 1].y);
    // }
    // endShape(CLOSE);
};