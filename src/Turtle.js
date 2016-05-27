Botany = (function(bMod) {
    bMod.Turtle = function(x = 0, y = 0, head = 0, system = new bMod.TSystem()) {
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
        this.setTracePoints();
    }

    bMod.Turtle.prototype = Object.create(bMod.TSystem.prototype);

    bMod.Turtle.prototype.sysUpdate = function(sys) {
        this.system = sys;
    };

    bMod.Turtle.prototype.copyVocab = function(system) {
        this.vocabulary = system.vocabulary;
    };

    bMod.Turtle.prototype.getHeading = function() {
        this.heading = this.hVector.heading();
    };

    bMod.Turtle.prototype.resetMag = function() {
        this.hVector.setMag(this.system.step);
    };

    bMod.Turtle.prototype.setTracePoints = function() {
        this.tracePoints = [];
        this.points.forEach(function(pt) {
            this.addTP(pt);
        }, this);
    };

    bMod.Turtle.prototype.addTP = function(pt) {
        this.tracePoints.push(pt.copy());
    };

    bMod.Turtle.prototype.scaleStep = function() {
        this.system.scaleStep();
        this.resetMag();
    };

    bMod.Turtle.prototype.forward = function(draw = true) {
        var oldPos = this.position;
        this.position = p5.Vector.add(this.position, this.hVector);
        var newPos = this.position.copy();
        if (draw == true) {
            line(oldPos.x, oldPos.y, this.position.x, this.position.y);
        }
        this.points.push(this.position);
    };

    bMod.Turtle.prototype.getLerp = function(p1, p2) {
        return p5.Vector.lerp(p1, p2, 0.05);
    };

    bMod.Turtle.prototype.blankForward = function() {
        this.forward(false);
    };

    bMod.Turtle.prototype.clockwise = function() {
        this.hVector.rotate(this.system.delta);
        this.getHeading();
    };

    bMod.Turtle.prototype.counterClockwise = function() {
        this.hVector.rotate(-1 * (this.system.delta));
        this.getHeading();
    };

    bMod.Turtle.prototype.resetPoints = function() {
        this.points = [];
    };

    bMod.Turtle.prototype.interpret = function() {
        this.resetPoints();
        this.system.splitFilter().forEach(function(el) {
            if (this.commands[el] != false) {
                var comm = this.getCommand(el);
                this.commands[comm].call(this);
            }
        }, this);
        this.setTracePoints();
    };

    bMod.Turtle.prototype.getCommand = function(term) {
        return this.system.vocabulary[term].command;
    };

    bMod.Turtle.prototype.spawn = function(depth = 1) {
        for (var i = depth - 1; i >= 0; i--) {
            this.interpret();
            this.system.spawn();
        }
        this.string = this.system.string;
        this.resetMag();
    };

    bMod.Turtle.prototype.intersect = function(p1, p2) {
        return p5.Vector.sub(p1, p2).array() == [0, 0, 0];
    };

    bMod.Turtle.prototype.display = function() {
        stroke('#ff00ff');
        var tLen = this.tracePoints.length;
        var lastID = tLen - 1;
        for (var i = 0; i <= lastID; i++) {
            var nextIndex = (i + 1) % tLen;
            var trace = this.tracePoints[i];
            var p1 = this.points[i];
            var p2 = this.points[nextIndex];
            var currLerp = this.getLerp(p1, p2).sub(p1);
            if (trace.dist(p2) > 1) {
                trace.add(currLerp);
                line(p1.x, p1.y, trace.x, trace.y);
            }
        }
    };


    return bMod;
})(Botany);



// function bMod.Turtle(x = 0, y = 0, head = 0, system = new TSystem()) {
//     this.position = new p5.Vector(x, y);
//     this.startPosition = this.position.copy();
//     this.hVector = new p5.Vector.fromAngle(head)
//     this.system = system;
//     this.points = [this.position];
//     this.commands = {
//         'F': this.forward,
//         'f': this.blankForward,
//         '-': this.clockwise,
//         '+': this.counterClockwise
//     };
//     this.resetMag();
//     this.getHeading();
//     this.tracePoint = this.position.copy();
//     this.tracePoints = [];
//     this.setTracePoints();
// }

// bMod.Turtle.prototype = Object.create(TSystem.prototype);

// bMod.Turtle.prototype.sysUpdate = function(sys) {
//     this.system = sys;
// };

// bMod.Turtle.prototype.copyVocab = function(system) {
//     this.vocabulary = system.vocabulary;
// };

// bMod.Turtle.prototype.getHeading = function() {
//     this.heading = this.hVector.heading();
// };

// bMod.Turtle.prototype.resetMag = function() {
//     this.hVector.setMag(this.system.step);
// };

// bMod.Turtle.prototype.setTracePoints = function() {
//     this.tracePoints = [];
//     this.points.forEach(function(pt) {
//         this.addTP(pt);
//     }, this);
// };

// bMod.Turtle.prototype.addTP = function(pt) {
//     this.tracePoints.push(pt.copy());
// };

// bMod.Turtle.prototype.scaleStep = function() {
//     this.system.scaleStep();
//     this.resetMag();
// };

// bMod.Turtle.prototype.forward = function(draw = true) {
//     var oldPos = this.position;
//     this.position = p5.Vector.add(this.position, this.hVector);
//     var newPos = this.position.copy();
//     if (draw == true) {
//         line(oldPos.x, oldPos.y, this.position.x, this.position.y);
//     }
//     this.points.push(this.position);
// };

// bMod.Turtle.prototype.getLerp = function(p1, p2) {
//     return p5.Vector.lerp(p1, p2, 0.05);
// };

// bMod.Turtle.prototype.blankForward = function() {
//     this.forward(false);
// };

// bMod.Turtle.prototype.clockwise = function() {
//     this.hVector.rotate(this.system.delta);
//     this.getHeading();
// };

// bMod.Turtle.prototype.counterClockwise = function() {
//     this.hVector.rotate(-1 * (this.system.delta));
//     this.getHeading();
// };

// bMod.Turtle.prototype.resetPoints = function() {
//     this.points = [];
// };

// bMod.Turtle.prototype.interpret = function() {
//     this.resetPoints();
//     this.system.splitFilter().forEach(function(el) {
//         if (this.commands[el] != false) {
//             var comm = this.getCommand(el);
//             this.commands[comm].call(this);
//         }
//     }, this);
//     this.setTracePoints();
// };

// bMod.Turtle.prototype.getCommand = function(term) {
//     return this.system.vocabulary[term].command;
// };

// bMod.Turtle.prototype.spawn = function(depth = 1) {
//     for (var i = depth - 1; i >= 0; i--) {
//         this.interpret();
//         this.system.spawn();
//     }
//     this.string = this.system.string;
//     this.resetMag();
// };

// bMod.Turtle.prototype.intersect = function(p1, p2) {
//     return p5.Vector.sub(p1, p2).array() == [0, 0, 0];
// };

// bMod.Turtle.prototype.display = function() {
//     stroke('#ff00ff');
//     var tLen = this.tracePoints.length;
//     var lastID = tLen - 1;
//     for (var i = 0; i <= lastID; i++) {
//         var nextIndex = (i + 1) % tLen;
//         var trace = this.tracePoints[i];
//         var p1 = this.points[i];
//         var p2 = this.points[nextIndex];
//         var currLerp = this.getLerp(p1, p2).sub(p1);
//         if (trace.dist(p2) > 1) {
//             trace.add(currLerp);
//             line(p1.x, p1.y, trace.x, trace.y);
//         }
//     }
// };