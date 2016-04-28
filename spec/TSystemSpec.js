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
    describe('addVocab()', function() {
        it('adds a vocabulary term with null commandKey and successor', function() {
            mySystem.addVocab('L');
            expect(mySystem.vocabulary['L']).toBeObject();
        });
    });
    describe('addSuccessor()', function() {
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
    describe('addCommand()', function() {
        it('adds a keys command string to the vocabulary', function() {
            mySystem.addCommand('R', 'F');
            expect(mySystem.vocabulary['R'].command).toBeString();
        });
    });
    describe('setAxiom', () => {
        it('sets the axiom string', function() {
            mySystem.setAxiom('F,-,F-,F,-F,-');
            console.log(mySystem.axiom);

            expect(mySystem.axiom.length).not.toBe(0);
        });
    });
    describe('getMissingVocab()', () => {
        it('returns an array of unaccounted elements', function() {
            expect(mySystem.getMissingVocab()).toBeArray();
        });
    });
    describe('createMissingVocab()', () => {
        describe('when vocab element is missing', () => {
            it('lacks the element as a key in dictionary', function() {
                expect(mySystem.vocabulary['F']).toBeUndefined();
            });
        });
        it('adds missing elements to the dictionary', function() {
            mySystem.setAxiom('F,-,F-,F,-F,-');
            mySystem.createMissingVocab();
            expect(mySystem.vocabulary['F']).not.toBeUndefined();

        });
    });
    // describe('spawn()', () => {
    // it('replaces each comma separated vocab term with its successor ', function() {
    // mySystem.spawn();
    // console.log(mySystem.string);
    // expect(mySystem.string.length).toBeGreaterThan(1);
    // });
    // });
});