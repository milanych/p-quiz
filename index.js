async function fetchTriviaQuestion() {
  const response = await fetch('https://the-trivia-api.com/api/questions?limit=1');
  const jsonData = await response.json();
  jsonData.forEach(el => {
    processData(el);
  });
}

//Initial call
fetchTriviaQuestion();


//Случайное количество вопросов: от 3 до 10
const randomNumber = () => {
  return Math.floor(Math.random() * (10 - 3) + 3)
}
const quantity = randomNumber()
const questionList = document.querySelector('.quizBody')
const submitButton = document.querySelector("#nextButton");
const answers = document.querySelectorAll('.answer')
let iterator = document.createElement('span');
let currentQuestion = 0;
let result = 0;
let i = 1;
let answerLetters = ['a', 'b', 'c', 'd'];
let indexOfCorrectAnswer;

function processData(data) {
  document.querySelector("#questionDescription").innerHTML = data.question;
  let answersList = [data.incorrectAnswers[0], data.incorrectAnswers[1], data.incorrectAnswers[2], data.correctAnswer];

  let shuffledAnswers = [];
  shuffle(answersList);

  while (answersList.length > 0) {
    let currentAnswer = answersList.shift();
    shuffledAnswers.push(currentAnswer);
  }

  indexOfCorrectAnswer = shuffledAnswers.indexOf(data.correctAnswer);
  document.querySelector("#label_a").innerHTML = shuffledAnswers[0];
  document.querySelector("#label_b").innerHTML = shuffledAnswers[1];
  document.querySelector("#label_c").innerHTML = shuffledAnswers[2];
  document.querySelector("#label_d").innerHTML = shuffledAnswers[3];
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

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
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
  iterator.innerHTML = ` (${i} / ${quantity})`
  document.querySelector(".questionHeading").appendChild(iterator)
  i++;
}



function getResult() {
  deselectAnswers();
  currentQuestion++;
  if (currentQuestion < quantity) {
    fetchTriviaQuestion();
  } else {
    questionList.innerHTML = `Your result: <b>${result}/${quantity}</b> questions`;
    document.querySelector("#nextButton").remove();
    document.getElementById('attention').innerHTML = ''
    let emoji = document.createElement('p');
    emoji.classList.add('emoji');
    document.querySelector(".quizBody").append(emoji);
    if (result <= quantity / 2 && result > 0) {
      emoji.innerHTML = '☹️';
      document.querySelector(".questionHeading").innerHTML = 'Try harder!'
    } else if (result === 0) {
      emoji.innerHTML = '🤷‍♂️';
      document.querySelector(".questionHeading").innerHTML = 'No comment...'
    } else if (result > quantity / 2 && result < quantity) {
      emoji.innerHTML = '🙂';
      document.querySelector(".questionHeading").innerHTML = 'Very good!'
    } else if (result === quantity) {
      emoji.innerHTML = '😎';
      document.querySelector(".questionHeading").innerHTML = 'Perfect!'
    }
    createRepeatLink()
  }
}

function answerChosen() {
  submitButton.addEventListener('click', () => {
    let selected = isSelected();
    if (selected) {
      if (selected === answerLetters[indexOfCorrectAnswer]) {
        result++;
      }
      getResult();
    } else {
      document.getElementById('attention').innerHTML = 'Choose the answer!'
    }
  })
}
answerChosen();


document.addEventListener('DOMContentLoaded', () => {
  fetchTriviaQuestion();
});