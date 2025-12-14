// ===== Cursor Glow =====
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  cursorGlow.style.top = e.clientY + 'px';
  cursorGlow.style.left = e.clientX + 'px';
});

// ===== Image Generator (stub example) =====
const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('promptInput');
const imageContainer = document.getElementById('imageContainer');
const loadingText = document.getElementById('loadingText');

generateBtn.addEventListener('click', () => {
  const prompt = promptInput.value.trim();
  if (!prompt) return alert("Enter a prompt!");

  loadingText.classList.remove('hidden');
  loadingText.textContent = 'Generating...';
  imageContainer.innerHTML = '';

  // Simulate image generation
  setTimeout(() => {
    const img = document.createElement('img');
    img.src = 'https://via.placeholder.com/400x300?text=Generated+Image';
    img.alt = prompt;
    img.style.border = "2px solid #4b2e2a";
    img.style.borderRadius = "12px";
    imageContainer.appendChild(img);
    loadingText.classList.add('hidden');
  }, 1500);
});

// ===== Avatar Generator =====
const generateAvatarBtn = document.getElementById('generateAvatarBtn');
const avatarContainer = document.getElementById('avatarContainer');
const avatarLoading = document.getElementById('avatarLoading');

generateAvatarBtn.addEventListener('click', () => {
  avatarLoading.classList.remove('hidden');
  avatarLoading.textContent = 'Generating Avatar...';
  avatarContainer.innerHTML = '';

  const gender = document.getElementById('genderSelect').value;
  const background = document.getElementById('backgroundSelect').value;
  const outfit = document.getElementById('outfitSelect').value;
  const hat = document.getElementById('hatSelect').value;
  const accessory = document.getElementById('accessorySelect').value;
  const hair = document.getElementById('hairSelect').value;
  const age = document.getElementById('ageSelect').value;
  const race = document.getElementById('raceSelect').value;

  // Simulate avatar generation
  setTimeout(() => {
    const img = document.createElement('img');
    img.src = 'https://via.placeholder.com/300x400?text=Avatar';
    img.alt = `${gender}, ${age}, ${race}`;
    img.style.border = "2px solid #4b2e2a";
    img.style.borderRadius = "12px";
    avatarContainer.appendChild(img);
    avatarLoading.classList.add('hidden');
  }, 1500);
});

// ===== Quiz =====
const questions = [
  {
    question: "Who wrote the Declaration of Independence?",
    answers: ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "John Adams"],
    correct: 1
  },
  {
    question: "In which year was the Declaration signed?",
    answers: ["1775", "1776", "1781", "1789"],
    correct: 1
  },
  {
    question: "Which colony was the first to declare independence?",
    answers: ["Virginia", "Massachusetts", "New York", "Rhode Island"],
    correct: 3
  }
];

let currentQuestion = 0;
let score = 0;
const progressContainer = document.getElementById('progressContainer');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const submitBtn = document.getElementById('submitBtn');
const nextBtn = document.getElementById('nextBtn');
const scoreEl = document.getElementById('score');
const takeAgainBtn = document.getElementById('takeAgainBtn');

// Initialize progress bar
function initProgress() {
  progressContainer.innerHTML = '';
  for (let i = 0; i < questions.length; i++) {
    const div = document.createElement('div');
    div.className = 'progress-segment';
    progressContainer.appendChild(div);
  }
}
initProgress();

// Load a question
function loadQuestion() {
  submitBtn.disabled = true;
  nextBtn.classList.add('hidden');

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = '';
  q.answers.forEach((ans, index) => {
    const btn = document.createElement('button');
    btn.textContent = ans;
    btn.addEventListener('click', () => selectAnswer(btn, index));
    answersEl.appendChild(btn);
  });
}

// Answer selection
let selectedIndex = null;
function selectAnswer(btn, index) {
  selectedIndex = index;
  document.querySelectorAll('#answers button').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  submitBtn.disabled = false;
}

// Submit button
submitBtn.addEventListener('click', () => {
  const correctIndex = questions[currentQuestion].correct;
  const buttons = document.querySelectorAll('#answers button');

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIndex) btn.classList.add('correct');
    if (idx === selectedIndex && idx !== correctIndex) btn.classList.add('wrong');
  });

  // Update score
  if (selectedIndex === correctIndex) score++;

  // Update progress bar
  progressContainer.children[currentQuestion].style.background = '#4CAF50';

  // Show Next button on top of Submit
  submitBtn.classList.add('hidden');
  nextBtn.classList.remove('hidden');
});

// Next button
nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    submitBtn.classList.remove('hidden');
    loadQuestion();
  } else {
    showScore();
  }
});

// Show final score
function showScore() {
  questionEl.textContent = 'Quiz Completed!';
  answersEl.innerHTML = '';
  submitBtn.classList.add('hidden');
  nextBtn.classList.add('hidden');
  scoreEl.textContent = `Your Score: ${score} / ${questions.length}`;
  scoreEl.classList.remove('hidden');
  takeAgainBtn.classList.remove('hidden');
}

// Take again
takeAgainBtn.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  selectedIndex = null;
  scoreEl.classList.add('hidden');
  takeAgainBtn.classList.add('hidden');
  initProgress();
  submitBtn.classList.remove('hidden');
  loadQuestion();
});

// Initial load
loadQuestion();
