describe('Turtle', () => {
    var myTurtle, mySystem;
    beforeEach(function() {
        mySystem = new TSystem(400, Math.PI / 2, 0.25, 'F,-,F,-,F,-,F,-');
        mySystem.addVocab('F', 'F', 'F,-,F,+,F,+,F,F,-,F,-,F,+,F');
        myTurtle = new Turtle(10, 15, 0, mySystem);
    });
    describe('init', () => {

        it('has a position object', function() {
            expect(myTurtle.position).toBeObject();
        });
        it('has a heading', function() {
            expect(myTurtle.heading).toBeNumber();
        });

        it('has a commands object', function() {
            expect(myTurtle.commands).toBeObject();
        });
        it('has a points array', function() {
            expect(myTurtle.points).toBeArray();
        });

        it('has an hVector', function() {
            expect(myTurtle.hVector).toBeObject();
        });
    });
    describe('sysUpdate', () => {
        it('sets the system to the param', function() {
            myTurtle.sysUpdate(mySystem);
            expect(myTurtle.system).toBe(mySystem);
        });
    });
    describe('copyVocab', () => {
        it('sets the vocabulary to that of the provided system', function() {
            myTurtle.copyVocab(mySystem);
            expect(myTurtle.vocabulary).toEqual(mySystem.vocabulary);
        });
    });
    describe('getHeading()', () => {
        it('retrives the heading from the hVector', function() {
            expect(myTurtle.heading).toBeNumber();
        });
    });
    describe('resetMag()', () => {
        it('chnages the magnitude of the hVector', function() {
            myTurtle.system.step = 20;
            myTurtle.resetMag();
            expect(myTurtle.hVector.mag()).toBe(20);
        });
    });
    describe('scaleStep()', () => {
        it('multiplies step by stepFactor and resets mag', function() {
            myTurtle.scaleStep();
            expect(myTurtle.system.step).toBe(100);
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
    describe('getCommand()', () => {
        it('returns the command key for the vocabulary term', function() {
            // expect(myTurtle.getCommand('F')).toBe();
            expect(myTurtle.getCommand('F')).toBeString();
        });
    });
    describe('interpret', () => {
        it('follows each of the commmands provided by the string', function() {
            myTurtle.interpret();
            //console.log(myTurtle.points);
            expect(myTurtle.points.length).toBe(5);
        });
    });
    describe('spawn', () => {
        it('changes the step by stepFactor', function() {
            var newFact = mySystem.step * Math.pow(mySystem.stepFactor, 1);

            myTurtle.spawn();
            //console.log(myTurtle.points);
            expect(myTurtle.system.step).toBe(newFact);
        });
        describe('when given depth param', () => {
            it('reduces the step by stepFactor^depth', function() {
                var newFact = mySystem.step * Math.pow(mySystem.stepFactor, 2);
                console.log(newFact);
                myTurtle.spawn(2);
                expect(myTurtle.system.step).toBe(newFact);
            });
        });
    });
    describe('display()', () => {
        it('draws lines between each of the points', function() {
            myTurtle.spawn(2);
            myTurtle.display();
        });
    });
});