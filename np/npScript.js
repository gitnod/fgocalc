var ATK = document.getElementById("ATK");
var ServantClass = document.getElementById("ServantClass");
var NPType = document.getElementById("NPType");
var NPQuest = document.getElementById("NPQuest");
var NPLvl = document.getElementById("NPLvl");
var checkManualNPMultiplier = document.getElementById("checkManualNPMultiplier");
var NPMultiplier = document.getElementById("NPMultiplier");
var buffATK = document.getElementById("buffATK");
var debuffATK = document.getElementById("debuffATK");
var buffCard = document.getElementById("buffCard");
var debuffCard = document.getElementById("debuffCard");
var buffNPPlus = document.getElementById("buffNPPlus");
var buffSPSkill = document.getElementById("buffSPSkill");
var buffNPMinus = document.getElementById("buffNPMinus");
var buffSP = document.getElementById("buffSP");
var againstClass = document.getElementById("againstClass");
var againstHidden = document.getElementById("againstHidden");

var NPDamageMin = document.getElementById("NPDamageMin");
var NPDamageMed = document.getElementById("NPDamageMed");
var NPDamageMax = document.getElementById("NPDamageMax");

var calcButton = document.getElementById("calcButton");
var backButton = document.getElementById("backButton");

var classMultArray = {
    "Saber":1,
    "Archer":0.95,
    "Lancer":1.05,
    "Rider":1,
    "Caster":0.9,
    "Assassin":0.9,
    "Berserker":1.1,
    "Extra110":1.1,
    "Extra100":1
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

// change NP multiplier automatically when value changes
NPType.addEventListener("change", function() {

    var multArray = NPMultiplierArray[Number(NPType.value)][Number(NPQuest.value)];
    var mult = multArray[0] + (multArray[1] - multArray[0]) * NPLevelMultiplier[Number(NPLvl.value) -1];

    NPMultiplier.value = mult * 100;
})

// change NP multiplier automatically when value changes
NPQuest.addEventListener("change", function() {

    var multArray = NPMultiplierArray[Number(NPType.value)][Number(NPQuest.value)];
    var mult = multArray[0] + (multArray[1] - multArray[0]) * NPLevelMultiplier[Number(NPLvl.value) -1];

    NPMultiplier.value = mult * 100;
})

// change NP multiplier automatically when value changes
NPLvl.addEventListener("change", function() {

    var multArray = NPMultiplierArray[Number(NPType.value)][Number(NPQuest.value)];
    var mult = multArray[0] + (multArray[1] - multArray[0]) * NPLevelMultiplier[Number(NPLvl.value) -1];

    NPMultiplier.value = mult * 100;
})

// toggle manual input of the NP multiplier
checkManualNPMultiplier.addEventListener("change", function() {

    if (this.checked === true) {
        $('#NPMultiplier').prop('readonly', false);
    } else {
        $('#NPMultiplier').prop('readonly', true);
    }
})

// compute NP damage when the button is clicked
calcButton.addEventListener("click", function() {

    // base damage and card multiplier
    baseDmg = Number(ATK.value) * 0.23 * classMultArray[ServantClass.value];
    cardMult = cardMultArray[Number(NPType.value)] * Number(NPMultiplier.value) / 100;
    
    // buff and debuff modifiers
    buffATKMult = 1 + (Number(buffATK.value) + Number(debuffATK.value))/100;
    buffCardMult = 1 + (Number(buffCard.value) + Number(debuffCard.value))/100;
    buffNPMult = 1 + (Number(buffNPPlus.value) + Number(buffSPSkill.value) - Number(buffNPMinus.value))/100;
    
    // NP special attack modifiers. Read 0 as 100.
    buffSPMult = Number(buffSP.value) * 0.01;
    if(buffSPMult == 0) {
        buffSPMult = 1;
    }
    
    // product of all modifiers
    buffMult = buffATKMult * buffCardMult * buffNPMult * buffSPMult;

    // enemy class and hidden attributes modifiers
    againstMult = Number(againstClass.value) * Number(againstHidden.value);

    // compute damage
    damage = baseDmg * cardMult * buffMult * againstMult;

    NPDamageMin.innerHTML = "보구딜 최소: " + (damage * 0.9).toFixed(0);
    NPDamageMed.innerHTML = "보구딜 기본: " + damage.toFixed(0);
    NPDamageMax.innerHTML = "보구딜 최대: " + (damage * 1.1).toFixed(0);
})








// back to index.html
backButton.addEventListener("click", function() {
    window.location = '../';
})