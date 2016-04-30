describe('DOL', () => {
    var myDOL = new DOL({
        a: 'ab',
        b: 'a'
    }, 'a');

    describe('init', () => {
        it('has a vocabulary object', function() {
            expect(myDOL.vocabulary).toBeObject();
        });
        it('has an axiom string', function() {
            expect(myDOL.axiom).toBeString();
        });
        it('has an string attribute', function() {
            expect(myDOL.string).toBeString();
        });
    });
    describe('#spawn', () => {
        it('replaces each comma separated vocab term with its successor ', function() {
            myDOL.spawn();
            expect(myDOL.string.length).toBeGreaterThan(1);
        });
    });
    describe('splitFilter', () => {
        it('returns an array of non-empty strings to be interpreted', function() {
            expect(myDOL.splitFilter()).toBeArray();
        });
    });
    describe('addVocab', function() {
        it('modifies the vocabulary with new predecessor-successor productions', function() {
            myDOL.addVocab('ar', 'albr')
            expect(Object.keys(myDOL.vocabulary)).toContain('ar');
        });
    });
    describe('anabela catenula', () => {
        var anabela;
        beforeEach(function() {
            anaHash = {
                ar: 'albr',
                al: 'blar',
                br: 'ar',
                bl: 'al'
            };
            anabela = new DOL(anaHash, 'ar');
        });
        it('has four vocabulary terms', function() {
            expect(Object.keys(anabela.vocabulary).length).toBe(4);
        });
        it('has "ar" as its axiom', function() {
            expect(anabela.axiom).toBe('ar');
        });
    });
});