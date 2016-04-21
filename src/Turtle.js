function Turtle(x = 0, y = 0, head = 0, step = 5, delta = Math.PI / 2, system) {
    var initVocab = {
        F: 'F,-,F,+,F,F,-,F,-,F,+,F'
    };
    DOL.call(this, initVocab, 'F,-,F,-,F,-,F');
    this.position = {
        x: x,
        y: y
    };
    this.heading = head;
    this.step = step;
    this.delta = delta;
    this.points = new Array([this.position.x, this.position.y]);
    this.commands = {
        F: this.forward,
        f: this.blankForward,
        '-': this.clockwise,
        '+': this.counterClockwise
    };

}

Turtle.prototype = Object.create(DOL.prototype);

Turtle.prototype.forward = function(draw = true) {
    var dx = Math.cos(this.heading) * this.step;
    var dy = Math.sin(this.heading) * this.step;
    this.position.x += dx;
    this.position.y += dy;
    this.points.push([this.position.x, this.position.y]);
};

Turtle.prototype.blankForward = function() {
    this.forward(false);
};

Turtle.prototype.clockwise = function() {
    this.heading += this.delta;
};

Turtle.prototype.counterClockwise = function() {
    this.heading -= this.delta;
};