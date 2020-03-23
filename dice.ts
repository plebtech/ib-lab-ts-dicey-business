console.log("Loading..");

const
    CONTAINER: HTMLElement = document.getElementById("container"),
    GENERATE_BTN: HTMLElement = document.getElementById("controls").querySelectorAll("button")[0],
    REROLL_BTN: HTMLElement = document.getElementById("controls").querySelectorAll("button")[0],
    SUM_BTN: HTMLElement = document.getElementById("controls").querySelectorAll("button")[0],
    STATUS: HTMLElement = document.getElementById("status");

let
    counter: number = 1,
    dice: number[] = [];

const testingTS = () => {
    console.log(CONTAINER);
    console.log(dice);
}

testingTS();

console.log("HAHA");

console.log("Loaded.")