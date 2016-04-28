describe('TSystem', function() {
    var mySystem;
    beforeEach(function() {
        mySystem = new TSystem(400, Math.PI / 2);
    });
    describe('init', function() {
        it('has a step', function() {
            expect(mySystem.step).toBeNumber();
        });
        it('has a delta', function() {
            expect(mySystem.delta).toBeNumber();
        });
        it('has a vocabulary', function() {
            expect(mySystem.vocabulary).toBeObject();
        });
        it('has a string', function() {
            expect(mySystem.string).toBeString();
        });
        it('has an axiom', function() {
            expect(mySystem.axiom).toBeString();
        });
    });
    describe('addVocab', function() {
        it('adds a vocabulary term with null commandKey and successor', function() {
            mySystem.addVocab('L');
            expect(mySystem.vocabulary['L']).toBeObject();
        });
    });
    describe('addSuccessor', function() {
        describe('when Key doesnt exist', () => {
            it('creates an entry in the dictionary', function() {
                mySystem.addSuccessor('R', 'L,+,R,+,L');
                expect(mySystem.vocabulary['R']).toBeObject();
            });
        });
        it('adds a keys successor string to the vocabulary', function() {
            mySystem.addSuccessor('R', 'L,+,R,+,L');
            expect(mySystem.vocabulary['R'].successor).toBeString();

        });
    });
});