function Turtle(x = 0, y = 0, head = 0, step = 5, delta = Math.PI / 2) {
    this.position = {
        x: x,
        y: y
    };
    this.heading = head;
    this.step = step;
    this.delta = delta;
}

Turtle.prototype.forward = function(draw = true) {
    var dx = Math.cos(this.delta) * this.step;
    var dy = Math.sin(this.delta) * this.step;
    console.log(this.position);

    this.position.x += dx;
    this.position.y += dy;
    console.log(this.position);

};