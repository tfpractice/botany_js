function Turtle(x = 0, y = 0, head = 0, step = 40, delta = Math.PI / 2, system) {
    var initVocab = {
        F: 'F,-,F,+,F,F,-,F,-,F,+,F',
        '-': '-',
        '+': '+'
    };
    DOL.call(this, initVocab, 'F,-,F,-,F,-,F');
    // this.position = {
    //     x: x,
    //     y: y
    // };
    this.position = new p5.Vector(x, y);
    this.startPosition = this.position.copy();
    this.hVector = new p5.Vector.fromAngle(head).mult(step);

    this.heading = this.hVector.heading();
    this.step = step;
    this.delta = delta;
    this.stepFactor = 0.25;
    this.points = new Array(this.position);
    this.commands = {
        F: this.forward,
        f: this.blankForward,
        '-': this.clockwise,
        '+': this.counterClockwise
    };
    console.log(this.hVector);
}
Turtle.prototype = Object.create(DOL.prototype);

Turtle.prototype.forward = function(draw = true) {
    this.position.add(this.hVector);
    console.log(this.position);
    // var dx = Math.cos(this.heading) * this.step;
    // var dy = Math.sin(this.heading) * this.step;
    // this.position.x += dx;
    // this.position.y += dy;
    this.points.push(this.position);
    console.log('postion');
};

Turtle.prototype.blankForward = function() {
    this.forward(false);
};

Turtle.prototype.clockwise = function() {
    // this.heading += this.delta;
    this.hVector.rotate(this.delta);
    this.heading = this.hVector.heading();
    console.log(this.heading);

};

Turtle.prototype.counterClockwise = function() {
    // this.heading -= this.delta;
    this.hVector.rotate(-1 * (this.delta));
    this.heading = this.hVector.heading();

    console.log(this.heading);


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