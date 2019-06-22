
var pickup_5star = 1;
var pickup_4star = 1;
var pickupProb_5star = [0.007, 0.004, 0.00333];
var pickupProb_4star = [0.015, 0.012, 0.0075, 0.007, 0.005];
var pickupProb_equip = [0.028];
var pickupSimpleProb = pickupProb_5star[0];
var pickupLevelText = ["단독", "2중", "3중", "4중", "5중"];

var multinomVarDimMax = 6;
var multinomCombinationsDictionary = {};

// update 5 star pickup status
function updatePickup_5star(n) {

    // initialize iterator
    var j=0

    // highlight buttons
    for(var j=0; j<pickupProb_5star.length; j++) {
        if(j == n-1) {
            $('#pickup_5star_' + (j+1)).attr("class","btn btn-primary btn-block");
        } else {
            $('#pickup_5star_' + (j+1)).attr("class","btn btn-outline-primary btn-block");
        }
    }
    // toggle visibility of input and reset inputs of higher levels
    for(var j=0; j<pickupProb_5star.length; j++) {
        if(j <= n-1) {
            $('#pickup_5star_' + (j+1) + "_input_container").attr("hidden", false);
        } else {
            $('#pickup_5star_' + (j+1) + "_input_container").attr("hidden", true);
            $('#pickup_5star_' + (j+1) + "_input").val(0);
        }
    }

    // update 5 star pickup variable
    pickup_5star = n;

    // update success display
    updateSuccessDisplay();

}

// update 4 star pickup status
function updatePickup_4star(n) {

    // initialize iterator
    var j=0

    // highlight buttons
    for(var j=0; j<pickupProb_4star.length; j++) {
        if(j == n-1) {
            $('#pickup_4star_' + (j+1)).attr("class","btn btn-primary btn-block");
        } else {
            $('#pickup_4star_' + (j+1)).attr("class","btn btn-outline-primary btn-block");
        }
    }
    // toggle visibility of input
    for(var j=0; j<pickupProb_4star.length; j++) {
        if(j <= n-1) {
            $('#pickup_4star_' + (j+1) + "_input_container").attr("hidden", false);
        } else {
            $('#pickup_4star_' + (j+1) + "_input_container").attr("hidden", true);
            $('#pickup_4star_' + (j+1) + "_input").val(0);
        }
    }

    // update 4 star pickup variable
    pickup_4star = n;

    // update success display
    updateSuccessDisplay();

}

// toggle 5 star pickup status
function togglePickup_5star() {

    if(pickup_5star == pickupProb_5star.length) {
        updatePickup_5star(1);
    } else {
        updatePickup_5star(pickup_5star+1);
    }

}

// toggle 4 star pickup status
function togglePickup_4star() {

    if(pickup_4star == pickupProb_4star.length) {
        updatePickup_4star(1);
    } else {
        updatePickup_4star(pickup_4star+1);
    }

}

// update simple pickup
function updateSimplePickup(group, level) {
    
    // if group = 5, set 5 star servant pickup
    if(group == 5) {
        pickupSimpleProb = pickupProb_5star[level-1];
        setPickupSimple.innerHTML = '5성 서번트 ' + pickupLevelText[level-1] + ' 픽업 (' + Math.floor(pickupSimpleProb * 100 * 1000) / 1000 + '%)';
    }

    // if group = 4, set 4 star servant pickup
    if(group == 4) {
        pickupSimpleProb = pickupProb_4star[level-1];
        setPickupSimple.innerHTML = '4성 서번트 ' + pickupLevelText[level-1] + ' 픽업 (' + Math.floor(pickupSimpleProb * 100 * 1000) / 1000 + '%)';
    }

    // if group = 0, set 5 star equipment pickup
    if(group == 0) {
        pickupSimpleProb = pickupProb_equip[level-1];
        setPickupSimple.innerHTML = '5성 개념예장 ' + pickupLevelText[level-1] + ' 픽업 (' + Math.floor(pickupSimpleProb * 100 * 1000) / 1000 + '%)';
    }

    // close simple pickup dialog
    $('#pickupDialog').modal('hide');

}

// update success display
function updateSuccessDisplay() {

    // initialize iterator
    var j=0;

    // initialize texts
    var successText = [];
    var pickup_5star_text = '';
    var pickup_4star_text = '';

    // initialize pickup indicator
    var pickup_5star_positive = 0;
    var pickup_4star_positive = 0;

    // create pickup text for 5 star
    pickup_5star_text += '5성(';
    for(j=0; j<pickup_5star; j++) {
        if($('#pickup_5star_' + (j+1) + "_input").val() > 0) {
            pickup_5star_positive = 1;
        }
        pickup_5star_text += $('#pickup_5star_' + (j+1) + "_input").val();
        if(j != pickup_5star-1) {
            pickup_5star_text += ','
        }
    }
    pickup_5star_text += ')';

    // create pickup text for 4 star
    pickup_4star_text += '4성(';
    for(j=0; j<pickup_4star; j++) {
        if($('#pickup_4star_' + (j+1) + "_input").val() > 0) {
            pickup_4star_positive = 1;
        }
        pickup_4star_text += $('#pickup_4star_' + (j+1) + "_input").val();
        if(j != pickup_4star-1) {
            pickup_4star_text += ','
        }
    }
    pickup_4star_text += ')';

    // add text if success number is positive
    if(pickup_5star_positive == 1) {
        successText.push(pickup_5star_text);
    }
    if(pickup_4star_positive == 1) {
        successText.push(pickup_4star_text);
    }

    // update button text
    setSuccess.innerHTML = successText.join(', ');

}

// update expenditure display
function updateExpenditureDisplay() {

    var expenditureText = '성정석(' + expenditureSQ.value + '), 호부(' + expenditureTicket.value + ') - 총 가챠 ' + Math.floor(Number(expenditureSQ.value)/3 + Number(expenditureTicket.value)) + '회';
    setExpenditure.innerHTML = expenditureText;
    setExpenditureSimple.innerHTML = expenditureText;

}

// compute success probability under simple calculation
function computeAndUpdateSuccessProbabilitySimple() {

    // read number of trials
    var trials = Math.floor(Number(expenditureSQ.value)/3 + Number(expenditureTicket.value));

    // compute and update success probability. Check range before computation.
    var success = Number(setSuccessSimple.value);
    if(success < 0 || success > 5) {
        drawProb.innerHTML = '오류: 보구레벨은 0과 5 사이여야 합니다.';
    } else {
        var successProb = smultinom_inclusive([Number(setSuccessSimple.value)], multinomCombinationsDictionary, trials, [pickupSimpleProb]);
        drawProb.innerHTML = '성공확률: ' + Math.floor(successProb * 100 * 10000) / 10000 + '%';
    }
}

// compute success probability under advanced calculation
function computeAndUpdateSuccessProbabilityAdvanced() {

    // initialize iterator and auxiliary variable
    var j=0;
    var level=0;

    // read number of trials
    var trials = Math.floor(Number(expenditureSQ.value)/3 + Number(expenditureTicket.value));

    // initialize success vector and probability vector
    var success = [];
    var prob = [];

    // fill success vector
    for(j=0; j<pickup_5star; j++) {
        level = Number($('#pickup_5star_' + Number(j+1) + '_input').val());
        if(level > 0) {
            success.push(level);
            prob.push(pickupProb_5star[pickup_5star-1]);
        }
    }
    for(j=0; j<pickup_4star; j++) {
        level = Number($('#pickup_4star_' + Number(j+1) + '_input').val());
        if(level > 0) {
            success.push(level);
            prob.push(pickupProb_4star[pickup_4star-1]);
        }
    }

    // return error if array length or success vector is out of varDim range, otherwise compute probability
    if(multinomVarDimMax < prob.length) {
        drawProb.innerHTML = '오류: 동시에 노리는 서번트는 최대 ' + multinomVarDimMax + '종 까지 계산 가능합니다.';
    } else if(Math.min.apply(null, success) < 0 || Math.max.apply(null, success) > 5) {
        drawProb.innerHTML = '오류: 보구레벨은 0과 5 사이여야 합니다.';
    } else {
        // compute and update success probability
        var successProb = smultinom_inclusive(success, multinomCombinationsDictionary, trials, prob);
        drawProb.innerHTML = '성공확률: ' + Math.floor(successProb * 100 * 10000) / 10000 + '%';
    }

}

// compute success probability depending on calculation mode
function computeAndUpdateSuccessProbability() {

    if(calcRowSimple.hidden == false) {
        // if simple calculation mode
        computeAndUpdateSuccessProbabilitySimple();
    } else {
        // if advanced calculation mode
        computeAndUpdateSuccessProbabilityAdvanced();
    }

}

// load multinomial combinations after page load
window.onload = function() {

    // locate character position table file
    var githubURLString = "https://raw.githubusercontent.com/gitnod/fgocalc/gh-pages/lib/multinom/";
    var githubFileString = "";

    // read character position table
    for(var j=1; j<=multinomVarDimMax; j++) {

        githubFileString = "multinomVectors_dim" + j + ".csv";

        Papa.parse(githubURLString + githubFileString, {
            download: true,
            header:false, // set header to false to avoid dictionary variable type
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: function(results) {
                var combinationsArray = results.data;
                combinationsArray.shift(); // remove header
                multinomCombinationsDictionary[combinationsArray[0].length] = combinationsArray;
            }
        });

    }

}

// activate simple calcucation mode
calcTypeSimple.addEventListener("click", function() {

    // update calcType button aesthetics
    calcTypeSimple.className = "btn btn-success btn-block";
    calcTypeAdvanced.className = "btn btn-outline-success btn-block";

    // update calculation button row
    calcRowSimple.hidden = false;
    calcRowAdvanced.hidden = true;

    // update description
    desc.innerHTML = "준비된 성정석과 호부를 소모하여 특정 픽업 카드를 지정된 수만큼 뽑는데 성공할 확률을 계산합니다.";

})

// activate advanced calcucation mode
calcTypeAdvanced.addEventListener("click", function() {

    // update calcType button aesthetics
    calcTypeSimple.className = "btn btn-outline-success btn-block";
    calcTypeAdvanced.className = "btn btn-success btn-block";

    // update calculation button row
    calcRowSimple.hidden = true;
    calcRowAdvanced.hidden = false;

    // update description
    desc.innerHTML = "준비된 성정석과 호부를 소모하여 여러 종류의 픽업 카드를 각각 지정된 수만큼 뽑는데 성공할 확률을 계산합니다.";

})

calcButton.addEventListener("click", function() {

    computeAndUpdateSuccessProbability();

})


$("#successDialog").on("hidden.bs.modal", function(e) {

    updateSuccessDisplay();

})

$("#expenditureDialog").on("hidden.bs.modal", function(e) {

    updateExpenditureDisplay();

})

// back to index.html
backButton.addEventListener("click", function() {
    window.location = '../';
})