function Turtle(x = 0, y = 0, head = 0, step = 400, delta = Math.PI / 2, system) {
    this.system = system || new DOL({
        F: 'F,-,F,+,F,+,F,F,-,F,-,F,+,F',
        '-': '-',
        '+': '+'
    }, 'F,-,F,-,F,-,F');
    DOL.call(this, this.system.vocabulary, this.system.axiom);
    this.position = new p5.Vector(x, y);
    this.startPosition = this.position.copy();
    this.hVector = new p5.Vector.fromAngle(head).mult(step);
    this.getHeading();

    this.step = step;
    this.delta = delta;
    this.stepFactor = 0.25;
    this.points = [this.position];
    this.commands = {
        F: this.forward,
        f: this.blankForward,
        '-': this.clockwise,
        '+': this.counterClockwise
    };
}

Turtle.prototype = Object.create(DOL.prototype);

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
    this.step *= this.stepFactor;
    this.resetMag();
};
Turtle.prototype.setSystem = function() {
    // body...
};

Turtle.prototype.forward = function(draw = true) {
    this.position = p5.Vector.add(this.position, this.hVector);
    var newPos = this.position;
    this.position.add(this.hVector);
    this.points.push(newPos);
    this.points.forEach(function(pt) {}, this);
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
            this.commands[el].call(this);
        }
    }, this);
};

Turtle.prototype.spawn = function(depth = 1) {
    for (var i = depth - 1; i >= 0; i--) {
        DOL.prototype.spawn.call(this);
        this.scaleStep();
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