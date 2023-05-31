// grab elements from index
const startQuizEl = document.querySelector(".start-quiz");
const questionsEl = document.querySelector(".questions");
const endQuizEl = document.querySelector(".end-quiz");
const startBtn = document.querySelector("#startBtn");
const scoreSpan = document.querySelector("#score");
const initialsForm = document.querySelector("#score-initials");
const initialInput = document.querySelector("#initials");
const timeSpan = document.querySelector("#timeSpan");

// establish hidden/showing variable for each element
startQuizEl.hidden = false;
questionsEl.hidden = true;
endQuizEl.hidden = true;

// set play clock timer/score
let timer = 75;
let timerInterval;

function setTime() {
  // Sets interval in variable
  timerInterval = setInterval(function () {
    timer--;
    timeSpan.textContent = timer;
    if (timer <= 0) {
      // Stops execution of action at set interval
      // Calls function to create and append image
      gameOver();
    }
  }, 1000);
}

function startQuiz(e) {
  e.preventDefault();

  startQuizEl.hidden = true;
  questionsEl.hidden = false;
  setTime();
  runQuestions();
}

// setting index for tracking thru quiz array
let trackingIndex = 0;

// quiz array of question/choice/answer objects
let quiz = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    answer: "Alerts",
  },
  {
    question: "The condition in an if/else statement is enclosed in __.",
    choices: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
    answer: "Parentheses",
  },
  {
    question: "Arrays in Javascript can be used to store these data types",
    choices: [
      "Numbers and Strings",
      "Booleans",
      "Other Arrays",
      "All of the above",
    ],
    answer: "All of the above",
  },
];

function runQuestions() {
  questionsEl.textContent = "";
  const currentQuestion = quiz[trackingIndex];
  let questionHeader = document.createElement("h1");
  let choicesList = document.createElement("ol");
  questionHeader.textContent = currentQuestion.question;

  for (let i = 0; i < currentQuestion.choices.length; i++) {
    let choice = document.createElement("li");
    choice.textContent = currentQuestion.choices[i];
    choice.addEventListener("click", choiceSelection);
    choicesList.appendChild(choice);
  }

  questionHeader.appendChild(choicesList);
  questionsEl.appendChild(questionHeader);
}

function choiceSelection(e) {
  e.preventDefault();
  let userInput = e.target.textContent;

  let answerComment = document.createElement("p");
  answerComment.textContent = "";
  questionsEl.append(answerComment);

  //   check if answer is correct -- decrement score if not.
  if (userInput !== quiz[trackingIndex].answer) {
    answerComment.textContent = "Incorrect";
    if (timer - 25 <= 0) {
      timer = 0;
      gameOver();
    } else {
      timer -= 25;
    }
  }

  trackingIndex++;
  if (trackingIndex === quiz.length) {
    gameOver();
  } else {
    runQuestions();
  }

  scoreSpan.textContent = timer;
}

function gameOver() {
  clearInterval(timerInterval);
  questionsEl.hidden = true;
  endQuizEl.hidden = false;
}

function handleScoreInput(e) {
  // e.preventDefault();
  let scoreTracker = {
    score: timer,
    initials: initialInput.value,
  };
  let scoreRecording = JSON.parse(localStorage.getItem("scoreInput")) || [];
  scoreRecording.push(scoreTracker);
  localStorage.setItem("scoreInput", JSON.stringify(scoreRecording));

  initialInput.value = "";

  // window.location.assign("./highscores.html");
}

startBtn.addEventListener("click", startQuiz);
initialsForm.addEventListener("submit", handleScoreInput);
