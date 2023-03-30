const quiz = [
  {
    question: 'Who is the president of USA in 2023?',
    a: 'Donald Trump',
    b: 'Harry Truman',
    c: 'Vladimir Putin',
    d: 'Joe Biden',
    correct: 'd'
  },
  {
    question: 'What is the capital on Great Britain?',
    a: 'London',
    b: 'Dublin',
    c: 'Glasgow',
    d: 'Belfast',
    correct: 'a'
  },
  {
    question: 'The year of USSR creation?',
    a: '1922',
    b: '1917',
    c: '1905',
    d: '1932',
    correct: 'a'
  },
  {
    question: 'Who created SpaceX?',
    a: 'Elon Musk',
    b: 'Joe Biden',
    c: 'Donald Trump',
    d: 'Vladimir Putin',
    correct: 'a'
  }
]
const submitButton = document.querySelector("#nextButton");
const question = document.querySelector("#questionDescription");
const label_a = document.querySelector("#label_a");
const label_b = document.querySelector("#label_b");
const label_c = document.querySelector("#label_c");
const label_d = document.querySelector("#label_d");
const answers = document.querySelectorAll('.answer')
const questionList = document.querySelector('.quizBody')
let iterator = document.createElement('span');

let currentQuestion = 0;
let result = 0;
let i = 1;

loadQuiz();

function loadQuiz() {
  deselectAnswers();
  const current = quiz[currentQuestion];
  question.innerText = current.question;
  label_a.innerText = current.a;
  label_b.innerText = current.b;
  label_c.innerText = current.c;
  label_d.innerText = current.d;
  questionIterator();
}

function isSelected() {
  let answer = undefined;
  answers.forEach(el => {
    if (el.checked) {
      answer = el.id;
    }
  })
  return answer;
}

function deselectAnswers() {
  answers.forEach(el => el.checked = false);
  document.getElementById('attention').innerHTML = ''
}

const createRepeatLink = () => {
  let repeatLink = document.createElement('a');
  repeatLink.href = '.';
  repeatLink.innerText = 'Repeat?'
  repeatLink.setAttribute('id', 'nextButton');
  document.querySelector('.questionBody').after(repeatLink)
}

function questionIterator() {
  iterator.innerHTML = ` (${i} / ${quiz.length})`
  document.querySelector(".questionHeading").appendChild(iterator)
  i++;
}

function removeIterator() {
  return document.querySelector(".questionHeading").removeChild(iterator);
}

submitButton.addEventListener('click', () => {
  const selected = isSelected();
  if (selected) {
    if (selected === quiz[currentQuestion].correct) {
      result++;
    }
    currentQuestion++;
    if (currentQuestion < quiz.length) {
      removeIterator()
      loadQuiz();
      console.log(result)
    } else {
      questionList.innerHTML = `Your result: <b>${result}/${quiz.length}</b> questions`;
      document.querySelector("#nextButton").remove();
      document.getElementById('attention').innerHTML = ''
      let emoji = document.createElement('p');
      emoji.classList.add('emoji');
      document.querySelector(".quizBody").append(emoji);
      if (result <= quiz.length / 2 && result > 0) {
        emoji.innerHTML = '☹️';
        document.querySelector(".questionHeading").innerHTML = 'Try harder!'
      } else if (result === 0) {
        emoji.innerHTML = '🤷‍♂️';
        document.querySelector(".questionHeading").innerHTML = 'No comment...'
      } else if (result > quiz.length / 2 && result < quiz.length) {
        emoji.innerHTML = '🙂';
        document.querySelector(".questionHeading").innerHTML = 'Very good!'
      } else if (result === quiz.length) {
        emoji.innerHTML = '😎';
        document.querySelector(".questionHeading").innerHTML = 'Perfect!'
      }

      createRepeatLink()
    }
  } else {
    document.getElementById('attention').innerHTML = 'Choose the answer!'
  }
})