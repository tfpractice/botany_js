function TSystem(step = 200, delta = Math.PI / 2, sFactor = 0.25) {
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
    this.axiom = new String();
    DOL.call(this, this.vocabulary, this.axiom);
}

TSystem.prototype = Object.create(DOL.prototype);

TSystem.prototype.addVocab = function(key) {
    this.vocabulary[key] = {
        command: null,
        successor: null
    };
};

TSystem.prototype.setAxiom = function(ax) {
    this.axiom = ax;
    this.createMissingVocab();
    DOL.call(this, this.vocabulary, this.axiom);
};

TSystem.prototype.getMissingVocab = function() {
    return this.splitFilter().filter(function(el) {
        return this.vocabulary[el] != true;
    }, this);
};

TSystem.prototype.unsuceededVocab = function() {
    return Object.keys(this.vocabulary).filter(function(el) {
        return this.vocabulary[el].successor == false;
    }, this);
};

TSystem.prototype.uncommmandedVocab = function() {
    return Object.keys(this.vocabulary).filter(function(el) {
        return this.vocabulary[el].command != true;
    }, this);
};

TSystem.prototype.fullySucceeded = function() {
    return Object.keys(this.vocabulary).every(function(el) {
        return this.vocabulary[el].successor == true;
    }, this);
};

TSystem.prototype.fullyCommanded = function() {
    return Object.keys(this.vocabulary).every(function(el) {
        return this.vocabulary[el].command == true;
    }, this);
};

TSystem.prototype.createMissingVocab = function() {
    this.getMissingVocab().forEach(function(el) {
        this.addVocab(el);
    }, this);
};

TSystem.prototype.addSuccessor = function(key, succ) {
    if (this.vocabulary[key] != true) {
        this.addVocab(key);
    }
    this.vocabulary[key].successor = succ;
};

TSystem.prototype.addCommand = function(key, comm) {
    if (this.vocabulary[key] != true) {
        this.addVocab(key);
    }
    this.vocabulary[key].command = comm;
};

TSystem.prototype.spawn = function() {
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
};