/* Cursor Glow */
const cursorGlow = document.getElementById("cursorGlow");
document.addEventListener("mousemove", e => {
  cursorGlow.style.top = e.clientY + "px";
  cursorGlow.style.left = e.clientX + "px";
});

/* Hide loading texts initially */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loadingText").classList.add("hidden");
  document.getElementById("avatarLoading").classList.add("hidden");
});

/* TEXT TO IMAGE */
const generateBtn = document.getElementById("generateBtn");
const promptInput = document.getElementById("promptInput");
const imageContainer = document.getElementById("imageContainer");
const loadingText = document.getElementById("loadingText");

generateBtn.onclick = () => {
  if (!promptInput.value.trim()) return alert("Enter a prompt");
  loadingText.classList.remove("hidden");
  imageContainer.innerHTML = "";

  const img = new Image();
  img.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    promptInput.value + ", colonial America, 18th century"
  )}?seed=${Date.now()}`;

  img.onload = () => loadingText.classList.add("hidden");
  img.onerror = () => {
    loadingText.classList.add("hidden");
    alert("Failed to load image");
  };

  imageContainer.appendChild(img);
};

/* AVATAR */
const generateAvatarBtn = document.getElementById("generateAvatarBtn");
const avatarContainer = document.getElementById("avatarContainer");
const avatarLoading = document.getElementById("avatarLoading");

generateAvatarBtn.onclick = () => {
  avatarLoading.classList.remove("hidden");
  avatarContainer.innerHTML = "";

  const prompt =
    `A smiling ${ageSelect.value} ${raceSelect.value} colonial student wearing ${outfitSelect.value}, ` +
    `with ${hatSelect.value}, holding ${accessorySelect.value}, standing in a ${backgroundSelect.value}, oil painting`;

  const img = new Image();
  img.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${Date.now()}`;

  img.onload = () => avatarLoading.classList.add("hidden");
  img.onerror = () => {
    avatarLoading.classList.add("hidden");
    alert("Failed to load avatar");
  };

  avatarContainer.appendChild(img);
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
const progressContainer = document.getElementById("progressContainer");
const scoreEl = document.getElementById("score");

/* Initialize quiz progress bar */
function initProgressBar() {
  progressContainer.innerHTML = "";
  for (let i = 0; i < quizData.length; i++) {
    const seg = document.createElement("div");
    seg.classList.add("progress-segment");
    progressContainer.appendChild(seg);
  }
}

function markProgress(index, correct) {
  const segments = document.querySelectorAll(".progress-segment");
  if (segments[index]) {
    segments[index].style.background = correct ? "green" : "red";
  }
}

function loadQuestion() {
  selected = null;
  submitBtn.disabled = true;
  nextBtn.classList.add("hidden");
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
}

submitBtn.onclick = () => {
  if (selected === null) return;

  const correct = quizData[current].c;
  const isCorrect = selected === correct;
  results.push(isCorrect);
  if (isCorrect) score++;

  [...answersEl.children].forEach((b,i)=>{
    b.disabled = true;
    if (i===correct) b.classList.add("correct");
    else if (i===selected) b.classList.add("wrong");
  });

  markProgress(current, isCorrect);
  nextBtn.classList.remove("hidden");
};

nextBtn.onclick = () => {
  current++;
  if (current < quizData.length) loadQuestion();
  else {
    questionEl.textContent = "Quiz Complete!";
    answersEl.innerHTML = "";
    scoreEl.textContent = `Score: ${score}/${quizData.length}`;
    scoreEl.classList.remove("hidden");
  }
};

initProgressBar();
loadQuestion();
