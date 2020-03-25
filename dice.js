"use strict";
console.log("Loading..");
var // global constant variables.
output = document.getElementById("output"), btns = document.getElementById("controls").querySelectorAll("button"), generateBtn = btns[0], rerollBtn = btns[1], sumBtn = btns[2], clearBtn = btns[3], statusDiv = document.getElementById("status"), strRemove = "<span>selected die removed.</span>";
var // global mutable variables.
counter = 1, // starts at 1, incremented AFTER die object created.
dice = []; // empty array, dice pushed to it as they are created.
var Die = /** @class */ (function () {
    function Die() {
        var _this = this;
        // 'rolls' dice for one second before settling on final value.
        this.animate = function (limit) {
            if (limit === void 0) { limit = 1000; }
            var start = Date.now();
            var timer = setInterval(function () {
                var timePassed = Date.now() - start;
                if (timePassed >= limit) {
                    clearInterval(timer);
                    return;
                }
                _this.roll();
            }, 100);
            return;
        };
        // call function to generate random die value (1-6).
        this.roll = function (min, max) {
            if (min === void 0) { min = 1; }
            if (max === void 0) { max = 6; }
            var r = randomDieVal(min, max);
            _this.value = r;
            _this.div.innerHTML = '<span>' + setFace(_this.value) + '</span>';
            return;
        };
        // listeners for each die (click, double/right).
        this.listen = function () {
            var rIndex = dice.indexOf(_this);
            _this.div.addEventListener('click', function () {
                _this.animate();
                statusDiv.innerHTML = "<span>selected die rerolled.</span>";
                return;
            });
            _this.div.addEventListener('dblclick', function () {
                _this.div.remove();
                dice.splice(rIndex, 1);
                reorderDice();
                statusDiv.innerHTML = strRemove;
                return;
            });
            _this.div.addEventListener('contextmenu', function () {
                _this.div.remove();
                dice.splice(rIndex, 1);
                reorderDice();
                statusDiv.innerHTML = strRemove;
                return;
            });
            return;
        };
        this.value = 0;
        this.div = document.createElement('div'); // create div via DOM.
        this.div.classList.add('die'); // assign class to div.
        this.div.id = counter.toString(); // assign id to div (based on counter value);
        output.appendChild(this.div);
        this.animate();
        counter++;
        dice.push(this);
        this.listen();
    }
    return Die;
}());
// button listeners.
generateBtn.addEventListener('click', function () {
    new Die(); // instantiates Die class.
    var noun = setNoun();
    statusDiv.innerHTML = "<span>number of " + noun + ": " + dice.length + ".</span>";
    return;
});
rerollBtn.addEventListener('click', function () {
    if (dice.length <= 0) {
        noDice();
    }
    else {
        dice.forEach(function (die) {
            die.animate(1000);
            var noun = setNoun();
            statusDiv.innerHTML = "<span>" + dice.length + " " + noun + " rerolled.</span>";
        });
    }
    return;
});
sumBtn.addEventListener('click', function () {
    if (dice.length <= 0) {
        noDice();
    }
    else {
        var sum_1 = 0;
        var noun = setNoun();
        dice.forEach(function (die) {
            sum_1 += die.value;
        });
        statusDiv.innerHTML = "<span>sum of " + noun + ": " + sum_1 + ".</span>";
    }
    return;
});
clearBtn.addEventListener('click', function () {
    dice = [];
    output.innerHTML = '';
    counter = 1;
});
var noDice = function () {
    statusDiv.innerHTML = "<span>no dice.</span>";
    return;
};
// set noun based on # of existing dice (single die vs multiple dice).
var setNoun = function () {
    var n;
    if (dice.length === 1) {
        n = 'die';
    }
    else if (dice.length > 1) {
        n = 'dice';
    }
    else {
        n = 'error';
    }
    return n;
};
// return random value between 1 and 6 inclusive.
// use of Math.floor(Math.random()) requires formula of (((max+1) - min) + min) because Math.random() generates [0, 1).
var randomDieVal = function (min, max) {
    var val = Math.floor(Math.random() * ((max + 1) - min) + min);
    return val;
};
// return ascii code for die 'face' based on passed value.
var setFace = function (value) {
    switch (value) {
        case 1:
            return '\u2680';
        case 2:
            return '\u2681';
        case 3:
            return '\u2682';
        case 4:
            return '\u2683';
        case 5:
            return '\u2684';
        case 6:
            return '\u2685';
    }
    return 'error';
};
// when die removed, reassign div ids based on # of dice left, set counter to # of dice.
var reorderDice = function () {
    var x = 0;
    dice.forEach(function (die) {
        die.div.id = x.toString();
        x++;
    });
    counter = dice.length;
    return;
};
console.log("Loaded."); // if you see this, no errors.
