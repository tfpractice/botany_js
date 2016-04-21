describe('Turtle', () => {
    var myTurtle;
    beforeEach(function() {
        myTurtle = new Turtle(10, 15, 0);
    });
    describe('init', () => {
        it('is an instance of DOL', function() {
            expect(myTurtle instanceof DOL).toBeTrue();
        });
        it('has a position object', function() {
            expect(myTurtle.position).toBeObject();
        });
        it('has a heading', function() {
            expect(myTurtle.heading).toBeNumber();
        });
        it('has a step attribute', function() {
            expect(myTurtle.step).toBeNumber();
        });
        it('has a delta attr', function() {
            expect(myTurtle.delta).toBeNumber();
        });
        it('has a commands object', function() {
            expect(myTurtle.commands).toBeObject();
        });
        it('has a points array', function() {
            expect(myTurtle.points).toBeArray();
        });
        it('has a stepFactor', function() {
            expect(myTurtle.stepFactor).toBe(0.25);
        });

    });
    describe('#forward', () => {
        it('changes the position of the turtle by sin and cos of delta', function() {
            myTurtle.forward();
            expect(myTurtle.position.x).not.toBe(10);
        });
        it('adds a point to the points array', function() {
            myTurtle.forward();

            expect(myTurtle.points.length).toBe(2);
        });
    });
    describe('blankForward', () => {
        it('changes the position of the turtle by sin and cos of delta', function() {
            myTurtle.blankForward();
            expect(myTurtle.position.x).not.toBe(10);
        });
    });
    describe('#clockwise', () => {
        it(' changes the heading by delta', function() {
            myTurtle.clockwise();
            expect(myTurtle.heading).toBe((Math.PI / 2));
        });
    });
    describe('#counterClockwise', () => {
        it(' changes the heading by delta', function() {
            myTurtle.counterClockwise();
            expect(myTurtle.heading).toBe((Math.PI / -2));
        });
    });
    describe('interpret', () => {
        it('follows each of the commmands provided by the string', function() {
            myTurtle.interpret();
            expect(myTurtle.points.length).toBe(5);
        });
    });
    describe('spawn', () => {
        it('changes the step bu=y stepFactor', function() {
            myTurtle.spawn();
            expect(myTurtle.step).toBe(10);
        });
    });
});