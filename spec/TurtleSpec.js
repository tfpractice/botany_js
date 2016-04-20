describe('Turtle', () => {
    var myTurtle = new Turtle(10, 15, 0);
    describe('init', () => {
        it('has a position object', function() {
            expect(myTurtle.position).toBeObject();
        });
        it('has a heading', function() {
            expect(myTurtle.heading).toBeNumber();
        });
    });
});