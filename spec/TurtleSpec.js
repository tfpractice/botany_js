describe('Turtle', () => {
    var myTurtle = new Turtle(10, 15, 0);
    describe('init', () => {
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
});