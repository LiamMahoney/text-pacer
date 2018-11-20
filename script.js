let counter = 0; 
let wordList = []; 
let timer = undefined;

// main driver function. 
//FIXME: break this function into smaller simpler functions
function buttonClick() {
    let string = document.querySelector('.text').value;
    let templist = string.split(".");
    
    for (x of templist) {
        let additionalList = x.split(" ");
        wordList = wordList.concat(additionalList);
        wordList.push(". ");
    }

    let time = document.querySelector('.time').value;

    prepareDOM();

    let interval = (time/wordList.length) * 1000;

    timer = window.setInterval(updateText, interval);
}

// renders the DOM how we want it to display the words. Renders as many div containers
// as the user inputs
function prepareDOM() {
    let num = document.querySelector('.number-of-containers').value;

    // opens container div
    let DOMString = `<div style="display: flex; height: 100vh; width: 100vw; flex-direction: column;">`;

    // each div that serves as a word container is created here
    for (let i = 0; i < num; i++) {
        DOMString += `<div class="text-position"></div>`;
    }

    // closes out container div
    DOMString += `</div>`;

    document.body.innerHTML = DOMString;
}

function updateText() {
    // getting a list of all of the divs that will hold words 
    let DOMList = document.querySelectorAll('.text-position');

    // looping through each div that will hold words
    // want words to start at the bottom
    for (let i = DOMList.length - 1; i >= 0; i--) {
        // counter of which word we are on
        let x = DOMList.length - i - 1;

        // If counter is larger than the wordList length (no word)
        if (wordList[counter - x] === undefined) {
            DOMList[i].innerText = "";
        } else {
            DOMList[i].innerText = wordList[counter - x];
        }

        x++;
    }

    // global counter of where we are in the wordList
    counter++;

    // need to add the DOMList length to the word list length to 
    // make sure the last word reaches the last div container
    if (counter === wordList.length + DOMList.length) {
        window.clearInterval(timer);
    }
}