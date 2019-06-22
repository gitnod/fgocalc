
var NPDamageMin = document.getElementById("NPDamageMin");
var NPDamageMed = document.getElementById("NPDamageMed");
var NPDamageMax = document.getElementById("NPDamageMax");

var calcButton = document.getElementById("calcButton");
var backButton = document.getElementById("backButton");

var ATK = document.getElementById("ATK");
var servantClass = "servantClassSaber"; // key for classMultArray

var servantInfo = {
    "servantClass":"servantClassSaber",
    "npCardType":"npCardTypeBuster",
    "npCategory":"npCategorySingleTarget",
    "npLevel":"npLevel1",
    "npQuest":"npQuestNo"
}

var buffInfo = {
    buffATK:1,
    buffCard:1,
    buffNP:1,
    buffSP:1,
    againstClass:1,
    againstHidden:1
}

var servantClassDictionary = {
    "servantClassSaber":1,
    "servantClassArcher":0.95,
    "servantClassLancer":1.05,
    "servantClassRider":1,
    "servantClassCaster":0.9,
    "servantClassAssassin":0.9,
    "servantClassBerserker":1.1,
    "servantClassRuler":1.1,
    "servantClassAvenger":1.1,
    "servantClassMooncancer":1,
    "servantClassAlterego":1,
    "servantClassForeigner":1
}

var npCardTypeDictionary = {
    "npCardTypeBuster":"Buster",
    "npCardTypeArts":"Arts",
    "npCardTypeQuick":"Quick"
}

var npCategoryDictionary = {
    "npCategorySingleTarget":0,
    "npCategoryAOE":1
}

var npLevelDictionary = {
    "npLevel1":0,
    "npLevel2":0.5,
    "npLevel3":0.75,
    "npLevel4":0.875,
    "npLevel5":1,
}

var npQuestDictionary = {
    "npQuestNo":0,
    "npQuestYes":1,
}

var npCardTypeMultiplierArray = {
    "Buster":1.5,
    "Arts":1,
    "Quick":0.8
}

var npMultiplierRangeArray = {
    "Buster":[
        [
            [6, 10], // 버스터 대인
            [8, 12]  // 버스터 대인 보구퀘
        ],
        [
            [3, 5], // 버스터 대군
            [4, 6]  // 버스터 대군 보구퀘
        ]
    ],
    "Arts":[
        [
            [9, 15], // 아츠 대인,
            [12, 18] // 아츠 대인 보구퀘
        ],
        [
            [4.5, 7.5], // 아츠 대군
            [6, 9] // 아츠 대군 보구퀘
        ]
    ],
    "Quick":[
        [
            [12, 20], // 퀵 대인
            [16, 24] // 퀵 대인 보구퀘
        ],
        [
            [6, 10], // 퀵 대군
            [8, 12] // 퀵 대군 보구퀘
        ]
    ]
}

var againstClassDictionary = {
    "againstClass100":1,
    "againstClass150":1.5,
    "againstClass200":2,
    "againstClass050":0.5,
}

var againstHiddenDictionary = {
    "againstHidden100":1,
    "againstHidden110":1.1,
    "againstHidden090":0.9
}








var cardMultArray = [
    1.5, 1.5,
    1, 1,
    0.8, 0.8
];

var NPMultiplierArray = [
    [
        [6, 10], // 버스터 대인
        [8, 12], // 버스터 대인 보구퀘
    ],
    [
        [3, 5], // 버스터 대군
        [4, 6] // 버스터 대군 보구퀘
    ],
    [
        [9, 15], // 아츠 대인
        [12, 18] // 아츠 대인 보구퀘
    ],
    [
        [4.5, 7.5], // 아츠 대군
        [6, 9] // 아츠 대군 보구퀘
    ],
    [
        [12, 20], // 퀵 대인
        [16, 24] // 퀵 대인 보구퀘
    ],
    [
        [6, 10], // 퀵 대군
        [8, 12] // 퀵 대군 보구퀘
    ]
];

var NPLevelMultiplier = [
    0, 0.5, 0.75, 0.875, 1
];

// update class choice
function updateServantClass(id) {

    // highlight chosen button and unhighlight others
    for(var key in servantClassDictionary) {
        if(key == id) {
            $('#' + key).attr("class", "btn btn-dark btn-block");
        } else {
            $('#' + key).attr("class", "btn btn-outline-dark btn-block");
        }
    }

    // update servant class
    servantInfo["servantClass"] = id;

}

// update np card type choice
function updateNpCardType(id) {

    // highlight chosen button and unhighlight others
    if(id == "npCardTypeBuster") {
        $('#npCardTypeBuster').attr("class", "btn btn-danger btn-block");
        $('#npCardTypeArts').attr("class", "btn btn-outline-primary btn-block");
        $('#npCardTypeQuick').attr("class", "btn btn-outline-success btn-block");
    }
    if(id == "npCardTypeArts") {
        $('#npCardTypeBuster').attr("class", "btn btn-outline-danger btn-block");
        $('#npCardTypeArts').attr("class", "btn btn-primary btn-block");
        $('#npCardTypeQuick').attr("class", "btn btn-outline-success btn-block");
    }
    if(id == "npCardTypeQuick") {
        $('#npCardTypeBuster').attr("class", "btn btn-outline-danger btn-block");
        $('#npCardTypeArts').attr("class", "btn btn-outline-primary btn-block");
        $('#npCardTypeQuick').attr("class", "btn btn-success btn-block");
    }

    // update np card type
    servantInfo["npCardType"] = id;

    // update np multiplier
    updateNpMultiplier();

}

// update np category
function updateNpCategory(id) {

    // highlight chosen button and unhighlight others
    for(var key in npCategoryDictionary) {
        if(key == id) {
            $('#' + key).attr("class", "btn btn-primary btn-block");
        } else {
            $('#' + key).attr("class", "btn btn-outline-primary btn-block");
        }
    }

    // update servant class
    servantInfo["npCategory"] = id;

    // update np multiplier
    updateNpMultiplier();
}

// update np level
function updateNpLevel(id) {

    // highlight chosen button and unhighlight others
    for(var key in npLevelDictionary) {
        if(key == id) {
            $('#' + key).attr("class", "btn btn-primary btn-block");
        } else {
            $('#' + key).attr("class", "btn btn-outline-primary btn-block");
        }
    }

    // update servant class
    servantInfo["npLevel"] = id;

    // update np multiplier
    updateNpMultiplier();
}

// update np quest
function updateNpQuest(id) {

    // highlight chosen button and unhighlight others
    for(var key in npQuestDictionary) {
        if(key == id) {
            $('#' + key).attr("class", "btn btn-primary btn-block");
        } else {
            $('#' + key).attr("class", "btn btn-outline-primary btn-block");
        }
    }

    // update servant class
    servantInfo["npQuest"] = id;

    // update np multiplier
    updateNpMultiplier();
}

// update NP multiplier
function updateNpMultiplier() {

    // compute multiplier
    var multArray = npMultiplierRangeArray[npCardTypeDictionary[servantInfo["npCardType"]]][npCategoryDictionary[servantInfo["npCategory"]]][npQuestDictionary[servantInfo["npQuest"]]];
    var mult = multArray[0] + (multArray[1] - multArray[0]) * npLevelDictionary[servantInfo["npLevel"]];

    // update multiplier input
    npMultiplier.value = mult * 100;

}

// update servant and np button info
function updateServantDesc() {

    setServantDesc.innerHTML = $('#'+servantInfo["servantClass"]).html() + ', ' + $('#'+servantInfo["npCardType"]).html() + ' ' + $('#'+servantInfo["npCategory"]).html();
    setNpLvlDesc.innerHTML = '레벨 ' + $('#'+servantInfo["npLevel"]).html() + ', 퀘스트 ' + $('#'+servantInfo["npQuest"]).html() + ', 배율 ' + npMultiplier.value + '%';

}

// toggle manual input of the NP multiplier
checkManualNpMultiplier.addEventListener("change", function() {

    if (this.checked === true) {
        $('#npMultiplier').prop('readonly', false);
    } else {
        $('#npMultiplier').prop('readonly', true);
    }
})

// update buff status
function updateBuff() {

    buffInfo["buffATK"] =  1 + (Number(buffATKUp.value) + Number(buffATKDown.value))/100;
    buffInfo["buffCard"] = 1 + (Number(buffCardUp.value) + Number(buffCardDown.value))/100;
    buffInfo["buffNP"] = 1 + (Number(buffNPUp.value) + Number(buffSPSkillUp.value) - Number(buffSPSkillDown.value))/100;

    var buffSPmult = Number(buffSP.value) * 0.01;
    if(buffSPmult == 0) {
        buffInfo["buffSP"] = 1;
    } else {
        buffInfo["buffSP"] = buffSPmult;
    }

    setBuffATK.innerHTML = "공격력 상승 " + buffATKUp.value + "%, , 적 방어력 하락 " + buffATKDown.value + "%";
    setBuffCard.innerHTML = "성능 상승 " + buffCardUp.value + "%, 적 내성 하락 " + buffCardDown.value + "%";
    setBuffNP.innerHTML = "위력상승 " + buffNPUp.value + "%, 특공(스킬) " + buffSPSkillUp.value + "%, 적 특방 " + buffSPSkillDown.value + "%";

}

// update against-class multiplier
function updateAgainstClass(id) {

    // highlight chosen button and unhighlight others
    for(var key in againstClassDictionary) {
        if(key == id) {
            $('#' + key).attr("class", "btn btn-dark btn-block");
        } else {
            $('#' + key).attr("class", "btn btn-outline-dark btn-block");
        }
    }

    // update servant class
    buffInfo["againstClass"] = againstClassDictionary[id];

    // update button text
    setAgainstClass.innerHTML = $('#' + id).html() + ' (' + Math.round(againstClassDictionary[id] * 100 * 100) / 100 + '%)';

}

// update against-hidden-attribute multiplier
function updateAgainstHidden(id) {

    // highlight chosen button and unhighlight others
    for(var key in againstHiddenDictionary) {
        if(key == id) {
            $('#' + key).attr("class", "btn btn-dark btn-block");
        } else {
            $('#' + key).attr("class", "btn btn-outline-dark btn-block");
        }
    }

    // update servant class
    buffInfo["againstHidden"] = againstHiddenDictionary[id];

    // update button text
    setAgainstHidden.innerHTML = $('#' + id).html() + ' (' + Math.round(againstHiddenDictionary[id] * 100 * 100) / 100 + '%)';

}

// compute NP damage when the button is clicked
calcButton.addEventListener("click", function() {

    // base damage and np damage multiplier
    var baseDamage = Number(ATK.value) * 0.23 * servantClassDictionary[servantInfo["servantClass"]];
    var npDamageMultiplier = npCardTypeMultiplierArray[npCardTypeDictionary[servantInfo["npCardType"]]] * Number(npMultiplier.value) / 100;

    // compute grand buff multiplier
    var buffMultiplier = 1;
    for(var key in buffInfo) {
        buffMultiplier = buffMultiplier * buffInfo[key];
    }

    // compute damage
    var npDamage = baseDamage * npDamageMultiplier * buffMultiplier;

    // update text
    NPDamageMin.innerHTML = "보구딜 최소: " + (npDamage * 0.9).toFixed(0);
    NPDamageMed.innerHTML = "보구딜 기본: " + npDamage.toFixed(0);
    NPDamageMax.innerHTML = "보구딜 최대: " + (npDamage * 1.1).toFixed(0);
})

$("#servantDescDialog").on("hidden.bs.modal", function(e) {

    updateServantDesc();

})

$("#buffDialog").on("hidden.bs.modal", function(e) {

    updateBuff();

})

// back to index.html
backButton.addEventListener("click", function() {
    window.location = '../';
})