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
    describe('objConst', () => {
        var myObj;
        beforeEach(function() {
            myObj = new myMod.objConst(1, 2);
        });
        it('creates a new object with property a', function() {
            expect(new myMod.objConst(1, 2)).toBeObject();
        });
        it('has an a property', function() {
            expect(myObj.a).toBeNumber();
        });
        describe('addAB', () => {
            it('returns the sum of properties a and b', function() {
                expect(myObj.addAB()).toEqual(3);
            });
        });
    });
});