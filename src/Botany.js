var Botany = (function() {
    return {


        check: function() {
            console.log(this);
            return 'module return';
        },
        objConst: function objConst(a, b) {
            this.a = a;
            this.b = b;
        }

    }
})();

Botany.objConst.prototype.addAB = function() {
    return this.a + this.b;
};