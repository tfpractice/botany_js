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
    this.resetMag();
    this.getHeading();
    this.tracePoint = this.position.copy();
    this.tracePoints = [];
    // this.addTracePoint(this.position.copy());
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
    this.resetMag();
};

Turtle.prototype.forward = function(draw = true) {
    var oldPos = this.position;
    // this.setTrace(oldPos);
    console.log(oldPos);

    this.position = p5.Vector.add(this.position, this.hVector);
    var newPos = this.position.copy();
    console.log(newPos); // var fact = this.getLerp(oldPos, newPos);
    // .sub(oldPos);

    if (draw == true) {
        // while (this.tracePoint.x != newPos.x) {
        // this.tracePoint.add(fact);
        // line(oldPos.x, oldPos.y, this.tracePoint.x, this.tracePoint.y);

        // }
        // this.incrementTrace(oldPos, newPos);
        // ellipse(newPos.x, newPos.y, 10, 10);
        line(oldPos.x, oldPos.y, this.position.x, this.position.y);
    }
    this.points.push(this.position);
};

// Turtle.prototype.traceLine = function(p1, p2) {
//     var lerpVector = p1.lerp(p2.x, p2.y, 0.5);
//     this.tracePoint = p1.copy();

//     if (this.tracePoint.equals(p2) == false) {
//         // for (var i = 3; i >= 0; i--) {
//         this.tracePoint.add(lerpVector);
//         line(p1.x, p1.y, this.tracePoint.x, this.tracePoint.y);
//     }



//     // }
// };
// Turtle.prototype.setTrace = function(p1) {
// this.tracePoint = p1.copy();
// this.tracePoint.normalize();
// var lerpVector = p1.lerp(p2.x, p2.y, 0.01);


// };

// Turtle.prototype.getLerp = function(p1, p2) {
// return p5.Vector.lerp(p1, p2, 0.05);
// };

// Turtle.prototype.incrementTrace = function(p1, p2) {
//     var theta = p5.Vector.angleBetween(p1, p2);
//     // this.tracePoint.heading = theta;
//     var lerpV = this.getLerp(this.tracePoint, p2).sub(p1);
//     var d = p1.dist(p2);
//     console.log('dist', d);
//     // var diff = p1.sub(p2);
//     // console.log('diff', diff);
//     // this.tracePoint
//     // if (this.tracePoint.equals(p2) == false) {
//     console.log('src', p1);
//     console.log('prepoint', this.tracePoint);
//     console.log('dest', p2);
//     console.log('lerpV', lerpV);
//     var traceCopy = p5.Vector.add(this.tracePoint, d / 20);
//     console.log('traceCopy', traceCopy);
//     this.tracePoint.add(lerpV);
//     console.log('postpoint', this.tracePoint);
//     // console.log(this.tracePoint);
//     // line(lerpV.x, lerpV.y, p2.x, p2.y);
//     // line(p1.x, p1.y, lerpV.x, lerpV.y);
//     line(p1.x, p1.y, this.tracePoint.x, this.tracePoint.y);
//     // }
// };
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
    stroke('#00ff00');
    this.interpret();
    // for (var i = this.points.length - 1; i > 0; i--) {
    // this.setTrace(this.points[i - 1]);
    // this.incrementTrace(this.points[i - 1], this.points[i]);
    // }

};