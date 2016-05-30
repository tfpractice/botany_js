/**
 *
 * The global Botany namespace
 * @module Botany
 * @return {Object} Botany module
 */
var Botany = (function() {
    return {
        /**
         * @return {String} module return
         */
        check: function() {
            console.log(this);
            return 'module return';
        },
        objConst: function objConst(a, b) {
            this.a = a;
            this.b = b;
        },
    };
})();
/**
 * @function
 * @method addAB
 */
Botany.objConst.prototype.addAB = function() {
    return this.a + this.b;
};