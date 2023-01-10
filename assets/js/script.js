
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const startingMinutes = 10;
let time = startingMinutes * 60;

const countdownEl = document.getElementById('countdown');

setInterval(updateCountdown, 1000);

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownEl.innerHTML = '${minutes}: ${seconds}';
    time--;
}


let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion();
})

/*click start*/
function startQuiz() {
    startButton.classList.add('hide');
    
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
  }


  function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}    

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}


function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if(shuffledQuestions.length > currentQuestionIndex +1) {
        nextButton.classList.remove('hide');
    }   else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

/*question array*/
const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hypertext Markup Language', correct: true},
            { text: 'Hyper Makeup Language', correct: false},
            { text: 'Hopper Language', correct: false},
            { text: 'Hyper Language', correct: false}
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Color style sheet', correct: false},
            { text: 'Cascading Style Sheets', correct: true},
            { text: 'Color sheets', correct: false},
            { text: 'None of the above', correct: false}
        ]
    },
    {
        question: 'Where is javascript code linked?',
        answers: [
            { text: 'It is not linked', correct: false},
            { text: 'Style Sheet', correct: false},
            { text: 'CSS', correct: false},
            { text: 'HTML', correct: true}
        ]
    },
    {
        question: 'What is the javascript tag when linking in the HTML file?',
        answers: [
            { text: '<script src="filename.js></script', correct: true},
            { text: '<html></html>', correct: false},
            { text: 'link=rel"stylesheet"', correct: false},
            { text: '<script href="filename>', correct: false}
        ]
    }  
]