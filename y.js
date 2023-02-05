var dices = [0, 0, 0, 0, 0];
function save(item) {
    item.disabled = 1;
    item.dataset.saved = 1;
    resetRoll();
    calculateTotals();
}
function restart() {
    document.querySelectorAll('[data-point="1"]').forEach(function (item) {

        item.dataset.saved = "0";
        item.disabled = false;
    });
    document.getElementById("extra").value = 0;
    document.getElementById("lblbonus").innerText = 0;
    document.getElementById("lbltotalu").innerText = 0;
    document.getElementById("lbltotall").innerText = 0;
    document.getElementById("lblpoints").innerText = 0;
    resetRoll();

}
function calculateTotals() {
    var topSubTotal = 0;
    var bottomTotal = 0;
    document.querySelectorAll('[data-top="1"]').forEach(function (top) {
        topSubTotal += parseInt(top.innerText);
    });

    if (topSubTotal >= 63) {
        document.getElementById('lblbonus').innerText = "35";
        topSubTotal += 35;
    }
    document.getElementById('lbltotalu').innerText = topSubTotal;

    document.querySelectorAll('[data-top="0"]').forEach(function (bottom) {
        bottomTotal += parseInt(bottom.innerText);
    });
    bottomTotal += parseInt(document.getElementById("extra").value);
    document.getElementById("lbltotall").innerText = bottomTotal;
    document.getElementById("lblpoints").innerText = bottomTotal + topSubTotal;
}
function resetRoll() {
    document.getElementById("turns").innerText = 3;
    document.getElementById("dice1").innerText = 0;
    document.getElementById("dice2").innerText = 0;
    document.getElementById("dice3").innerText = 0;
    document.getElementById("dice4").innerText = 0;
    document.getElementById("dice5").innerText = 0;
    document.querySelectorAll('[data-keep]').forEach(function (dice) {
        dice.dataset.keep = 0;
    });
    cleanButton();
    document.getElementById("roll").disabled = false;
}
function keepdice(item) {
    var kept = item.dataset.keep;
    if (kept == "0") {
        kept = "1";
    } else {
        kept = "0";
    }
    item.dataset.keep = kept;
}
function roll() {

    var turns = document.getElementById("turns").innerText;

    if (turns > 0) {
        turns -= 1;
        document.getElementById("turns").innerText = turns;


        var i = 0;
        document.querySelectorAll("[data-keep]").forEach(function (item) {
            var kept = item.dataset.keep;
            if (kept == "0") {
                dices[i] = getRndInteger(1, 6);
                document.getElementById(item.id).innerText = dices[i];
            }
            i++;
        });


        rollcalculate(dices)


    }
    if (turns == 0) {
        document.getElementById("roll").disabled = true;
    }




}
function cleanButton() {

    document.querySelectorAll('[data-point="1"]').forEach(function (item) {

        if (item.dataset.saved == "0") {

            item.innerText = 0;
        }
    });

}
function rollcalculate(dices) {
    cleanButton();
    var numberOf1 = dices.filter(x => x === 1).length;
    var numberOf2 = dices.filter(x => x === 2).length;
    var numberOf3 = dices.filter(x => x === 3).length;
    var numberOf4 = dices.filter(x => x === 4).length;
    var numberOf5 = dices.filter(x => x === 5).length;
    var numberOf6 = dices.filter(x => x === 6).length;

    var total1 = numberOf1 * 1;
    var total2 = numberOf2 * 2;
    var total3 = numberOf3 * 3;
    var total4 = numberOf4 * 4;
    var total5 = numberOf5 * 5;
    var total6 = numberOf6 * 6;

    if (document.getElementById("btn1").dataset.saved == 0) {

        document.getElementById("btn1").innerText = total1;
    }
    if (document.getElementById("btn2").dataset.saved == 0) {
        document.getElementById("btn2").innerText = total2;
    }
    if (document.getElementById("btn3").dataset.saved == 0) {
        document.getElementById("btn3").innerText = total3;
    }
    if (document.getElementById("btn4").dataset.saved == 0) {
        document.getElementById("btn4").innerText = total4;
    }
    if (document.getElementById("btn5").dataset.saved == 0) {
        document.getElementById("btn5").innerText = total5;
    }
    if (document.getElementById("btn6").dataset.saved == 0) {
        document.getElementById("btn6").innerText = total6;
    }
    //three of a kind
    if (numberOf1 >= 3 || numberOf2 >= 3 || numberOf3 >= 3 || numberOf4 >= 3 || numberOf5 >= 3 || numberOf6 >= 3) {
        if (document.getElementById("btn3kind").dataset.saved == 0) {

            document.getElementById("btn3kind").innerText = dices.reduce((partialSum, a) => partialSum + a, 0);
        }
    }
    //four of a kind
    if (numberOf1 >= 4 || numberOf2 >= 4 || numberOf3 >= 4 || numberOf4 >= 4 || numberOf5 >= 3 || numberOf6 >= 4) {
        if (document.getElementById("btn4kind").dataset.saved == 0) {

            document.getElementById("btn4kind").innerText = dices.reduce((partialSum, a) => partialSum + a, 0);
        }
    }
    //yahtzee
    if (numberOf1 >= 5 || numberOf2 >= 5 || numberOf3 >= 5 || numberOf4 >= 5 || numberOf5 >= 5 || numberOf6 >= 5) {
        if (document.getElementById("btny").dataset.saved == 0) {


            document.getElementById("btny").innerText = 50;
        } else {
            document.getElementById("extra").value += 50;
        }
    }
    //fullhouse
    if ((numberOf1 == 3
        || numberOf2 == 3
        || numberOf3 == 3
        || numberOf4 == 3
        || numberOf5 == 3
        || numberOf6 == 3)
        && (numberOf1 == 2
            || numberOf2 == 2
            || numberOf3 == 2
            || numberOf4 == 2
            || numberOf5 == 2
            || numberOf6 == 2)) {
        if (document.getElementById("btnfh").dataset.saved == 0) {

            document.getElementById("btnfh").innerText = 25;
        }
    }
    //small street
    if ((numberOf1 >= 1 && numberOf2 >= 1 && numberOf3 >= 1 && numberOf4 >= 1)
        || (numberOf2 >= 1 && numberOf3 >= 1 && numberOf4 >= 1 && numberOf5 >= 1)
        || (numberOf3 >= 1 && numberOf4 >= 1 && numberOf5 >= 1 && numberOf6 >= 1)) {
        if (document.getElementById("btnss").dataset.saved == 0) {

            document.getElementById("btnss").innerText = 30;
        }
    }
    //big street
    if ((numberOf1 >= 1 && numberOf2 >= 1 && numberOf3 >= 1 && numberOf4 >= 1 && numberOf5 >= 1)
        || (numberOf2 >= 1 && numberOf3 >= 1 && numberOf4 >= 1 && numberOf5 >= 1 && numberOf6 >= 1)) {
        if (document.getElementById("btnbs").dataset.saved == 0) {

            document.getElementById("btnbs").innerText = 40;
        }
    }
    //chance
    if (document.getElementById("btnc").dataset.saved == 0) {

        document.getElementById("btnc").innerText = dices.reduce((partialSum, a) => partialSum + a, 0);
    }
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}