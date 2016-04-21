describe('Turtle', () => {
    var myTurtle = new Turtle(10, 15, 0);
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

    });
    describe('#forward', () => {
        it('changes the position of the turtle by sin and cos of delta', function() {
            myTurtle.forward();
            expect(myTurtle.position.y).not.toBe(15);
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
            expect(myTurtle.heading).toBe(0);
        });
    });
});