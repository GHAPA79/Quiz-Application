import formatingData from "./helper.js";

const level = localStorage.getItem("Level") || "medium";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");
const questionNumber = document.getElementById("question-number");
const errorEle = document.getElementById("error");

const CORRECT_BONUS = 10;
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;
let formatedData = null;
let correctAnswer = null;
let score = 0;
let isAccepted = true;
let questionIndex = 0;

const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    formatedData = formatingData(data.results);
    start();
  } catch (error) {
    loader.style.display = "none";
    errorEle.style.display = "block";
  }
};

const start = () => {
  loader.style.display = "none";
  container.style.display = "block";
  showQuestion();
};

const showQuestion = () => {
  questionNumber.innerText = questionIndex + 1;
  const { question, answer, correctAnswerIndex } = formatedData[questionIndex];
  correctAnswer = correctAnswerIndex;
  questionText.innerText = question;
  answerList.forEach((button, index) => {
    button.innerText = answer[index];
  });
};

const checkAnswer = (event, index) => {
  if (!isAccepted) return;

  const isCorrect = index === correctAnswer ? true : false;
  if (isCorrect) {
    event.target.classList.add("correct");
    score += CORRECT_BONUS;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
  isAccepted = false;
};

const nextHandlerQuestion = () => {
  questionIndex++;
  if (questionIndex < formatedData.length) {
    isAccepted = true;
    removeClasses();
    showQuestion();
  } else {
    finishHandler();
  }
};

const removeClasses = () => {
  answerList.forEach((button) => (button.className = "answer-text"));
};

const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("/end.html");
};

window.addEventListener("load", fetchData);
nextButton.addEventListener("click", nextHandlerQuestion);
finishButton.addEventListener("click", finishHandler);
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => checkAnswer(event, index));
});
