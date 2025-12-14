const questions = [
  { question: "Who wrote the Declaration of Independence?", answers: ["George Washington","Thomas Jefferson","Benjamin Franklin","John Adams"], correct: 1 },
  { question: "In which year was the Declaration signed?", answers: ["1775","1776","1781","1789"], correct: 1 },
  { question: "Which colony was first to declare independence?", answers: ["Virginia","Massachusetts","New York","Rhode Island"], correct: 3 }
];

let currentQuestion = 0;
let score = 0;
let selectedIndex = null;

const progressContainer = document.getElementById('progressContainer');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const submitBtn = document.getElementById('submitBtn');
const nextBtn = document.getElementById('nextBtn');
const scoreEl = document.getElementById('score');
const takeAgainBtn = document.getElementById('takeAgainBtn');

function initProgress() {
  progressContainer.innerHTML = '';
  for (let i=0; i<questions.length; i++){
    const div = document.createElement('div');
    div.className = 'progress-segment';
    progressContainer.appendChild(div);
  }
}

function loadQuestion() {
  selectedIndex = null;
  submitBtn.disabled = true;
  nextBtn.classList.add('hidden');
  submitBtn.classList.remove('hidden');

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = '';
  q.answers.forEach((ans, idx) => {
    const btn = document.createElement('button');
    btn.textContent = ans;
    btn.addEventListener('click', () => {
      selectedIndex = idx;
      document.querySelectorAll('#answers button').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      submitBtn.disabled = false;
    });
    answersEl.appendChild(btn);
  });
}

submitBtn.addEventListener('click', () => {
  const correctIndex = questions[currentQuestion].correct;
  const buttons = document.querySelectorAll('#answers button');

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if(idx === correctIndex) btn.classList.add('correct');
    if(idx === selectedIndex && idx !== correctIndex) btn.classList.add('wrong');
  });

  if(selectedIndex === correctIndex) score++;
  progressContainer.children[currentQuestion].style.background = '#4CAF50';

  submitBtn.classList.add('hidden');
  nextBtn.classList.remove('hidden');
});

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if(currentQuestion < questions.length){
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore(){
  questionEl.textContent = 'Quiz Completed!';
  answersEl.innerHTML = '';
  submitBtn.classList.add('hidden');
  nextBtn.classList.add('hidden');
  scoreEl.textContent = `Your Score: ${score} / ${questions.length}`;
  scoreEl.classList.remove('hidden');
  takeAgainBtn.classList.remove('hidden');
}

takeAgainBtn.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  scoreEl.classList.add('hidden');
  takeAgainBtn.classList.add('hidden');
  initProgress();
  loadQuestion();
});

// Initialize
initProgress();
loadQuestion();
