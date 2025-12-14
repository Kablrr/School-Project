/* FORCE HIDE LOADING TEXT ON PAGE LOAD */
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

/* TEXT TO IMAGE GENERATOR */
const generateBtn = document.getElementById("generateBtn");
const promptInput = document.getElementById("promptInput");
const imageContainer = document.getElementById("imageContainer");
const loadingText = document.getElementById("loadingText");

let currentImage = null;

function createDownloadButton(img) {
  const btn = document.createElement("button");
  btn.textContent = "Download Image";
  btn.style.display = "block";
  btn.style.margin = "10px auto 0";
  btn.onclick = () => {
    const a = document.createElement("a");
    a.href = img.src;
    a.download = "colonial_scene.png";
    a.click();
  };
  return btn;
}

generateBtn.onclick = () => {
  const promptValue = promptInput.value.trim();
  if (!promptValue) return alert("Enter a prompt");

  if (currentImage) {
    currentImage.onload = null;
    currentImage.onerror = null;
    imageContainer.innerHTML = "";
    currentImage = null;
  }

  loadingText.innerHTML = `<div class="spinner"></div>`;
  loadingText.classList.remove("hidden");

  const prompt = `${promptValue}, colonial America, 18th century`;

  const img = new Image();
  currentImage = img;
  img.style.opacity = "0";
  img.style.transition = "opacity 0.5s ease-in-out";
  img.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${Date.now()}`;
  imageContainer.appendChild(img);

  img.onload = () => {
    loadingText.classList.add("hidden");
    img.style.opacity = "1";
    imageContainer.appendChild(createDownloadButton(img));
  };

  img.onerror = () => {
    loadingText.classList.add("hidden");
    alert("Failed to load image. Try again.");
  };
};

/* AVATAR GENERATOR */
const generateAvatarBtn = document.getElementById("generateAvatarBtn");
const avatarContainer = document.getElementById("avatarContainer");
const avatarLoading = document.getElementById("avatarLoading");

const genderSelect = document.getElementById("genderSelect");
const backgroundSelect = document.getElementById("backgroundSelect");
const outfitSelect = document.getElementById("outfitSelect");
const hatSelect = document.getElementById("hatSelect");
const accessorySelect = document.getElementById("accessorySelect");
const hairSelect = document.getElementById("hairSelect");
const ageSelect = document.getElementById("ageSelect");
const raceSelect = document.getElementById("raceSelect");

let currentAvatar = null;

generateAvatarBtn.onclick = () => {
  generateAvatarBtn.disabled = true;

  if (currentAvatar) {
    currentAvatar.onload = null;
    currentAvatar.onerror = null;
    avatarContainer.innerHTML = "";
    currentAvatar = null;
  }

  avatarLoading.innerHTML = `<div class="spinner"></div>`;
  avatarLoading.classList.remove("hidden");

  const prompt =
    `A ${genderSelect.value} ${ageSelect.value} ${raceSelect.value} colonial student with a subtle smile, ` +
    `wearing ${outfitSelect.value}, ${hatSelect.value}, holding ${accessorySelect.value}, ` +
    `with ${hairSelect.value} hair, standing in a ${backgroundSelect.value}, oil painting, soft lighting, warm tones`;

  const img = new Image();
  currentAvatar = img;
  img.style.opacity = "0";
  img.style.transition = "opacity 0.5s ease-in-out";
  img.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${Date.now()}`;
  avatarContainer.appendChild(img);

  img.onload = () => {
    avatarLoading.classList.add("hidden");
    avatarLoading.innerHTML = "";
    img.style.opacity = "1";
    generateAvatarBtn.disabled = false;
    avatarContainer.appendChild(createDownloadButton(img));
  };

  img.onerror = () => {
    avatarLoading.classList.add("hidden");
    avatarLoading.innerHTML = "";
    generateAvatarBtn.disabled = false;
    avatarContainer.innerHTML = "Failed to load avatar.";
  };
};

/* QUIZ */
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

// Quiz sounds
const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");
const completeSound = new Audio("complete.mp3");
let currentSound = null;

function createProgressBar() {
  progressContainer.innerHTML = "";
  quizData.forEach(() => {
    const seg = document.createElement("div");
    seg.classList.add("progress-segment");
    progressContainer.appendChild(seg);
  });
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

// SHUFFLE ARRAY UTILITY
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function loadQuestion() {
  selected = null;
  submitBtn.disabled = true;
  submitBtn.classList.remove("hidden");
  nextBtn.classList.add("hidden");
  takeAgainBtn.classList.add("hidden");

  answersEl.innerHTML = "";
  questionEl.textContent = quizData[current].q;

  // Create answer objects with original index
  const answers = quizData[current].a.map((text, i) => ({ text, index: i }));
  shuffleArray(answers);

  answers.forEach(obj => {
    const btn = document.createElement("button");
    btn.textContent = obj.text;
    btn.onclick = () => {
      selected = obj.index; // store original index
      submitBtn.disabled = false;
      Array.from(answersEl.children).forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    };
    answersEl.appendChild(btn);
  });

  updateProgressBar();
}

submitBtn.onclick = () => {
  if (selected === null) return;

  const correct = quizData[current].c;
  results.push(selected === correct);

  if (currentSound) currentSound.pause();

  if (selected === correct) {
    score++;
    currentSound = correctSound.cloneNode();
  } else {
    currentSound = wrongSound.cloneNode();
  }
  currentSound.play();

  // Highlight answers
  Array.from(answersEl.children).forEach(btn => {
    const btnText = btn.textContent;
    if (btnText === quizData[current].a[correct]) btn.classList.add("correct");
    if (btnText === quizData[current].a[selected] && selected !== correct) btn.classList.add("wrong");
  });

  submitBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");
  updateProgressBar();
};

nextBtn.onclick = () => {
  current++;
  if (current < quizData.length) loadQuestion();
  else finishQuiz();
};

function finishQuiz() {
  questionEl.textContent = "Quiz Complete!";
  answersEl.innerHTML = "";
  submitBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");
  takeAgainBtn.classList.remove("hidden");
  scoreEl.textContent = `Score: ${score}/${quizData.length}`;
  scoreEl.classList.remove("hidden");

  if (currentSound) currentSound.pause();
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

// Initialize
createProgressBar();
loadQuestion();
