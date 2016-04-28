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
}