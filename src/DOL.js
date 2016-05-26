Botany = (function(bMod) {
    bMod.DOL = function DOL(vocab = {
        a: 'a'
    }, axiom = 'a') {
        this.vocabulary = vocab;
        this.axiom = axiom;
        this.string = axiom;
    };

    bMod.DOL.prototype.addVocab = function(pred, succ) {
        this.vocabulary[pred] = succ;
    };
    bMod.DOL.prototype.splitFilter = function() {
        return this.string.split(',').filter(function(el) {
            return el.length > 0;
        }, this);
    };
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
// functionbMod.DOL(vocab = {
//     a: 'a'
// }, axiom = 'a') {
//     this.vocabulary = vocab;
//     this.axiom = axiom;
//     this.string = axiom;
// }

//bMod.DOL.prototype.addVocab = function(pred, succ) {
//     this.vocabulary[pred] = succ;
// };
//bMod.DOL.prototype.splitFilter = function() {
//     return this.string.split(',').filter(function(el) {
//         return el.length > 0;
//     }, this);
// };
//bMod.DOL.prototype.spawn = function() {
//     var newString = new String();
//     this.splitFilter().forEach(function(el) {
//         if (this.vocabulary[el] != false) {
//             newString += this.vocabulary[el];
//             newString += ',';
//         } else {
//             newString += el;
//             newString += ',';
//         }

//     }, this);
//     this.string = newString;
// };