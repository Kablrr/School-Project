// ===== DOM Elements =====
const submitBtn = document.getElementById('submitBtn');
const nextBtn = document.getElementById('nextBtn');
const takeAgainBtn = document.getElementById('takeAgainBtn');
const answersContainer = document.getElementById('answers');
const scoreDisplay = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;

// Example questions (replace with your real questions)
const questions = [
  {
    question: "When was the Declaration of Independence signed?",
    options: ["1775", "1776", "1781", "1789"],
    correct: 1
  },
  {
    question: "Who wrote the Declaration of Independence?",
    options: ["George Washington", "Benjamin Franklin", "Thomas Jefferson", "John Adams"],
    correct: 2
  }
];

// ===== Load Question =====
function loadQuestion() {
  submitBtn.disabled = true;
  submitBtn.classList.remove('hidden');
  nextBtn.classList.add('hidden');
  answersContainer.innerHTML = "";

  if (currentQuestionIndex >= questions.length) {
    showScore();
    return;
  }

  const q = questions[currentQuestionIndex];
  document.getElementById('question').textContent = q.question;

  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.addEventListener('click', () => {
      // Deselect others
      Array.from(answersContainer.children).forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      submitBtn.disabled = false; // enable submit
    });
    answersContainer.appendChild(btn);
  });
}

// ===== Submit Answer =====
submitBtn.addEventListener('click', () => {
  const selectedBtn = answersContainer.querySelector('.selected');
  if (!selectedBtn) return;

  const q = questions[currentQuestionIndex];
  const buttons = Array.from(answersContainer.children);
  const selectedIndex = buttons.indexOf(selectedBtn);

  // Mark correct/wrong
  buttons.forEach((btn, idx) => {
    if (idx === q.correct) btn.classList.add('correct');
    if (idx === selectedIndex && idx !== q.correct) btn.classList.add('wrong');
  });

  // Update score
  if (selectedIndex === q.correct) score++;

  // Show Next button in same position as Submit
  submitBtn.classList.add('hidden');
  nextBtn.classList.remove('hidden');
});

// ===== Next Question =====
nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  loadQuestion();
});

// ===== Take Again =====
takeAgainBtn.addEventListener('click', () => {
  currentQuestionIndex = 0;
  score = 0;
  scoreDisplay.classList.add('hidden');
  takeAgainBtn.classList.add('hidden');
  loadQuestion();
});

// ===== Show Score =====
function showScore() {
  document.getElementById('question').textContent = "Quiz Completed!";
  answersContainer.innerHTML = "";
  submitBtn.classList.add('hidden');
  nextBtn.classList.add('hidden');
  scoreDisplay.textContent = `Your Score: ${score} / ${questions.length}`;
  scoreDisplay.classList.remove('hidden');
  takeAgainBtn.classList.remove('hidden');
}

// ===== Initialize Quiz =====
loadQuestion();
