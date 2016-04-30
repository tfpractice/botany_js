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
    TSystem.call(this, this.system.step, this.system.delta, this.system.stepFactor);
    this.copyVocab(system);
    this.resetMag();
    this.getHeading();
}

Turtle.prototype = Object.create(TSystem.prototype);

Turtle.prototype.copyVocab = function(system) {
    this.vocabulary = system.vocabulary;
};
Turtle.prototype.getHeading = function() {
    this.heading = this.hVector.heading();
};

Turtle.prototype.setDelta = function(dVal) {
    this.delta = dVal;
};

Turtle.prototype.setStep = function(sVal = 1) {
    this.step = sVal;
    this.resetMag();
};

Turtle.prototype.resetMag = function() {
    this.hVector.setMag(this.step);
};

Turtle.prototype.scaleStep = function() {
    TSystem.prototype.scaleStep.call(this);
    this.resetMag();
};

Turtle.prototype.forward = function(draw = true) {
    this.position = p5.Vector.add(this.position, this.hVector);
    var newPos = this.position;
    this.position.add(this.hVector);
    this.points.push(newPos);
};

Turtle.prototype.blankForward = function() {
    this.forward(false);
};

Turtle.prototype.clockwise = function() {
    this.hVector.rotate(this.delta);
    this.getHeading();
};

Turtle.prototype.counterClockwise = function() {
    this.hVector.rotate(-1 * (this.delta));
    this.getHeading();
};

Turtle.prototype.interpret = function() {
    this.splitFilter().forEach(function(el) {
        if (this.commands[el] != false) {
            var comm = this.getCommand(el);
            this.commands[comm].call(this);
        }
    }, this);
};

Turtle.prototype.getCommand = function(term) {
    return this.vocabulary[term].command;
};

Turtle.prototype.spawn = function(depth = 1) {
    for (var i = depth - 1; i >= 0; i--) {
        TSystem.prototype.spawn.call(this);
    }
};

Turtle.prototype.display = function() {
    this.interpret();
    stroke('#00ff00');
    beginShape();
    for (var i = this.points.length - 1; i > 0; i--) {
        vertex(this.points[i].x, this.points[i].y);
        vertex(this.points[i - 1].x, this.points[i - 1].y);
    }
    endShape(CLOSE);
};