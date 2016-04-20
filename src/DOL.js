function DOL(vocab = {
    a: 'a'
}, axiom = 'a') {
    this.vocabulary = vocab;
    this.axiom = axiom;
    this.string = axiom;
}

DOL.prototype.addVocab = function(pred, succ) {
    this.vocabulary[pred] = succ;
};

DOL.prototype.spawn = function() {
    var splitString = this.string.split(',');
    console.log(splitString);
    var newString = new String('');
    splitString.forEach(function(el) {
        if (this.vocabulary[el] != false) {
            newString += this.vocabulary[el];
            newString += ',';
            // newString.concat(this.vocabulary[el]);
            // newString.concat(',');
            console.log(newString);
            console.log(this.vocabulary[el]);
        } else {
            newString += el;
            newString += ',';
        }

    }, this);
    this.string = newString;
};