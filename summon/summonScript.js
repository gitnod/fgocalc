
// load HTML objects
var SQ = document.getElementById("SQ");
var Tickets = document.getElementById("Tickets");
var Trials = document.getElementById("Trials")
var Type = document.getElementById("Type");
var Success = document.getElementById("Success");
var drawProb = document.getElementById("drawProb");
var calcButton = document.getElementById("calcButton");
var backButton = document.getElementById("backButton");

var probTable;
var failures;

// change number of trials automatically when nSQ changes
SQ.addEventListener("blur", function() {

    var nTrials = Math.floor(Number(SQ.value)/3 + Number(Tickets.value));
    Trials.value = nTrials;
})

// change number of trials automatically when nTickets changes
Tickets.addEventListener("blur", function() {

    var nTrials = Math.floor(Number(SQ.value)/3 + Number(Tickets.value));
    Trials.value = nTrials;
})

// compute probability when the button is clicked
calcButton.addEventListener("click", function() {

    $('#calcButton').prop('disabled', true);
    calcButton.innerHTML = "결과값 불러오는 중...";

    probTableFileString = "prob" + Type.value + "Success" + Success.value + ".csv";
    githubURLString = "https://raw.githubusercontent.com/gitnod/fgocalc/gh-pages/data/summon/";

    Papa.parse(githubURLString + probTableFileString, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function(results) {
          probTable = results.data;
          failures = Number(Trials.value)-Number(Success.value);

          if(failures < 0) {
              drawProb.innerHTML = "오류: 가챠횟수가 목표 보구레벨보다 적습니다.";
          } else if(Trials.value > 3000) {
              drawProb.innerHTML = "오류: 가챠횟수는 최대 3000회까지 계산 가능합니다.";
          } else {
            drawProb.innerHTML = "성공확률: " + probTable[failures]["probs"] + "%";
          }
        }
    });

    $('#calcButton').prop('disabled', false);
    calcButton.innerHTML = "계산하기";
})

// back to index.html
backButton.addEventListener("click", function() {
    window.location = '../';
})