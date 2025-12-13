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

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  selected = null;
  submitBtn.disabled = true;
  nextBtn.classList.add("hidden");
  answersEl.innerHTML = "";

  questionEl.textContent = quizData[current].q;
  progressBar.style.width = ((current+1)/quizData.length)*100 + "%";
  progressBar.style.background = "orange";

  quizData[current].a.forEach((t,i)=>{
    const b=document.createElement("button");
    b.textContent=t;
    b.onclick=()=>{selected=i;submitBtn.disabled=false};
    answersEl.appendChild(b);
  });
}

submitBtn.onclick = () => {
  const correct = quizData[current].c;
  const pct = ((current+1)/quizData.length)*100;

  progressBar.style.background =
    selected === correct
    ? `linear-gradient(to right, green ${pct}%, rgba(255,255,255,0.15) ${pct}%)`
    : `linear-gradient(to right, red ${pct}%, rgba(255,255,255,0.15) ${pct}%)`;

  if (selected === correct) score++;
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

loadQuestion();
