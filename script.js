/* ---------------- IMAGE GENERATOR ---------------- */

const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('prompt');
const imageContainer = document.getElementById('imageContainer');
const loading = document.getElementById('loading');

function generateImage() {
  const userPrompt = promptInput.value.trim();
  if (!userPrompt) {
    alert("Please enter a prompt!");
    return;
  }

  const fullPrompt = `${userPrompt}, colonial America, 18th century, oil painting, parchment texture, quill and ink, historical scene, rustic background, warm lighting`;

  imageContainer.innerHTML = "";
  loading.style.display = "block";
  generateBtn.disabled = true;

  const seed = Date.now();
  const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(fullPrompt)}?seed=${seed}`;

  const img = document.createElement('img');
  img.src = imageUrl;

  img.onload = () => {
    loading.style.display = "none";
    generateBtn.disabled = false;
  };

  img.onerror = () => {
    loading.style.display = "none";
    generateBtn.disabled = false;
    alert("Failed to generate image.");
  };

  imageContainer.appendChild(img);
}

generateBtn.addEventListener('click', generateImage);
promptInput.addEventListener('keydown', e => {
  if (e.key === "Enter") generateImage();
});

/* ---------------- QUIZ ---------------- */

const quizData = [
  {
    question: "What year was the Declaration of Independence signed?",
    answers: ["1492", "1776", "1812", "1865"],
    correct: 1
  },
  {
    question: "Who was the first President of the United States?",
    answers: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
    correct: 2
  },
  {
    question: "What was the main reason the colonies wanted independence?",
    answers: ["High taxes", "Religious freedom", "More land", "Trade routes"],
    correct: 0
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('nextBtn');
const scoreEl = document.getElementById('score');

function loadQuestion() {
  nextBtn.classList.add("hidden");
  answersEl.innerHTML = "";

  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;

  q.answers.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = () => selectAnswer(index, btn);
    answersEl.appendChild(btn);
  });
}

function selectAnswer(index, button) {
  const correct = quizData[currentQuestion].correct;
  const buttons = answersEl.querySelectorAll("button");

  buttons.forEach(b => b.disabled = true);

  if (index === correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    buttons[correct].classList.add("correct");
  }

  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  questionEl.textContent = "Quiz Complete!";
  answersEl.innerHTML = "";
  nextBtn.classList.add("hidden");
  scoreEl.textContent = `You scored ${score} / ${quizData.length}`;
  scoreEl.classList.remove("hidden");
}

loadQuestion();
