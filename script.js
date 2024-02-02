class Game {
    constructor(word) {
        this._word = word;
        this._countryArray = word.split("");
    }

    get word() { return this._word; }

    get countryArray() { return this._countryArray; }

    startGame() {
        this.writeWord();
        this.randLetters();
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
    }

    checkWin() {
        let matchedLetters = document.querySelectorAll('.match div');
        let matchedWord = '';

        matchedLetters.forEach(div => {
            let text = div.textContent;
            matchedWord += text;
        });

        if (matchedWord === this.word) {
            let startNewGame = document.createElement("input");
            let engGame = document.createElement("input");
            startNewGame.setAttribute("type", "button");
            startNewGame.setAttribute("value", "Turpināt");
            startNewGame.setAttribute("onclick", "continueGame()");

            engGame.setAttribute("type", "button");
            engGame.setAttribute("value", "Beigt");
            engGame.setAttribute("onclick", "endGame()");

            document.getElementById("choice").appendChild(startNewGame);
            document.getElementById("choice").appendChild(engGame);

            let uzvara = document.querySelectorAll('#country .drop');
            uzvara.forEach((div) => {
                div.classList.add("green");
            });

        } else if (matchedWord.length === this.word.length) {
            let lettersContainer = document.getElementById('letters');
            matchedLetters.forEach((div, index) => {
                if (matchedWord[index] != this.word[index]) {
                    lettersContainer.appendChild(div);
                }
            });
        }
    }
}

function newGameStart() {
    startTime = Date.now();
    continueGame();
}
function continueGame() {
    clearScreen();

    fetch("countries.csv")
        .then(function (response) {
            return response.text();
        })

        .then(function (data) {
            let countries = data.split("\n").slice(1);
            rand = Math.floor(Math.random() * (countries.length));
            let randCountry = countries[rand];
            newGame = new Game(randCountry);
            newGame.startGame();
        })

        .catch(function (error) {
            console.error("Kļūda: "+error);
        });
}

function endGame() {
    clearScreen();

    let endTime = Date.now();
    const elapsedTime = endTime - startTime;

    document.getElementById("result").innerHTML = `Paldies par spēli! <br> Tu spēlē pavadīji: ${formatTime(elapsedTime)}`;

    let startNewGame = document.createElement("input");
    startNewGame.setAttribute("type", "button");
    startNewGame.setAttribute("value", "Sakt jaunu spēli");
    startNewGame.setAttribute("onclick", "newGameStart()");
    document.getElementById("choice").appendChild(startNewGame);
}

function clearScreen() {
    document.getElementById("country").innerHTML = "";
    document.getElementById("letters").innerHTML = "";
    document.getElementById("choice").innerHTML = "";
    document.getElementById("result").innerHTML = "";

}

document.ondragstart = function(event) {
    event.dataTransfer.setData("Text", event.target.id);
};

document.ondragover = function(event) {
    event.preventDefault();
};

document.ondrop = function(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("Text");
    let target = event.target;
    if (target.classList.contains("match")) {
        event.target.appendChild(document.getElementById(data));
        newGame.checkWin();
    }
};

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    return `${formattedHours} stundas ${formattedMinutes} minūtes ${formattedSeconds} sekundes`;
}

let startTime;
newGameStart();

