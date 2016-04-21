function Turtle(x = 0, y = 0, head = 0, step = 40, delta = Math.PI / 2, system) {
    var initVocab = {
        F: 'F,-,F,+,F,F,-,F,-,F,+,F',
        '-': '-',
        '+': '+'
    };
    DOL.call(this, initVocab, 'F,-,F,-,F,-,F');
    this.position = {
        x: x,
        y: y
    };
    this.heading = head;
    this.step = step;
    this.delta = delta;
    this.stepFactor = 0.25;
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
    // console.log(this);
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

Turtle.prototype.interpret = function() {
    var splitString = this.string.split(',');
    // console.log(splitString);
    splitString.forEach(function(el) {
        if (this.commands[el] != false) {
            // console.log(this.commands[el]);
            this.commands[el].call(this);
        }
    }, this);
};
Turtle.prototype.spawn = function() {
    DOL.prototype.spawn.call(this);
    this.step *= this.stepFactor;

};