// game name places
let gameName = "Guess the word"
document.title = document.querySelector('h1').innerHTML = `${gameName} ✍(◔◡◔)`
document.querySelector('footer').innerHTML = `${gameName} game  <br> &copy; 2025 Bassant Tarek . All rights reserved.`

// game options
let nOFtries = 6
let nOFletters = 7
let nOFhints = 3
let current = 1


// words list
let word = ""
const words = ["teacher", "picture", "monster", "diamond", "kingdom", "journey", "freedom", "library", "village", "treasure"]
word = words[Math.floor(Math.random() * words.length)].toUpperCase()
console.log(word)

// manage playing area
function input() {
    const inputsContainer = document.querySelector(".inputs")

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
            input.style.width = "100px"
            input.style.margin= "5px"
            input.style.height = "45px"
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
    for (let i =1 ; i <= nOFletters ; i++){
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

//     messages management
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

        if (current !== 6){
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
    else if (nOFhints === 0){
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

window.onload = function (){input()}



