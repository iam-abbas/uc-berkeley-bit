
var split = [80, 30];
var splitQ = 30;
var totalQ = 57;

const numberOfQuestions = document.querySelectorAll(".qna").length;
const thankyou = document.getElementById("thank-you");
const isOnFinalQuestion = () => currentQuestionNumber + 1 === numberOfQuestions;
const currentQuestion = () =>
  document.querySelectorAll(".qna")[currentQuestionNumber];

const questionnaire = () => document.querySelector("form");
const submitButton = () => document.querySelectorAll('#next');
const showOnlyCurrentQuestion = () => {
  document
    .querySelectorAll(".qna")
    .forEach(question => question.classList.add("hidden"));
  currentQuestion().classList.remove("hidden");
};

var nowwidth = 0
const displayNextQuestion = () => {
  questionnaire().classList.remove("enter-from-right");
  questionnaire().classList.add("leave-to-left");
  var currentWidth = 0;
  setTimeout(() => {
    currentQuestionNumber++;
    showOnlyCurrentQuestion();
    currentQuestion().focus();
    questionnaire().classList.remove("leave-to-left");
    questionnaire().classList.add("enter-from-right");
  }, 1000);
  var width = (document.getElementById("progress").offsetWidth/document.getElementById("progressBar").offsetWidth)*100
  if(currentQuestionNumber < splitQ) {
    newwidth = (split[0]/splitQ)
  } else {
    newwidth = (split[1]/(totalQ-splitQ))
  }
  nowwidth = nowwidth+newwidth;
  document.getElementById("progress").style.width = nowwidth+"%";
};

const handleSubmission = () => {
  questionnaire().classList.remove("enter-from-right");
  questionnaire().classList.add("leave-to-left");
  thankyou.classList.remove("hidden");
  thankyou.classList.remove("leave-to-left");
  thankyou.classList.add("enter-from-right");
}

let currentQuestionNumber = 0;
showOnlyCurrentQuestion();

submitButton().forEach(function (el) {
  el.addEventListener("click", function (event) {
    setTimeout(function () {
      if (!isOnFinalQuestion()) {
        event.preventDefault();
        displayNextQuestion();
        return;
      }
      if (isOnFinalQuestion()) {
        handleSubmission();
      }
    }, 500);
  });
});


