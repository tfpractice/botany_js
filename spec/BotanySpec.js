describe('Botany', () => {
    var myMod;
    beforeEach(function() {
        myMod = Botany;
    });

    describe('#check', () => {
        it('returns "module return"', function() {
            expect(myMod.check()).toEqual('module return');
        });
    });
});