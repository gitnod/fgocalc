
var summonCalcButton = document.getElementById("summonCalcButton");
var expCalcButton = document.getElementById("expCalcButton");
var NPCalcButton = document.getElementById("NPCalcButton");

// go to summon calculator
summonCalcButton.addEventListener("click", function() {
    window.location = './summon/';
})

// go to exp calculator
expCalcButton.addEventListener("click", function() {
    window.location = './exp/';
})

// go to exp calculator
NPCalcButton.addEventListener("click", function() {
    window.location = './np/';
})