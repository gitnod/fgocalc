
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

// compute the multinomial (non-inclusive) cdf.
// the vector x does not include the last entry which is size - sum(x).
// the vector prob does not include the last entry which is 1 - sum(prob).
// the x_table is the pre-computed table of possible x values.
function pmultinom_noninclusive(x, x_table, size, prob) {

    // define iterator
    var k = 0;

    // accumulate all lower tail densities using x_table
    var sumDensities = 0;
    for(k=0; k < x_table.length; k++) {
        if(x.every(function(value, index) { return x_table[k][index] < value })) {
            sumDensities += dmultinom(x_table[k], size, prob);
        }
    }

    // return survival function value
    return sumDensities;
}

// compute the multinomial (inclusive) survival function.
// the vector x does not include the last entry which is size - sum(x).
// the vector prob does not include the last entry which is 1 - sum(prob).
// the x_table is the pre-computed table of possible x values.
// the multinomial inclusive survival function is computed using complement and the inclusion-exclusion formula
//      P(x >= x^0) = P(x_1 >= x_1^0, ..., x_d >= x_d^0) = 
//          1 - P(x_1 < x_1^0 *union* ... *union* x_d < x_d^0) =
//          1 - [ P(x_1 < x_1^0) + ... + P(x_d < x_d^0) - 
//          ( P(x_1 < x_1^0, x_2 < x_2^0) + ... + P(x_{d-1} < x_{d-1}^0, x_d < x_d^0) ) + ... ]
// we first define the function that compute the terms in [] and then take 1 - [].
function smultinom_inclusive_neg(x, x_table_array, size, prob) {

    // define iterator
    var k = 0;
    var subsetString = '';
    var subsetCardinality = 0;
    var subsetX = [];
    var subsetProb = [];

    // initialize sum of densities
    var sumDensities = 0;

    // if x is one-dimensional, return 1 - pmultinom
    if(x.length == 1) {
        return pmultinom_noninclusive(x, x_table_array[1], size, prob);
    } else {

        // accumulate all lower tail events that include the first dimension
        for(k=0; k<Math.pow(2, x.length-1); k++) {
            subsetString = k.toString(2);
            subsetString = "1" + "0".repeat(x.length-1-subsetString.length) + subsetString;
            subsetCardinality = subsetString.split('').map(Number).reduce((a,b) => a+b, 0);
            subsetX = x.filter(function(arr, ind) {return subsetString[ind] == "1"});
            subsetProb = prob.filter(function(arr, ind) {return subsetString[ind] == "1"});
            sumDensities += Math.pow(-1, subsetCardinality-1) * pmultinom_noninclusive(subsetX, x_table_array[subsetCardinality], size, subsetProb);
        }

        // recursion for the rest of the dimensions
        x.shift();
        prob.shift();
        return sumDensities + smultinom_inclusive_neg(x, x_table_array, size, prob);

    }

}

function smultinom_inclusive(x, x_table_array, size, prob) {
    return 1 - smultinom_inclusive_neg(x, x_table_array, size, prob);
}