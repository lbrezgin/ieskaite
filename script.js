class Game {
    constructor(word) {
        this._word = word;
        this._countryArray = word.split("");
    }

    get word() {
        return this._word;
    }

    get countryArray() {
        return this._countryArray;
    }

    writeWord() {
        for (let i = 0; i < (this.countryArray.length); i++) {
            let field = document.createElement("div");
            field.setAttribute("class", "match");
            field.setAttribute("id", "div"+(i+1));
            field.setAttribute("ondrop", "drop(event)");
            field.setAttribute("ondragover", "allowDrop(event)");
            document.getElementById("country").appendChild(field);
        }
    }

    randLetters() {
        let lettersArray = this.word.split("");
        let randLettersArray = [];

            for (let i = 0; i < this.countryArray.length; i++) {
                let rand = Math.floor(Math.random() * lettersArray.length);
                randLettersArray[i] = lettersArray[rand];
                lettersArray.splice(rand, 1);
                let dropLetter = document.createElement("canvas");
                dropLetter.setAttribute("id", "drop"+(i+1));
                dropLetter.setAttribute("draggable", "true" );
                dropLetter.setAttribute("ondragstart", "drag(event)");
                dropLetter.setAttribute("width", "50");
                dropLetter.setAttribute("height", "50");
                const ctx = dropLetter.getContext("2d");
                ctx.font = "20px Arial";

                const textMetrics = ctx.measureText(randLettersArray[i]);
                const textWidth = textMetrics.width;
                const textHeight = parseInt(ctx.font);

                const x = (dropLetter.width - textWidth) / 2;
                const y = (dropLetter.height + textHeight) / 2;

                ctx.fillText(randLettersArray[i], x, y);
                document.getElementById("letters").appendChild(dropLetter);
            }
            console.log(randLettersArray);
            console.log(this.countryArray);
            console.log(this.word);
        }
}

fetch("countries.csv")
    .then(function (response) {
        return response.text();
    })

    .then(function (data) {
        let valsti = data.split("\n").slice(1);
        rand = Math.floor(Math.random() * (valsti.length-1));
        let randCountry = valsti[rand];
        const newGame = new Game(randCountry);
        newGame.writeWord();
        console.log(newGame.word)
        newGame.randLetters();
    })

    .catch(function (error) {
        console.error("Kļūda: "+error);
    });

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    let data = ev.dataTransfer.getData("Text");
    let targetElement = ev.target;

    if (targetElement.classList.contains("match")) {
        ev.preventDefault();
        ev.target.appendChild(document.getElementById(data));
    }
}
