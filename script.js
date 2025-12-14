// ===== Cursor Glow =====
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.top = e.clientY + 'px';
  cursorGlow.style.left = e.clientX + 'px';
});

// ===== Image Generator (placeholder) =====
const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('promptInput');
const imageContainer = document.getElementById('imageContainer');
const loadingText = document.getElementById('loadingText');

generateBtn.addEventListener('click', () => {
  const prompt = promptInput.value.trim();
  if (!prompt) return alert('Enter a colonial scene!');
  
  loadingText.classList.remove('hidden');
  loadingText.textContent = 'Generating...';
  
  setTimeout(() => {
    loadingText.classList.add('hidden');
    imageContainer.innerHTML = `<img src="https://via.placeholder.com/500x300?text=${encodeURIComponent(prompt)}" alt="Generated Image">`;
  }, 1500); // simulate delay
});

// ===== Avatar Generator (placeholder) =====
const generateAvatarBtn = document.getElementById('generateAvatarBtn');
const avatarContainer = document.getElementById('avatarContainer');
const avatarLoading = document.getElementById('avatarLoading');

generateAvatarBtn.addEventListener('click', () => {
  avatarLoading.classList.remove('hidden');
  avatarLoading.textContent = 'Generating Avatar...';
  
  const gender = document.getElementById('genderSelect').value;
  const background = document.getElementById('backgroundSelect').value;
  const outfit = document.getElementById('outfitSelect').value;
  const hat = document.getElementById('hatSelect').value;
  const accessory = document.getElementById('accessorySelect').value;
  const hair = document.getElementById('hairSelect').value;
  const age = document.getElementById('ageSelect').value;
  const race = document.getElementById('raceSelect').value;
  
  setTimeout(() => {
    avatarLoading.classList.add('hidden');
    avatarContainer.innerHTML = `
      <div style="padding:20px; border:2px solid #4b2e2a; border-radius:12px; background:#f5e6dc;">
        <h3>Avatar Preview</h3>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Background:</strong> ${background}</p>
        <p><strong>Outfit:</strong> ${outfit}</p>
        <p><strong>Hat:</strong> ${hat}</p>
        <p><strong>Accessory:</strong> ${accessory}</p>
        <p><strong>Hair:</strong> ${hair}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Heritage:</strong> ${race}</p>
      </div>
    `;
  }, 1500); // simulate delay
});

// ===== Quiz Logic =====
const quizData = [
  {
    question: "In which year was the Declaration of Independence signed?",
    options: ["1775", "1776", "1777", "1781"],
    answer: "1776"
  },
  {
    question: "Who was the commander of the Continental Army?",
    options: ["Thomas Jefferson", "Benjamin Franklin", "George Washington", "John Adams"],
    answer: "George Washington"
  },
  {
    question: "Which document ended the Revolutionary War?",
    options: ["Bill of Rights", "Treaty of Paris", "Articles of Confederation", "Constitution"],
    answer: "Treaty of Paris"
  }
];

let currentQuestion = 0;
let score = 0;

// DOM Elements
const progressContainer = document.getElementById('progressContainer');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const submitBtn = document.getElementById('submitBtn');
const nextBtn = document.getElementById('nextBtn');
const scoreEl = document.getElementById('score');
const takeAgainBtn = document.getElementById('takeAgainBtn');

// Initialize Progress Bar
function initProgress() {
  progressContainer.innerHTML = '';
  quizData.forEach(() => {
    const seg = document.createElement('div');
    seg.classList.add('progress-segment');
    progressContainer.appendChild(seg);
  });
}

// Load Question
function loadQuestion() {
  submitBtn.disabled = true;
  nextBtn.classList.add('hidden');
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = '';
  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.addEventListener('click', () => {
      document.querySelectorAll('#answers button').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      submitBtn.disabled = false;
    });
    answersEl.appendChild(btn);
  });
}

// Update Progress
function updateProgress() {
  const segments = document.querySelectorAll('.progress-segment');
  segments.forEach((seg, index) => {
    if (index < currentQuestion) seg.style.background = '#4CAF50';
    else seg.style.background = 'rgba(255,255,255,0.15)';
  });
}

// Submit Answer
submitBtn.addEventListener('click', () => {
  const selected = document.querySelector('#answers button.selected');
  if (!selected) return;

  const correct = quizData[currentQuestion].answer;
  if (selected.textContent === correct) {
    selected.classList.add('correct');
    score++;
  } else {
    selected.classList.add('wrong');
    // highlight correct
    Array.from(document.querySelectorAll('#answers button')).forEach(btn => {
      if (btn.textContent === correct) btn.classList.add('correct');
    });
  }

  // Show next button at same place as submit
  submitBtn.classList.add('hidden');
  nextBtn.classList.remove('hidden');

  updateProgress();
});

// Next Question
nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion >= quizData.length) {
    showScore();
    return;
  }
  submitBtn.classList.remove('hidden');
  nextBtn.classList.add('hidden');
  loadQuestion();
});

// Show Final Score
function showScore() {
  questionEl.textContent = 'Quiz Completed!';
  answersEl.innerHTML = '';
  submitBtn.classList.add('hidden');
  nextBtn.classList.add('hidden');
  scoreEl.textContent = `Your Score: ${score} / ${quizData.length}`;
  scoreEl.classList.remove('hidden');
  takeAgainBtn.classList.remove('hidden');
}

// Restart Quiz
takeAgainBtn.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  scoreEl.classList.add('hidden');
  takeAgainBtn.classList.add('hidden');
  submitBtn.classList.remove('hidden');
  loadQuestion();
  initProgress();
});

// Initialize
initProgress();
loadQuestion();
