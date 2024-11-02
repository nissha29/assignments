import { quizData } from '../data.js'

const start = document.querySelector('.start')
const main = document.querySelector('.main')
const inMain = document.querySelector('.in-main')
const ques = document.querySelector('.ques')
const opt = document.querySelector('.opt')
const a = document.querySelector('.a')
const b = document.querySelector('.b')
const c = document.querySelector('.c')
const d = document.querySelector('.d')
const submit = document.querySelector('.submit')
const radios = document.querySelectorAll('input[name="language"]')

let len = quizData.length
let index = 0
let correct = 0

const display = (index) => {
    if (index == len) {
        ques.innerHTML = `You answered ${correct}/${len} correctly`
        submit.innerHTML = `Reload`
        opt.classList.add('invisible')
        return
    }
    let quiz = quizData[index]
    ques.innerHTML = quiz.question
    a.innerHTML = quiz.a
    b.innerHTML = quiz.b
    c.innerHTML = quiz.c
    d.innerHTML = quiz.d
    submit.innerHTML = "SUBMIT"
    opt.classList.remove('invisible')
    inMain.classList.add('h-[25rem]')
    inMain.classList.remove('h-[12rem]')
}

const startQuiz = () => {
    index = 0
    correct = 0
    start.classList.add('invisible')
    main.classList.remove('invisible')
    display(index)
}

start.addEventListener('click', startQuiz)

const resetRadioButtons = () => {
    radios.forEach(radio => {
        radio.checked = false
    })
}

const getSelectedOption = () => {
    for (const radio of radios) {
        if (radio.checked) return radio.value
    }
    return null
}

const isCorrect = () => {
    const ans = getSelectedOption()
    if (ans && ans === quizData[index].correct) {
        correct++
    }
}

submit.addEventListener('click', () => {
    if (index < len) {
        isCorrect()
        index++
        resetRadioButtons()
        display(index)
    } 
    else if (submit.innerHTML === "Reload") {
        start.classList.remove('invisible')
        main.classList.add('invisible')
        start.addEventListener('click', () => {
            startQuiz()
        })
    }
})
