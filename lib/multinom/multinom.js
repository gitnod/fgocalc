
// pre-compute the factorials up to 5!
var factorial = [1, 1, 2, 6, 24, 120];

// compute the multinomial density.
// the vector x does not include the last entry which is size - sum(x).
// the vector prob does not include the last entry which is 1 - sum(prob).
function dmultinom(x, size, prob) {

    // define iterator
    var k = 0;

    // compute multinomial coefficient
    var numerator = 1;
    for(k = 0; k < x.reduce((a,b) => a+b, 0); k++) {
        numerator = numerator * (size-k);
    }
    var denominator = 1;
    for(k = 0; k < x.length; k++) {
        denominator = denominator * factorial[x[k]];
    }

    // compute the probabilities
    var drawProb = 1;
    for(k = 0; k < x.length; k++) {
        drawProb = drawProb * Math.pow(prob[k], x[k]);
    }
    drawProb = drawProb * Math.pow(1 - prob.reduce((a,b) => a+b, 0), size - x.reduce((a,b) => a+b, 0));

    // return multinomial density
    return drawProb * numerator / denominator;
}

// compute the multinomial survival function.
// the vector x does not include the last entry which is size - sum(x).
// the vector prob does not include the last entry which is 1 - sum(prob).
// the x_table is the pre-computed table of possible x values.
function smultinom(x, x_table, size, prob) {

    // define iterator
    var k = 0;

    // compute gross number of successes
    var nSuccess = x.reduce((a,b) => a+b, 0);

    // accumulate all lower tail densities using x_table
    var sumDensities = 0;
    for(k=0; k < x_table.length; k++) {
        if(x.every(function(value, index) { return x_table[k][index] <= value }) &&  x_table[k].reduce((a,b) => a+b, 0) != nSuccess) {
            sumDensities += dmultinom(x_table[k], size, prob);
        }
    }

    // return survival function value
    return 1 - sumDensities;
}