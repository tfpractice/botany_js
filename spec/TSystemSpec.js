describe('TSystem', function() {
    var mySystem;
    beforeEach(function() {
        mySystem = new Botany.TSystem(400, Math.PI / 2);
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
        it('has a stepFactor', function() {
            expect(mySystem.stepFactor).toBeNumber();
        });
    });
    describe('setDelta', function() {
        it('assigns the delta value', function() {
            mySystem.setDelta(Math.PI / 4);
            expect(mySystem.delta).toBe(Math.PI / 4);
        });
    });
    describe('setStep', function() {
        it('assigns the step value', function() {
            mySystem.setStep(20);
            expect(mySystem.step).toBe(20);
        });
    });
    describe('addVocab()', function() {
        it('adds a vocabulary term with null commandKey and successor', function() {
            mySystem.addVocab('L', 'F', 'L,+,R,+,L');
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
            expect(mySystem.vocabulary['R'].successor).toEqual('L,+,R,+,L');
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
            expect(mySystem.axiom.length).not.toBe(0);
        });
    });
    describe('semantic()', () => {
        it('returns false if given term is "+", "-", or empty ', function() {
            expect(mySystem.semantic("-")).toBeFalse();
        });
        it('returns true if given term is not "+", "-", or empty ', function() {
            expect(mySystem.semantic("F")).toBeTrue();
        });
    });
    describe('semFilter', () => {
        it('returns an array of all semantic terms in string', function() {
            expect(mySystem.semFilter()).toBeArray();
        });
    });
    describe('segmentCount()', () => {
        it('returns the length of the given terms successor string', function() {
            expect(mySystem.segmentCount('F')).toBeNumber();
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
            mySystem.setAxiom('F,-,F-,F,-,F,-');
            mySystem.createMissingVocab();
            expect(mySystem.vocabulary['F']).not.toBeUndefined();
        });
    });
    describe('unsuceededVocab()', () => {
        it('returns an array of vocabularyterms with no successor', function() {
            expect(mySystem.unsuceededVocab()).toBeArray();
        });
    });
    describe('fullyCommanded()', () => {
        it('verifies if every vocabulary item has a command value', function() {
            expect(mySystem.fullyCommanded()).toBeFalse();
        });
    });
    describe('fullySucceeded()', () => {
        it('verifies if every vocabulary item has a successor value', function() {
            expect(mySystem.fullySucceeded()).toBeFalse();
        });
    });
    describe('uncommmandedVocab()', () => {
        it('returns an array of vocabulary terms with no command', function() {
            expect(mySystem.uncommmandedVocab()).toBeArray();
        });
    });
});