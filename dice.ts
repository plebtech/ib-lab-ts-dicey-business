console.log("Loading..");

const // global constant variables.
    output: HTMLElement = document.getElementById("output")!,
    btns: NodeListOf<HTMLButtonElement> = document.getElementById("controls")!.querySelectorAll("button"),
    generateBtn: HTMLButtonElement = btns[0],
    rerollBtn: HTMLButtonElement = btns[1],
    sumBtn: HTMLButtonElement = btns[2],
    clearBtn: HTMLButtonElement = btns[3],
    statusDiv: HTMLElement = document.getElementById("status")!,
    strRemove: string = `<span>selected die removed.</span>`;

let // global mutable variables.
    counter: number = 1, // starts at 1, incremented AFTER die object created.
    dice: Die[] = []; // empty array, dice pushed to it as they are created.

class Die {
    div: HTMLElement;
    value: number;
    constructor() {
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
    // 'rolls' dice for one second before settling on final value.
    animate = (limit: number = 1000): void => {
        let start: number = Date.now();
        const timer = setInterval((): void => {
            let timePassed: number = Date.now() - start;
            if (timePassed >= limit) {
                clearInterval(timer);
                return;
            }
            this.roll();
        }, 100);
        return;
    }
    // call function to generate random die value (1-6).
    roll = (min: number = 1, max: number = 6): void => {
        let r: number = randomDieVal(min, max);
        this.value = r;
        this.div.innerHTML = '<span>' + setFace(this.value) + '</span>';
        return;
    }
    // listeners for each die (click, double/right).
    listen = (): void => {
        let rIndex: number = dice.indexOf(this);
        this.div.addEventListener('click', (): void => {
            this.animate();
            statusDiv.innerHTML = `<span>selected die rerolled.</span>`;
            return;
        });
        this.div.addEventListener('dblclick', (): void => {
            this.div.remove();
            dice.splice(rIndex, 1);
            reorderDice();
            statusDiv.innerHTML = strRemove;
            return;
        });
        this.div.addEventListener('contextmenu', (): void => {
            this.div.remove();
            dice.splice(rIndex, 1);
            reorderDice();
            statusDiv.innerHTML = strRemove;
            return;
        });
        return;
    }
}

// button listeners.
generateBtn.addEventListener('click', (): void => {
    new Die(); // instantiates Die class.
    let noun: string = setNoun();
    statusDiv.innerHTML = `<span>number of ${noun}: ${dice.length}.</span>`;
    return;
});
rerollBtn.addEventListener('click', (): void => {
    if (dice.length <= 0) {
        noDice();
    } else {
        dice.forEach(die => {
            die.animate(1000);
            let noun: string = setNoun();
            statusDiv.innerHTML = `<span>${dice.length} ${noun} rerolled.</span>`;
        });
    }
    return;
});
sumBtn.addEventListener('click', (): void => {
    if (dice.length <= 0) {
        noDice();
    } else {
        let sum: number = 0;
        let noun: string = setNoun();
        dice.forEach(die => {
            sum += die.value;
        });
        statusDiv.innerHTML = `<span>sum of ${noun}: ${sum}.</span>`;
    }
    return;
});
clearBtn.addEventListener('click', () => {
    dice = [];
    output.innerHTML = '';
    counter = 1;
});

const noDice = (): void => {
    statusDiv.innerHTML = `<span>no dice.</span>`;
    return;
}

// set noun based on # of existing dice (single die vs multiple dice).
const setNoun = (): string => {
    let n: string;
    if (dice.length === 1) {
        n = 'die';
    } else if (dice.length > 1) {
        n = 'dice';
    } else {
        n = 'error';
    }
    return n;
}

// return random value between 1 and 6 inclusive.
// use of Math.floor(Math.random()) requires formula of (((max+1) - min) + min) because Math.random() generates [0, 1).
const randomDieVal = (min: number, max: number): number => {
    let val: number = Math.floor(Math.random() * ((max + 1) - min) + min);
    return val;
}

// return ascii code for die 'face' based on passed value.
const setFace = (value: number): string => {
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
}

// when die removed, reassign div ids based on # of dice left, set counter to # of dice.
const reorderDice = (): void => {
    let x: number = 0;
    dice.forEach(die => {
        die.div.id = x.toString();
        x++;
    });
    counter = dice.length;
    return;
}

console.log("Loaded."); // if you see this, no errors.