Botany = (function(
    /**
     * Lindemeyer System functions for Botany module.
     */
    bMod) {
    /**
     * Creates a Directed Ordered Lindemeyer System
     * @augments {module.Botany}
     * @constructor module:Botany.DOL
     * @param {Object} [vocab = {a:'a'}] DOL.vocabulary
     * @param {String} [axiom = 'a'] DOL.axiom
     * @property {Object} vocabulary a key-value store of terms and successors
     * @property {String} axiom the initial string for the L-System
     * @property {String} string the current string
     */
    bMod.DOL = function DOL(vocab = {
        a: 'a'
    }, axiom = 'a') {
        this.vocabulary = vocab;
        this.axiom = axiom;
        this.string = axiom;
    };

    /**
     * adds a vocabulary term to the LSystem
     * @method module:Botany.DOL#addVocab
     * @param {String} pred - the new term
     * @param {String} succ - the successor
     */
    bMod.DOL.prototype.addVocab = function(pred, succ) {
        this.vocabulary[pred] = succ;
    };
    /**
     * retrieves all of the semantic characters from DOL.string
     * @method module:Botany.DOL#splitFilter
     * @instance
     * @return {Array} an array of semantic characters
     */
    bMod.DOL.prototype.splitFilter = function() {
        return this.string.split(',').filter(function(el) {
            return el.length > 0;
        }, this);
    };

    /**
     * alters #string according to the vocabulary succesors
     * @method module:Botany.DOL#spawn
     */
    bMod.DOL.prototype.spawn = function() {
        var newString = new String();
        this.splitFilter().forEach(function(el) {
            if (this.vocabulary[el] != false) {
                newString += this.vocabulary[el];
                newString += ',';
            } else {
                newString += el;
                newString += ',';
            }
        }, this);
        this.string = newString;
    };
    return bMod;
})(Botany);