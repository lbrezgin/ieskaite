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
                let dropLetter = document.createElement("div");
                dropLetter.setAttribute("class", "drop");
                dropLetter.setAttribute("id", "drop"+(i+1));
                dropLetter.setAttribute("draggable", "true" );
                dropLetter.innerHTML = randLettersArray[i];
                document.getElementById("letters").appendChild(dropLetter);
            }
            console.log(randLettersArray);
            console.log(this.countryArray);
        }

    checkWin() {
        let matchedLetters = document.querySelectorAll('.match div');
        let matchedWord = '';

        matchedLetters.forEach(div => {
            let text = div.textContent;
            matchedWord += text;
        });

        if (matchedWord === this.word) {
            alert('Победа!');
            let startNewGame = document.createElement("input");
            let engGame = document.createElement("input");
            startNewGame.setAttribute("type", "button");
            engGame.setAttribute("type", "button");
            startNewGame.setAttribute("value", "Продолжить?");
            engGame.setAttribute("value", "Закончить?");
            // Добавить обработчик событий на кнопки

            document.getElementById("choice").appendChild(startNewGame);
            document.getElementById("choice").appendChild(engGame);

        } else if (matchedWord.length === this.word.length) {
            let lettersContainer = document.getElementById('letters');
            matchedLetters.forEach(div => {
                lettersContainer.appendChild(div);
            });
        }
    }
}

let newGame;
fetch("countries.csv")
    .then(function (response) {
        return response.text();
    })

    .then(function (data) {
        let valsti = data.split("\n").slice(1);
        rand = Math.floor(Math.random() * (valsti.length-1));
        let randCountry = valsti[rand];
        newGame = new Game(randCountry);
        newGame.writeWord();
        newGame.randLetters();
    })

    .catch(function (error) {
        console.error("Kļūda: "+error);
    });

document.ondragstart = function(event) {
    event.dataTransfer.setData("Text", event.target.id);
};

document.ondragover = function(event) {
    event.preventDefault();
};

let arr = [];
document.ondrop = function(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("Text");
    let target = event.target;
    if (target.classList.contains("match")) {
        event.target.appendChild(document.getElementById(data));
        newGame.checkWin();
    }
};

