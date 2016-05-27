Botany = (function(bMod) {
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

    bMod.TSystem.prototype.setDelta = function(dVal) {
        this.delta = dVal;
    };

    bMod.TSystem.prototype.setStep = function(sVal = 1) {
        this.step = sVal;
    };

    bMod.TSystem.prototype.addVocab = function(key, comm = 'F', succ = 'F') {
        this.vocabulary[key] = {
            command: comm,
            successor: succ
        };
    };

    bMod.TSystem.prototype.setAxiom = function(ax) {
        this.string = this.axiom = ax;
        this.createMissingVocab();
    };

    bMod.TSystem.prototype.scaleStep = function() {
        this.step *= this.stepFactor;
    };

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

    bMod.TSystem.prototype.semFilter = function() {
        return this.splitFilter().filter(function(term) {
            return this.semantic(term) == true;
        }, this);
    };

    bMod.TSystem.prototype.segmentCount = function(term) {
        return this.semFilter().length;
    };
    bMod.TSystem.prototype.getMissingVocab = function() {
        return this.splitFilter().filter(function(el) {
            return this.vocabulary[el] != true;
        }, this);
    };

    bMod.TSystem.prototype.createMissingVocab = function() {
        this.getMissingVocab().forEach(function(el) {
            this.addVocab(el);
        }, this);
    };

    bMod.TSystem.prototype.unsuceededVocab = function() {
        return Object.keys(this.vocabulary).filter(function(el) {
            return this.vocabulary[el].successor == false;
        }, this);
    };

    bMod.TSystem.prototype.uncommmandedVocab = function() {
        return Object.keys(this.vocabulary).filter(function(el) {
            return this.vocabulary[el].command != true;
        }, this);
    };

    bMod.TSystem.prototype.fullySucceeded = function() {
        return Object.keys(this.vocabulary).every(function(el) {
            return this.vocabulary[el].successor == true;
        }, this);
    };

    bMod.TSystem.prototype.fullyCommanded = function() {
        return Object.keys(this.vocabulary).every(function(el) {
            return this.vocabulary[el].command == true;
        }, this);
    };

    bMod.TSystem.prototype.addSuccessor = function(key, succ) {
        if (this.vocabulary[key] != true) {
            this.addVocab(key);
        }
        this.vocabulary[key].successor = succ;
    };

    bMod.TSystem.prototype.addCommand = function(key, comm) {
        if (this.vocabulary[key] != true) {}
        this.addVocab(key);
        this.vocabulary[key].command = comm;
    };

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