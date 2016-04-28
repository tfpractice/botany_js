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
    });
});