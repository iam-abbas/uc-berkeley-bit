window.onload = function () {
  setInterval(count, 1000);
};
let counter = 0;
let lasCount = 0;

function count() {
  counter++;
}

function resetCount() {
  counter = 0;
}

var answers = []
var myCounts = []
var split = [80, 30];
var splitQ = 30;
var totalQ = 57;

const numberOfQuestions = document.querySelectorAll(".qna").length;
const thankyou = document.getElementById("thank-you");
const isOnFinalQuestion = () => currentQuestionNumber + 1 === numberOfQuestions;
const currentQuestion = () =>
  document.querySelectorAll(".qna")[currentQuestionNumber];

const questionnaire = () => document.querySelector("form");
const submitButton = () => document.querySelectorAll('input[type="radio"]');
const showOnlyCurrentQuestion = () => {
  document
    .querySelectorAll(".qna")
    .forEach(question => question.classList.add("hidden"));
  currentQuestion().classList.remove("hidden");
};

var nowwidth = 0
const displayNextQuestion = () => {
  myCounts.push(counter)
  console.log(myCounts)
  questionnaire().classList.remove("enter-from-right");
  questionnaire().classList.add("leave-to-left");
  var currentWidth = 0;
  setTimeout(() => {
    currentQuestionNumber++;
    showOnlyCurrentQuestion();
    currentQuestion().focus();
    questionnaire().classList.remove("leave-to-left");
    questionnaire().classList.add("enter-from-right");
  }, 500);
  var width = (document.getElementById("progress").offsetWidth/document.getElementById("progressBar").offsetWidth)*100
  if(currentQuestionNumber < splitQ) {
    newwidth = (split[0]/splitQ)
  } else {
    newwidth = (split[1]/(totalQ-splitQ))
  }
  nowwidth = nowwidth+newwidth;
  document.getElementById("progress").style.width = nowwidth+"%";
  console.log(nowwidth)
  resetCount()

};

const handleSubmission = () => {
  myCounts.push(counter)
  questionnaire().classList.remove("enter-from-right");
  questionnaire().classList.add("leave-to-left");


  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://api.choros.io/bit.php", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  data = []
  data.push(JSON.stringify(myCounts))
  data.push(JSON.stringify(answers))
  xhr.send(JSON.stringify(data));
  console.log(data)

  thankyou.classList.remove("hidden");
  thankyou.classList.remove("leave-to-left");
  thankyou.classList.add("enter-from-right");

}

let currentQuestionNumber = 0;
showOnlyCurrentQuestion();

submitButton().forEach(function (el) {
  el.addEventListener("change", function (event) {
    setTimeout(function () {
      answers.push(parseInt(el.value))
      console.log(answers)

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


