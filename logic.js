// game name places
let gameName = "Guess the word"
document.title = document.querySelector('h1').innerHTML = `${gameName} ✍(◔◡◔)`
document.querySelector('footer').innerHTML = `${gameName} game <br> &copy; 2025 Bassant Tarek . All rights reserved.`

// game options
let nOFtries, nOFletters, nOFhints
let current = 1
let word = ""
let wordHint = ""

// word banks
const wordsBank = {
    easy: [
        "apple", "table", "chair", "bread", "plant",
        "grape", "house", "light", "stone", "water",
        "cloud", "green", "smile", "train", "river"
    ],
    medium: [
        "teacher", "picture", "monster", "diamond", "kingdom",
        "journey", "freedom", "library", "village", "treasure",
        "holiday", "station", "garden", "pirate", "captain"
    ],
    hard: [
        { word: "playground", hint: "A place where children go to have fun and play outside" },
        { word: "chocolatey", hint: "Sweet and often brown treat loved by many" },
        { word: "basketball", hint: "A sport played with a hoop and an orange ball" },
        { word: "astronomer", hint: "A scientist who studies stars and planets" },
        { word: "technology", hint: "What we use in computers, phones, and machines" },
        { word: "microscope", hint: "A tool used to see very small things" },
        { word: "volleyball", hint: "A sport played by hitting a ball over a net" },
        { word: "adventure", hint: "An exciting or unusual experience" },
        { word: "satellite", hint: "An object that orbits a planet or star" },
        { word: "engineer", hint: "A person who designs and builds things" },
        { word: "dinosaur", hint: "A giant reptile that lived millions of years ago" },
        { word: "triangle", hint: "A shape with three sides" },
        { word: "pyramid", hint: "A famous structure found in Egypt" },
        { word: "language", hint: "How people communicate with words" },
        { word: "hospital", hint: "A place where sick people go to get better" }
    ]
}


// build playing area
function input() {
    const inputsContainer = document.querySelector(".inputs")
    inputsContainer.innerHTML = ""

    for (let i = 1 ; i <= nOFtries ; i++){
        const tryDiv = document.createElement('div')
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>try ${i} :</span>`;
        tryDiv.style.fontSize = "20px"
        tryDiv.style.fontWeight = "bold"

        if(i !== 1) tryDiv.classList.add("disabled")

        for (let j = 1 ; j <= nOFletters ; j++){
            const input = document.createElement("input")
            input.type = "text"
            input.id = `try-${i}-letter-${j}`
            input.setAttribute("maxlength","1")
            tryDiv.appendChild(input)
            input.style.width = "60px"
            input.style.margin= "5px"
            input.style.height = "50px"
        }

        inputsContainer.appendChild(tryDiv)
    }
    inputsContainer.children[0].children[1].focus();

    //disable all except the first
    const disabledInputs = document.querySelectorAll(".disabled input")
    disabledInputs.forEach((input) => (input.disabled = true))

    const inputs = document.querySelectorAll("input")
    inputs.forEach((input,index) => {
        input.addEventListener("input" , function (){
            this.value = this.value.toUpperCase()
            const next = inputs[index + 1]
            if (next) next.focus()
        })
    })
}

// matching the word with the inputs function
const guessButton = document.querySelector(".check")
guessButton.addEventListener("click",handelGuesses)

function handelGuesses (){
    let goodGuess = true
    for (let i = 1 ; i <= nOFletters ; i++){
        const inputField = document.querySelector(`#try-${current}-letter-${i}`);
        const letter = inputField.value.toUpperCase()
        const gameWordL = word[i-1]

        if (letter === gameWordL)
            inputField.classList.add("in-place")
        else if (word.includes(letter) && letter !=="") {
            inputField.classList.add("not-in-place")
            goodGuess = false
        }else{
            inputField.classList.add("wrong")
            goodGuess = false
        }
    }

    // messages manage
    let messages = document.querySelector(".message")
    if (goodGuess) {
        messages.innerHTML = `Good guess you have done it in ${current} tries! you won (づ￣ 3￣)づ`
        document.querySelectorAll(".inputs > div").forEach((tryDiv) => tryDiv.classList.add("disabled"))
        guessButton.disabled = true
        BofHints.disabled = true
    }
    else{
        document.querySelector(`.try-${current}`).classList.add("disabled")
        document.querySelectorAll(`.try-${current} input`).forEach((input) => input.disabled = true)

        if (current !== nOFtries){
            messages.innerHTML = `Good guess ! close to winning keep trying`
            current++;
            document.querySelector(`.try-${current}`).classList.remove("disabled")
            document.querySelectorAll(`.try-${current} input`).forEach((input) => input.disabled = false)
        }
        else{
            messages.innerHTML = `try again ! the word was <span> ${word}</span>`
            guessButton.disabled = true
            BofHints.disabled = true
        }
    }
}

// manage hints
document.querySelector(".hints span").innerHTML = `${nOFhints} `
let BofHints = document.querySelector(".hints")
BofHints.addEventListener("click", handelHints)

function handelHints() {
    if (nOFhints > 0) {
        if (nOFhints === 1 && nOFletters === 10) {
            // last hint for hard mode → show description
            document.querySelector(".message").innerHTML = `<span>Hint: </span>${wordHint}`
            nOFhints--
            document.querySelector(".hints span").innerHTML = `${nOFhints} `
            return
        }

        let emptyInputs = document.querySelectorAll("input:not([disabled])")
        let emptyL = Array.from(emptyInputs).filter((input) => input.value === "")

        if (emptyL.length > 0) {
            let index = Math.floor(Math.random() * emptyL.length)
            let randomL = emptyL[index]
            let position = Array.from(emptyInputs).indexOf(randomL)

            randomL.value = word[position]
            randomL.style.backgroundColor = "#CADCAE"

            nOFhints--
            document.querySelector(".hints span").innerHTML = `${nOFhints} `
        }
    }
    else {
        BofHints.disabled = true
    }
}

// backspace
function handelBackspace(event){
    if (event.key === "Backspace"){
        let Inputs = document.querySelectorAll("input:not([disabled])")
        let currentIndex = Array.from(Inputs).indexOf(document.activeElement)

        if (currentIndex > 0) {
            let beforeIn = Inputs[currentIndex - 1];
            let currentIn = Inputs[currentIndex];
            currentIn.value = ""
            beforeIn.value = ""
            beforeIn.focus()
        }
    }
}
document.addEventListener("keydown",handelBackspace)

// difficulty selection
function startGame(mode) {
    if (mode === "easy") {
        nOFletters = 5
        nOFtries = 4
        nOFhints = 2
        word = wordsBank.easy[Math.floor(Math.random() * wordsBank.easy.length)].toUpperCase()
    } else if (mode === "medium") {
        nOFletters = 7
        nOFtries = 6
        nOFhints = 4
        word = wordsBank.medium[Math.floor(Math.random() * wordsBank.medium.length)].toUpperCase()
    } else if (mode === "hard") {
        nOFletters = 10
        nOFtries = 8
        nOFhints = 5
        let pick = wordsBank.hard[Math.floor(Math.random() * wordsBank.hard.length)]
        word = pick.word.toUpperCase()
        wordHint = pick.hint
    }

    current = 1
    document.querySelector(".inputs").innerHTML = "" // clear old inputs

    input() // rebuild board
    document.querySelector(".message").innerHTML = "try to guess the word (✿◡‿◡)"
    document.querySelector(".hints span").innerHTML = `${nOFhints}`
    guessButton.disabled = false
    BofHints.disabled = false
}

document.querySelector(".easy").addEventListener("click", () => startGame("easy"))
document.querySelector(".medium").addEventListener("click", () => startGame("medium"))
document.querySelector(".hard").addEventListener("click", () => startGame("hard"))

// start default game as medium
window.onload = function () {
    startGame("medium")
}
