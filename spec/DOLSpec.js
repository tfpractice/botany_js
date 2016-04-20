describe('DOL', () => {
    var myDOL = new DOL({
        a: 'b',
        b: 'ab'
    }, 'a');

    describe('init', () => {
        it('has a vocabulary object', function() {
            expect(myDOL.vocabulary).toBeObject();
        });
        it('has an axiom string', function() {
            expect(myDOL.axiom).toBeString();
        });
    });
});