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
        it('has an hVector', function() {
            expect(myTurtle.hVector).toBeObject();
        });
    });
    describe('getHeading()', () => {
        it('retrives the heading from the hVector', function() {
            expect(myTurtle.heading).toBeNumber();
        });
    });
    describe('resetMag()', () => {
        it('chnages the magnitude of the hVector', function() {
            myTurtle.step = 20;
            myTurtle.resetMag();
            expect(myTurtle.hVector.mag()).toBe(20);
        });
    });
    describe('scaleStep()', () => {
        it('multiplies step by stepFactor and resets mag', function() {
            myTurtle.scaleStep();
            expect(myTurtle.step).toBe(100);
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
        it('changes the step by stepFactor', function() {
            myTurtle.spawn();
            expect(myTurtle.step).toBe(100);
        });
        describe('when given depth param', () => {
            it('reduces the step by stepFactor^depth', function() {
                myTurtle.spawn(2);
                expect(myTurtle.step).toBe(25);
            });
        });
    });
    describe('display()', () => {
        it('draws lines between each of the points', function() {
            myTurtle.spawn(3);
            // myTurtle.interpret();
            myTurtle.display();
        });
    });
});