Botany = (function(
    /**
     * Turtle LSystem functions for Botany module.
     */
    bMod) {
    /**
     * Creates a LSystem for LOGO-style Turtle
     * @constructor module:Botany.TSystem
     * @augments {module:Botany.DOL}
     * @param  {Number} step value of {@link Botany.TSystem#step}
     * @param  {Number} delta value of {@link Botany.TSystem#delta}
     * @param  {Number} stepFactor value of {@link Botany.TSystem#stepFactor}
     * @param  {String} axiom value of {@link Botany.TSystem#axiom}
     * @property {Number} step the distance for each step forward
     * @property {Number} delta the angular distance for each turn
     * @property {Number} sFactor the amount module:Botany.TSystem#step will change after spawning
     * @property {String} axiom initial string
     * @property {Object} vocabulary
     */
    bMod.TSystem = function(step = 200, delta = Math.PI / 2, sFactor = 0.25, ax = 'F,-,F,-,F,-,F,-') {
        this.step = step;
        this.delta = delta;
        this.stepFactor = sFactor;
        this.vocabulary = {
            '+': {
                command: '+',
                successor: '+'
            },
            '-': {
                command: '-',
                successor: '-'
            }
        };
        this.axiom = ax;
        bMod.DOL.call(this, this.vocabulary, this.axiom);
    }

    bMod.TSystem.prototype = Object.create(bMod.DOL.prototype);
    /**
     * sets the delta attribute
     * @param {Number} dVal new delta value
     * @method module:Botany.TSystem#setDelta
     */
    bMod.TSystem.prototype.setDelta = function(dVal) {
        this.delta = dVal;
    };
    /**
     * sets the step attribute
     * @param {Number} [sVal=1] new step value
     * @method module:Botany.TSystem#setDelta
     */
    bMod.TSystem.prototype.setStep = function(sVal = 1) {
        this.step = sVal;
    };
    /**
     * adds vocabulary term, successor, and command
     * @param {String} key the new term
     * @param {String} [comm = 'F'] the command called by the term
     * @param {String} [succ = 'F'] the new successor
     * @method module:Botany.TSystem#addVocab
     */
    bMod.TSystem.prototype.addVocab = function(key, comm = 'F', succ = 'F') {
        this.vocabulary[key] = {
            command: comm,
            successor: succ
        };
    };
    /**
     * sets the axiom attribute
     * @param {String} ax new axiom
     * @method module:Botany.TSystem#setAxiom
     */
    bMod.TSystem.prototype.setAxiom = function(ax) {
        this.string = this.axiom = ax;
        this.createMissingVocab();
    };

    /**
     * scales the step attribute by stepFactor
     * @method module:Botany.TSystem#scaleStep
     */
    bMod.TSystem.prototype.scaleStep = function() {
        this.step *= this.stepFactor;
    };

    /**
     * checks if vocab term has a key/command
     * @method module:Botany.TSystem#semantic
     * @returns {Boolean}
     */
    bMod.TSystem.prototype.semantic = function(term) {
        var result;
        switch (term) {
            case '+':
            case '-':
            case '':
                result = false;
                break;
            default:
                result = true;
        }
        return result;
    };

    /**
     * filters all the terms in the string property by sematicity
     * @method module:Botany.TSystem#semFilter
     * @returns {Array} semantic terms in the string
     */
    bMod.TSystem.prototype.semFilter = function() {
        return this.splitFilter().filter(function(term) {
            return this.semantic(term) == true;
        }, this);
    };

    /**
     * counts the number of segments produced by the Turtle
     * @method module:Botany.TSystem#segmentCount
     * @param {String} term the term being evaluated
     * @return {Number} number of segments
     */
    bMod.TSystem.prototype.segmentCount = function(term) {
        return this.semFilter().length;
    };
    /**
     * retunrs the current string terms missing from vocabulary
     * @method module:Botany.TSystem#getMissingVocab
     * @returns {Array} terms undocumented in the vocabulary
     */
    bMod.TSystem.prototype.getMissingVocab = function() {
        return this.splitFilter().filter(function(el) {
            return this.vocabulary[el] != true;
        }, this);
    };

    /**
     * creates new vocabulary entries for missing terms
     * @method module:Botany.TSystem#createMissingVocab
     */
    bMod.TSystem.prototype.createMissingVocab = function() {
        this.getMissingVocab().forEach(function(el) {
            this.addVocab(el);
        }, this);
    };

    /**
     * 	finds vocab terms with no successor attribute
     * @method module:Botany.TSystem#unsuceededVocab
     * @return {Array} vocab terms with no successor attribute
     */
    bMod.TSystem.prototype.unsuceededVocab = function() {
        return Object.keys(this.vocabulary).filter(function(el) {
            return this.vocabulary[el].successor == false;
        }, this);
    };

    /**
     * 	finds vocab terms with no command attribute
     * @method module:Botany.TSystem#uncommmandedVocab
     * @returns {Array} vocab terms with no command attribute
     */
    bMod.TSystem.prototype.uncommmandedVocab = function() {
        return Object.keys(this.vocabulary).filter(function(el) {
            return this.vocabulary[el].command != true;
        }, this);
    };

    /**
     * checks if all terms have successors
     * @method module:Botany.TSystem#fullySucceeded
     * @returns {Boolean}
     */
    bMod.TSystem.prototype.fullySucceeded = function() {
        return Object.keys(this.vocabulary).every(function(el) {
            return this.vocabulary[el].successor == true;
        }, this);
    };

    /**
     * checks if all terms have successors
     * @method module:Botany.TSystem#fullyCommanded
     * @returns {Boolean}
     */
    bMod.TSystem.prototype.fullyCommanded = function() {
        return Object.keys(this.vocabulary).every(function(el) {
            return this.vocabulary[el].command == true;
        }, this);
    };

    /**
     * adds a vocabulary entry for a key and its successor
     * @method module:Botany.TSystem#addSuccessor
     * @see [DOL.addVocab]{@link module:Botany.DOL#addVocab}
     */
    bMod.TSystem.prototype.addSuccessor = function(key, succ) {
        if (this.vocabulary[key] != true) {
            this.addVocab(key);
        }
        this.vocabulary[key].successor = succ;
    };

    /**
     * adds a vocabulary entry for a key and its command
     * @method module:Botany.TSystem#addCommand
     */
    bMod.TSystem.prototype.addCommand = function(key, comm) {
        if (this.vocabulary[key] != true) {}
        this.addVocab(key);
        this.vocabulary[key].command = comm;
    };

    /**
     * alters string according to the vocabulary succesors, scales step by stepFactor
     * @method module:Botany.TSystem#spawn
     */
    bMod.TSystem.prototype.spawn = function() {
        var newString = new String();
        this.splitFilter().forEach(function(el) {
            if (this.vocabulary[el].successor != false) {
                newString += this.vocabulary[el].successor;
                newString += ',';
            } else {
                newString += el;
                newString += ',';
            }
        }, this);
        this.string = newString;
        this.scaleStep();
    };



    return bMod;
})(Botany);