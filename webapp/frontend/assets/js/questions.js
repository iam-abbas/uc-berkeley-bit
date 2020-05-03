var split = [80, 20];
var splitQ = 25;
var totalQ = 43;

const numberOfQuestions = document.querySelectorAll(".qna").length;
const thankyou = document.getElementById("thank-you");
const isOnFinalQuestion = () => currentQuestionNumber + 1 === numberOfQuestions;
const currentQuestion = () =>
  document.querySelectorAll(".qna")[currentQuestionNumber];

const questionnaire = () => document.querySelector("form");
const agreeButton = () => document.querySelector("#take-survey");
const submitButton = () => document.querySelectorAll("#next");
const nextButton = () => document.querySelectorAll("#pre-next");
const hideValMsg = () => {
  var valMsgs = currentQuestion().getElementsByClassName("valMsg");
  for (let i = 0; i < valMsgs.length; i++) {
    valMsgs[i].style.display = "none";
  }
};

const showOnlyCurrentQuestion = () => {
  document
    .querySelectorAll(".qna")
    .forEach((question) => question.classList.add("hidden"));
  currentQuestion().classList.remove("hidden");
  hideValMsg();
  currentQuestion().getElementsByTagName("input")[0].focus();
};

const unhideValMsg = (msg) => {
  var valMsgs = currentQuestion().getElementsByClassName(msg);
  for (let i = 0; i < valMsgs.length; i++) {
    valMsgs[i].style.display = "block";
  }
};

var nowwidth = 0;
var valMsg;

const displayPrev = () => {
  var disabled = $("#SurveyForm")
    .find(":input:disabled")
    .removeAttr("disabled");
  questionnaire().classList.remove("enter-from-right");
  questionnaire().classList.add("leave-to-right");
  setTimeout(() => {
    currentQuestionNumber--;
    showOnlyCurrentQuestion();
    questionnaire().classList.remove("leave-to-right");
    questionnaire().classList.add("enter-from-left");
  }, 600);
};
const displayNextQuestion = () => {
  hideValMsg();
  if (
    currentQuestion()
      .getElementsByTagName("input")[0]
      .classList.contains("text-field")
  ) {
    if (currentQuestion().getElementsByTagName("input")[0].name == "name") {
      valMsg = validateName(
        currentQuestion().getElementsByTagName("input")[0].value
      );
    } else if (
      currentQuestion().getElementsByTagName("input")[0].name == "email"
    ) {
      valMsg = validateEmail(
        currentQuestion().getElementsByTagName("input")[0].value
      );
    }
    if (valMsg != null) {
      unhideValMsg(valMsg);
      valMsg = null;
      return;
    }
  }
  questionnaire().classList.remove("enter-from-left");
  questionnaire().classList.remove("enter-from-right");
  questionnaire().classList.add("leave-to-left");
  var currentWidth = 0;
  setTimeout(() => {
    currentQuestionNumber++;
    showOnlyCurrentQuestion();
    questionnaire().classList.remove("leave-to-left");
    questionnaire().classList.add("enter-from-right");
  }, 600);
  var width =
    (document.getElementById("progress").offsetWidth /
      document.getElementById("progressBar").offsetWidth) *
    100;
  if (currentQuestionNumber < splitQ) {
    newwidth = split[0] / splitQ;
  } else {
    newwidth = split[1] / (totalQ - splitQ);
  }
  nowwidth = nowwidth + newwidth;
  document.getElementById("progress").style.width = nowwidth + "%";
};

const handleSubmission = () => {
  questionnaire().classList.remove("enter-from-right");
  questionnaire().classList.add("leave-to-left");
  thankyou.classList.remove("hidden");
  thankyou.classList.remove("leave-to-left");
  thankyou.classList.add("enter-from-right");
};

agreeButton().addEventListener("click", function (event) {
  document
    .querySelectorAll(".entry")
    .forEach((stmt) => stmt.classList.add("hidden"));
  document.querySelector("#SurveyForm").classList.remove("hidden");
});

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

nextButton().forEach(function (el) {
  el.addEventListener("click", function (event) {
    setTimeout(function () {
      event.preventDefault();
      displayNextQuestion();
      return;
    }, 500);
  });
});
