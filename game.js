const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

// var content = {
//     question :  [ getParameterByName('question'), fontSize1 ],
//     choice1: [ getParameterByName('choice1'), fontSize2 ],
//     choice2: [ getParameterByName('choice2'), fontSize2 ],
//     choice3: [ getParameterByName('choice3'), fontSize2 ],
//     choice4: [ getParameterByName('choice4'), fontSize2 ],
//     answer: [ getParameterByName('answer'), fontSize2 ],

// }

let questions = [
    {
        question: "EM QUE ANO HP NASCEU?",
        choice1: "1978",
        choice2: "1979",
        choice3: "1980",
        choice4: "1982",
        answer: 3,
    },
    {
        question:"Qual o nome completo Dumbledore?",
        choice1: "Alvo Percival Wufrik Dumbledor",
        choice2: "Alvo Percival Wulfrico Dumbledor",
        choice3: "Alvo Percival Dambledor",
        choice4: "Alvo Dumbledor",
        answer: 2,
    },

    {
        question:"Quem éo melhor diretor?",
        choice1: "Alvo Dumbledore",
        choice2: "Dolores",
        choice3: "Severo ",
        choice4: "Minerva",
        answer: 1,
    }

]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    try {
        if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
            localStorage.setItem('mostRecentScore', score)

            window.location.href = '#end'
            // return window.location.assign('/end.html')
        }

        questionCounter++
        progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
        progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

        const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
        currentQuestion = availableQuestions[questionsIndex]
        question.innerText = currentQuestion.question

        choices.forEach(choice => {
            const number = choice.dataset['number']
            choice.innerText = currentQuestion['choice' + number]
        })


        availableQuestions.splice(questionsIndex, 1)

        acceptingAnswers = true
    }catch(e){
        //para debugar novamente
        //console.log(e)
    }
}

choices.forEach(choice => {


    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']


        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
choices[currentQuestion.answer-1].parentElement.classList.add('correct')

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
          choices[currentQuestion.answer-1].parentElement.classList.remove('correct')
            getNewQuestion()
        }, 1000)
    })
})


incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()