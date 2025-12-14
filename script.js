/* FORCE HIDE LOADING TEXT */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loadingText").classList.add("hidden");
  document.getElementById("avatarLoading").classList.add("hidden");
});

/* CURSOR GLOW */
const cursorGlow = document.getElementById("cursorGlow");
document.addEventListener("mousemove", e => {
  cursorGlow.style.top = `${e.clientY}px`;
  cursorGlow.style.left = `${e.clientX}px`;
});

/* ==============================
   TEXT-TO-IMAGE GENERATOR
============================== */
const generateBtn = document.getElementById("generateBtn");
const promptInput = document.getElementById("promptInput");
const imageContainer = document.getElementById("imageContainer");
const loadingText = document.getElementById("loadingText");

generateBtn.onclick = () => {
  if (!promptInput.value.trim()) return alert("Enter a prompt");

  // Show spinner
  loadingText.innerHTML = `<div class="spinner"></div>`;
  loadingText.classList.remove("hidden");
  generateBtn.disabled = true;
  imageContainer.innerHTML = "";

  const prompt = `${promptInput.value}, colonial America, 18th century, historically accurate, oil painting, soft lighting, warm tones`;

  const img = new Image();
  img.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${Date.now()}`;

  img.onload = img.onerror = () => {
    // Remove spinner and re-enable button
    loadingText.classList.add("hidden");
    loadingText.innerHTML = "";
    generateBtn.disabled = false;
  };

  imageContainer.appendChild(img);
};

/* ==============================
   AVATAR GENERATOR
============================== */
const generateAvatarBtn = document.getElementById("generateAvatarBtn");
const avatarContainer = document.getElementById("avatarContainer");
const avatarLoading = document.getElementById("avatarLoading");

// Avatar dropdowns
const backgroundSelect = document.getElementById("backgroundSelect");
const outfitSelect = document.getElementById("outfitSelect");
const hatSelect = document.getElementById("hatSelect");
const accessorySelect = document.getElementById("accessorySelect");
const hairSelect = document.getElementById("hairSelect");
const ageSelect = document.getElementById("ageSelect");
const raceSelect = document.getElementById("raceSelect");

generateAvatarBtn.onclick = () => {
  // Show spinner
  avatarLoading.innerHTML = `<div class="spinner"></div>`;
  avatarLoading.classList.remove("hidden");
  generateAvatarBtn.disabled = true;
  avatarContainer.innerHTML = "";

  const prompt =
    `A ${ageSelect.value} ${raceSelect.value} colonial student with a gentle smile, ` +
    `wearing ${outfitSelect.value}, ${hatSelect.value}, holding ${accessorySelect.value}, ` +
    `with ${hairSelect.value} hair, standing in a ${backgroundSelect.value}, oil painting, realistic, soft lighting, warm colors`;

  const img = new Image();
  img.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${Date.now()}`;

  img.onload = img.onerror = () => {
    // Remove spinner and re-enable button
    avatarLoading.classList.add("hidden");
    avatarLoading.innerHTML = "";
    generateAvatarBtn.disabled = false;
  };

  avatarContainer.appendChild(img);
};

/* ==============================
   1776 QUIZ WITH SOUND EFFECTS
============================== */
const correctSound = new Audio('correct.mp3');
const wrongSound = new Audio('wrong.mp3');
const completeSound = new Audio('complete.mp3');

const quizData = [
  {q:"What year was the Declaration signed?",a:["1775","1776","1781","1800"],c:1},
  {q:"Who wrote most of it?",a:["Washington","Franklin","Jefferson","Adams"],c:2},
  {q:"First President?",a:["Adams","Jefferson","Washington","Madison"],c:2},
  {q:"Independence from?",a:["France","Spain","Britain","Portugal"],c:2},
  {q:"War fought?",a:["Civil War","Revolutionary War","1812","Indian War"],c:1},
  {q:"Signed where?",a:["Boston","NY","Philadelphia","DC"],c:2},
  {q:"British king?",a:["George III","Henry VIII","Charles I","William"],c:0},
  {q:"Treaty ended war?",a:["Paris","Ghent","Versailles","Union"],c:0},
  {q:"Who wrote it?",a:["Congress","Senate","Court","Parliament"],c:0},
  {q:"Opening phrase?",a:["We the people","Four score","Give me liberty","When in the course"],c:3}
];

let current = 0, score = 0, selected = null;
const results = [];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const takeAgainBtn = document.getElementById("takeAgainBtn");
const progressContainer = document.getElementById("progressContainer");
const scoreEl = document.getElementById("score");

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
  segments.forEach((seg, i) => {
    if (i < results.length) {
      seg.style.background = results[i] ? "#4CAF50" : "#e74c3c";
    } else {
      seg.style.background = "rgba(255,255,255,0.15)";
    }
  });
}

function loadQuestion() {
  selected = null;
  submitBtn.disabled = true;
  submitBtn.classList.remove("hidden");
  nextBtn.classList.add("hidden");
  takeAgainBtn.classList.add("hidden");
  answersEl.innerHTML = "";

  questionEl.textContent = quizData[current].q;

  quizData[current].a.forEach((t,i)=>{
    const b = document.createElement("button");
    b.textContent = t;
    b.onclick = () => {
      selected = i;
      submitBtn.disabled = false;
      [...answersEl.children].forEach(btn => btn.classList.remove("selected"));
      b.classList.add("selected");
    };
    answersEl.appendChild(b);
  });

  updateProgressBar();
}

submitBtn.onclick = () => {
  const correct = quizData[current].c;
  results.push(selected === correct);

  // Stop previous sounds
  correctSound.pause(); correctSound.currentTime = 0;
  wrongSound.pause(); wrongSound.currentTime = 0;

  if (selected === correct) {
    score++;
    correctSound.play();
  } else {
    wrongSound.play();
  }

  [...answersEl.children].forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.classList.add("correct");
    if (i === selected && i !== correct) btn.classList.add("wrong");
  });

  updateProgressBar();
  submitBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");
};

nextBtn.onclick = () => {
  current++;
  if (current < quizData.length) loadQuestion();
  else finishQuiz();
};

function finishQuiz() {
  // Stop previous sounds
  correctSound.pause(); correctSound.currentTime = 0;
  wrongSound.pause(); wrongSound.currentTime = 0;

  questionEl.textContent = "Quiz Complete!";
  answersEl.innerHTML = "";
  nextBtn.classList.add("hidden");
  submitBtn.classList.add("hidden");
  takeAgainBtn.classList.remove("hidden");
  scoreEl.textContent = `Score: ${score}/${quizData.length}`;
  scoreEl.classList.remove("hidden");

  completeSound.play();
}

takeAgainBtn.onclick = () => {
  current = 0;
  score = 0;
  results.length = 0;
  scoreEl.classList.add("hidden");
  createProgressBar();
  loadQuestion();
};

createProgressBar();
loadQuestion();
