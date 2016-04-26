function Turtle(x = 0, y = 0, head = 0, step = 400, delta = Math.PI / 2, system) {
    var initVocab = {
        F: 'F,-,F,+,F,F,-,F,-,F,+,F',
        '-': '-',
        '+': '+'
    };
    DOL.call(this, initVocab, 'F,-,F,-,F,-,F');
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

Turtle.prototype.forward = function(draw = true) {
    console.log('old position');
    console.log(this.position);
    this.position = p5.Vector.add(this.position, this.hVector);
    var newPos = this.position;
    this.position.add(this.hVector);
    console.log('new position');
    console.log(newPos);
    console.log('n position');
    console.log('this position');
    console.log(this.position);
    this.points.push(newPos);
    this.points.forEach(function(pt) {
        console.log(pt);
    }, this);
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
    var splitString = this.string.split(',');
    splitString.forEach(function(el) {
        if (this.commands[el] != false) {
            this.commands[el].call(this);
        }
    }, this);
};

Turtle.prototype.spawn = function(depth = 1) {
    for (var i = depth - 1; i >= 0; i--) {
        DOL.prototype.spawn.call(this);
        this.step *= this.stepFactor;
    }
};

Turtle.prototype.display = function() {
    stroke('#00ff00');
    beginShape();
    for (var i = this.points.length - 1; i > 0; i--) {
        vertex(this.points[i].x, this.points[i].y);
        vertex(this.points[i - 1].x, this.points[i - 1].y);
    }
    endShape(CLOSE);
};