import * as random from "../../lib/random.js";

// intended to be extended for each type of animation
class AbstractTextPrinter{
    constructor(domElementId, text){
        if(this.constructor == AbstractTextPrinter) {
            throw new Error("Class is of abstract type and can't be instantiated");
        };
        this.element = document.getElementById(domElementId);
        this.text = text;
        this.characters = text.split("");
    }
    
    async print(){
        this.element.innerHTML = this.text;
    }
}

class AbstractAnimatedTextPrinter extends AbstractTextPrinter{
    constructor(domElementId, text, speedMs = 100){
        super(domElementId, text);
        if(this.constructor == AbstractAnimatedTextPrinter) {
            throw new Error("Class is of abstract type and can't be instantiated");
        };
        if(this.onInterval == undefined) {
            throw new Error("onInterval method must be implemented");
        };
        this.speedMs = speedMs;
    }

    async print(){
        console.log(`Trying to print ${this.text}`);
        this.element.innerHTML = "";
        let i = 0;
        let interval = setInterval(() => {
            if (i < this.characters.length) {
                console.log(`Interval ${i}`);
                this.onInterval(i);
                i++;
            } else {
                clearInterval(interval);
                i = 0;
            }
        }, this.speedMs);
    }
}

export class OneByOnePrinter extends AbstractAnimatedTextPrinter{
    constructor(domElementId, text, speedMs = 100){
        super(domElementId, text, speedMs);
    }

    onInterval(i){
        this.element.innerHTML += this.characters[i];
    }
}

export class UnscramblePrinter extends AbstractAnimatedTextPrinter{
    static ScrambleCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-+[]{}<>".split("");

    constructor(domElementId, text, speedMs = 100){
        super(domElementId, text, speedMs);
        let scrambledIndices = random.multipleInt(UnscramblePrinter.ScrambleCharacters.length, this.characters.length);
        this.scrambledCharacters = []
        scrambledIndices.forEach(idx => {
            this.scrambledCharacters.push(UnscramblePrinter.ScrambleCharacters[idx]);
        });
    }

    onInterval(i){
        this.scrambledCharacters[i] = this.characters[i];
        this.element.innerHTML = this.scrambledCharacters.join("");
    }
}