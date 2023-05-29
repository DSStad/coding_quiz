// grab elements from index
const startQuizEl = document.querySelector(".start-quiz");
const questionsEl = document.querySelector(".questions");
const endQuizEl = document.querySelector(".end-quiz");
const startBtn = document.querySelector("#startBtn");
const scoreSpan = document.querySelector("#score");
const scoreList = document.querySelector("#scores-table");
const initialsForm = document.querySelector("#score-initials");
const initialInput = document.querySelector("#initials");

// establish hidden/showing variable for each element
startQuizEl.hidden = false;
questionsEl.hidden = true;
endQuizEl.hidden = true;

// set play clock timer/score
let timer = 75;

function startQuiz(e) {
  e.preventDefault();

  startQuizEl.hidden = true;
  questionsEl.hidden = false;

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
    timer -= 25;
  }

  trackingIndex++;
  if (trackingIndex === quiz.length) {
    questionsEl.hidden = true;
    endQuizEl.hidden = false;
  } else {
    runQuestions();
  }

  scoreSpan.textContent = timer;
}

function handleScoreInput() {
  let scoreTracker = {
    score: timer,
    initials: initialInput.value,
  };
  localStorage.setItem("scoreInput", JSON.stringify(scoreTracker));
  let scoreRecording = JSON.parse(localStorage.getItem)("scoreInput");
  let newRecord = document.createElement("tr");
  let scoreTd = document.createElement("td");
  scoreTd.textContent = scoreRecording.score;
  let initialsTd = document.createElement("td");
  initialsTd.textContent = scoreRecording.initials;

  newRecord.appendChild(scoreTd);
  newRecord.appendChild(initialsTd);
  scoreList.appendChild(newRecord);

  Location.replace("./highscores.html");
}

startBtn.addEventListener("click", startQuiz);
initialsForm.addEventListener("submit", handleScoreInput);
