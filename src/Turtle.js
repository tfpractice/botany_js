Botany = (function(
    /**
     * Turtle functions for Botany module.
     */
    bMod) {
    /**
     * Creates a LOGO-style Turtle
     * @constructor module:Botany.Turtle
     * @augments {module:Botany.TSystem}
     * @param  {Number} x the initial x position for the Turtle
     * @param  {Number} y the initial y position for the Turtle
     * @param  {Number} head the initial heading
     * @param  {module:Botany.TSystem} [system = new Botany.TSystem()] the initial Lindemeyer System
     * @property {p5.Vector} position the current position vector
     * @property {p5.Vector} startPosition the initial position vector
     * @property {p5.Vector} hVector the current heading vector
     * @property {module:Botany.TSystem} system the current Lindemeyer System
     * @property {Object} commands the set of commands governing the Tutle's motion
     * @property {p5.Vector} tracePoint a copy of the current position
     */
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
    /**
     * updates the system attribute
     * @method module:Botany.Turtle#sysUpdate
     * @param  {module:Botany.TSystem} sys the new system
     */
    bMod.Turtle.prototype.sysUpdate = function(sys) {
        this.system = sys;
    };
    /**
     * copies the system vocabulary object
     * @method module:Botany.Turtle#copyVocab
     * @param  {module:Botany.TSystem} system the new system
     */
    bMod.Turtle.prototype.copyVocab = function(system) {
        this.vocabulary = system.vocabulary;
    };
    /**
     * assigns the heading attribute from the hVector
     * @method module:Botany.Turtle#getHeading
     */
    bMod.Turtle.prototype.getHeading = function() {
        this.heading = this.hVector.heading();
    };

    /**
     * resets the magnitude of the stepForward
     * @method module:Botany.Turtle#resetMag
     */
    bMod.Turtle.prototype.resetMag = function() {
        this.hVector.setMag(this.system.step);
    };

    /**
     * copies each of the points to the tracePoints array
     * @method module:Botany.Turtle#setTracePoints
     */
    bMod.Turtle.prototype.setTracePoints = function() {
        this.tracePoints = [];
        this.points.forEach(function(pt) {
            this.addTP(pt);
        }, this);
    };

    /**
     * adds a tracePoint to the tracepoint Array
     * @method module:Botany.Turtle#addTP
     * @param  {p5.Vector} the new tracepoint
     */
    bMod.Turtle.prototype.addTP = function(pt) {
        this.tracePoints.push(pt.copy());
    };

    /**
     * scales the step attribute and resets the magnitude
     * @method module:Botany.Turtle#scaleStep
     */
    bMod.Turtle.prototype.scaleStep = function() {
        this.system.scaleStep();
        this.resetMag();
    };

    /**
     * changes the position by adding the position and hVector vectors, draws a line between points
     * @method module:Botany.Turtle#forward
     * @param  {Boolean} draw a flag determinig whether or not to draw a line between the points
     */
    bMod.Turtle.prototype.forward = function(draw = true) {
        var oldPos = this.position;
        this.position = p5.Vector.add(this.position, this.hVector);
        var newPos = this.position.copy();
        if (draw == true) {
            line(oldPos.x, oldPos.y, this.position.x, this.position.y);
        }
        this.points.push(this.position);
    };

    /**
     * performs a linear interpolation between two points
     * @method module:Botany.Turtle#getLerp
     * @param  {p5.vector} p1 the first point
     * @param  {p5.vector} p2 the second point
     * @returns {p5.Vector} the interpolated vector
     */
    bMod.Turtle.prototype.getLerp = function(p1, p2) {
        return p5.Vector.lerp(p1, p2, 0.05);
    };

    /**
     * changes the position by adding the position and hVector vectors, does not draw line
     * @method module:Botany.Turtle#blankForward
     */
    bMod.Turtle.prototype.blankForward = function() {
        this.forward(false);
    };

    /**
     * rotates the heading clockwise by delta
     * @method module:Botany.Turtle#clockwise
     */
    bMod.Turtle.prototype.clockwise = function() {
        this.hVector.rotate(this.system.delta);
        this.getHeading();
    };

    /**
     * rotates the heading counter-clockwise by delta
     * @method module:Botany.Turtle#counterClockwise
     */
    bMod.Turtle.prototype.counterClockwise = function() {
        this.hVector.rotate(-1 * (this.system.delta));
        this.getHeading();
    };

    /**
     * resets the points to an empty Array
     * @method module:Botany.Turtle#resetPoints
     */
    bMod.Turtle.prototype.resetPoints = function() {
        this.points = [];
    };

    /**
     * runs the command for every term in string
     * @method module:Botany.Turtle#interpret
     */
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

    /**
     * @returns {Function} the command associated with the term
     * @method module:Botany.Turtle#getCommand
     * @param  {String} term the vocabulary term
     */
    bMod.Turtle.prototype.getCommand = function(term) {
        return this.system.vocabulary[term].command;
    };

    /**
     * replaces every term in the string with its successor
     * @method module:Botany.Turtle#spawn
     * @param  {number} [depth = 1] the number of times to run
     */
    bMod.Turtle.prototype.spawn = function(depth = 1) {
        for (var i = depth - 1; i >= 0; i--) {
            this.interpret();
            this.system.spawn();
        }
        this.string = this.system.string;
        this.resetMag();
    };

    /**
     * copies the system vocabulary object
     * @method module:Botany.Turtle#intersect
     * @param  {module:Botany.TSystem} system the new system
     */
    bMod.Turtle.prototype.intersect = function(p1, p2) {
        return p5.Vector.sub(p1, p2).array() == [0, 0, 0];
    };

    /**
     * copies the system vocabulary object
     * @method module:Botany.Turtle#display
     * @param  {module:Botany.TSystem} system the new system
     */
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