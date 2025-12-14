// ===== Quiz Data =====
const quizData = [
  {
    question: "Who wrote the Declaration of Independence?",
    answers: ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "John Adams"],
    correct: 1
  },
  {
    question: "In which year was the Declaration of Independence signed?",
    answers: ["1775", "1776", "1777", "1781"],
    correct: 1
  },
  {
    question: "Which country helped the Americans in the Revolutionary War?",
    answers: ["France", "Spain", "Germany", "Netherlands"],
    correct: 0
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// ===== DOM Elements =====
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const takeAgainBtn = document.getElementById("takeAgainBtn");
const scoreEl = document.getElementById("score");
const progressContainer = document.getElementById("progressContainer");

// ===== Initialize Progress Bar =====
function createProgressBar() {
  progressContainer.innerHTML = "";
  for (let i = 0; i < quizData.length; i++) {
    const seg = document.createElement("div");
    seg.classList.add("progress-segment");
    progressContainer.appendChild(seg);
  }
}

function updateProgressBar() {
  const segments = document.querySelectorAll(".progress-segment");
  segments.forEach((seg, index) => {
    seg.style.background = index <= currentQuestion ? "#4CAF50" : "rgba(255,255,255,0.15)";
  });
}

// ===== Load Question =====
function loadQuestion() {
  selectedAnswer = null;
  submitBtn.disabled = true;
  nextBtn.classList.add("hidden");
  submitBtn.classList.remove("hidden");

  const current = quizData[currentQuestion];
  questionEl.textContent = current.question;

  answersEl.innerHTML = "";
  current.answers.forEach((ans, idx) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.addEventListener("click", () => selectAnswer(idx, btn));
    answersEl.appendChild(btn);
  });

  updateProgressBar();
}

// ===== Select Answer =====
function selectAnswer(idx, btn) {
  selectedAnswer = idx;

  // Clear previous selections
  const buttons = answersEl.querySelectorAll("button");
  buttons.forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");

  submitBtn.disabled = false;
}

// ===== Submit Answer =====
submitBtn.addEventListener("click", () => {
  const current = quizData[currentQuestion];
  const buttons = answersEl.querySelectorAll("button");

  buttons.forEach((b, idx) => {
    if (idx === current.correct) b.classList.add("correct");
    if (idx === selectedAnswer && idx !== current.correct) b.classList.add("wrong");
  });

  if (selectedAnswer === current.correct) score++;

  // Hide submit, show next at the same position
  submitBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");
});

// ===== Next Question =====
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

// ===== Show Score =====
function showScore() {
  questionEl.textContent = "Quiz Completed!";
  answersEl.innerHTML = "";
  submitBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");
  scoreEl.textContent = `You scored ${score} / ${quizData.length}`;
  scoreEl.classList.remove("hidden");
  takeAgainBtn.classList.remove("hidden");

  // Reset progress bar
  updateProgressBar();
}

// ===== Take Again =====
takeAgainBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  scoreEl.classList.add("hidden");
  takeAgainBtn.classList.add("hidden");
  loadQuestion();
});

// ===== Initialize =====
createProgressBar();
loadQuestion();
