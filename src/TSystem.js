function TSystem(step = 200, delta = Math.PI / 2) {
    this.step = step;
    this.delta = delta;
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