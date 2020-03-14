const numberOfQuestions = document.querySelectorAll(".qna").length;
console.log(numberOfQuestions)

const isOnFinalQuestion = () => currentQuestionNumber + 1 === numberOfQuestions;
const currentQuestion = () =>
  document.querySelectorAll(".qna")[currentQuestionNumber];
const questionnaire = () => document.querySelector("form");
const newLocal = () => document.querySelectorAll('input[type="radio"]');
const submitButton = newLocal;

const showOnlyCurrentQuestion = () => {
  document
    .querySelectorAll(".qna")
    .forEach(question => question.classList.add("hidden"));
  currentQuestion().classList.remove("hidden");
};

const displayNextQuestion = () => {
  questionnaire().classList.remove("enter-from-right");
  questionnaire().classList.add("leave-to-left");
  setTimeout(() => {
    currentQuestionNumber++;
    showOnlyCurrentQuestion();
    currentQuestion().focus();
    questionnaire().classList.remove("leave-to-left");
    questionnaire().classList.add("enter-from-right");
  }, 1000);
};

let currentQuestionNumber = 0;
showOnlyCurrentQuestion();

submitButton().addEventListener("click", function(event) {
    console.log(isOnFinalQuestion())
  if (!isOnFinalQuestion()) {
    event.preventDefault();
    displayNextQuestion();
    return;
  }
  //displayNextQuestion();


});