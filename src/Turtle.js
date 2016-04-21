function Turtle(x = 0, y = 0, head = 0, step = 5, delta = Math.PI / 2, system) {
    var initVocab = {
        F: 'F,-,F,+,F,F,-,F,-,F,+,F'
    };
    DOL.call(this, initVocab, 'F');

    this.position = {
        x: x,
        y: y
    };
    this.heading = head;
    this.step = step;
    this.delta = delta;

    // this.system = new DOL({
    //     F: 'F,-,F,+,F,F,-,F,-,F,+,F'
    // }, 'F,-,F,-,F,-,F');
    // this
}

Turtle.prototype = Object.create(DOL.prototype);

Turtle.prototype.forward = function(draw = true) {
    var dx = Math.cos(this.delta) * this.step;
    var dy = Math.sin(this.delta) * this.step;
    console.log(this.position);

    this.position.x += dx;
    this.position.y += dy;
    console.log(this.position);

};
Turtle.prototype.clockwise = function() {
    this.heading += this.delta;
};
Turtle.prototype.counterClockwise = function() {
    this.heading -= this.delta;
};