
// load HTML objects
var calcType = document.getElementById("calcType");
var CurrentLvl = document.getElementById("CurrentLvl");
var TargetLvl = document.getElementById("TargetLvl");
var consumeBonus = document.getElementById("consumeBonus");
var consumeNoBonus = document.getElementById("consumeNoBonus");
var calcButton = document.getElementById("calcButton");
var resultRow = document.getElementById("resultRow");
var backButton = document.getElementById("backButton");

// 4-star Ember exp amount
var fourStarEmberNoBonus = Number(27000);
var fourStarEmberBonus = fourStarEmberNoBonus * 1.2;

// variables used to compute results
var reqExp;
var reqNoBonus;
var reqBonus;
var accExp;
var attainedExp;
var attainedLvl = [-1, -1, -1];
var foundLvl = false;

// toggle calculator type
calcType.addEventListener("change", function() {

    if(this.value === "1") {

        $('#TargetLvl').prop('readonly', false);
        $('#consumeBonus').prop('readonly', true);
        $('#consumeNoBonus').prop('readonly', true);

        resultRow.innerHTML = "필요 4성 종화(보너스): <br><br> 필요 4성 종화(보너스 없음): ";
        
    } else {

        $('#TargetLvl').prop('readonly', true);
        $('#consumeBonus').prop('readonly', false);
        $('#consumeNoBonus').prop('readonly', false);

        resultRow.innerHTML = "도달 레벨 (성공): <br><br> 도달 레벨 (대성공): <br><br> 도달 레벨 (극대성공): ";

    }

})

calcButton.addEventListener("click", function() {

    $('#calcButton').prop('disabled', true);
    calcButton.innerHTML = "결과값 불러오는 중...";

    expTableFileString = "servantExpTable.csv";
    githubURLString = "https://raw.githubusercontent.com/gitnod/fgocalc/gh-pages/data/exp/";

    if(calcType.value == "1") {
    
        Papa.parse(githubURLString + expTableFileString, {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: function(results) {
              expTable = results.data;
              currentExp = expTable[Number(CurrentLvl.value)-1]["Cumul"];
              targetExp = expTable[Number(TargetLvl.value)-1]["Cumul"];
              reqExp = Number(targetExp) - Number(currentExp);
              reqNoBonus = Math.floor(reqExp / fourStarEmberNoBonus) + 1;
              reqBonus = Math.floor(reqExp / fourStarEmberBonus) + 1;

              resultRow.innerHTML = "필요 4성 종화(보너스): " + reqBonus + "<br><br> 필요 4성 종화(보너스 없음): " + reqNoBonus;
            }
        });

    } else {

        Papa.parse(githubURLString + expTableFileString, {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: function(results) {
              expTable = results.data;
              currentExp = expTable[Number(CurrentLvl.value)-1]["Cumul"];
              accExp = Number(consumeBonus.value) * fourStarEmberBonus + Number(consumeNoBonus.value) * fourStarEmberNoBonus;

              for (k=1; k<=3; k++) {
                  attainedExp = currentExp + accExp * k;
                  for(lvlIndex=0; lvlIndex<=99; lvlIndex++) {
                      if((expTable[lvlIndex]["Cumul"] > attainedExp) && foundLvl == false) {
                          attainedLvl[k-1] = lvlIndex;
                          foundLvl = true;
                      }
                  }
                  if(foundLvl === false) {
                      attainedLvl[k-1] = 100;
                  }
                  foundLvl = false
              }

              resultRow.innerHTML = "도달 레벨 (성공): " + attainedLvl[0] + "<br><br> 도달 레벨 (대성공): " + attainedLvl[1] + "<br><br> 도달 레벨 (극대성공): " + attainedLvl[2];
            }
        });

    }

    $('#calcButton').prop('disabled', false);
    calcButton.innerHTML = "계산하기";

})





// back to index.html
backButton.addEventListener("click", function() {
    window.location = '../';
})