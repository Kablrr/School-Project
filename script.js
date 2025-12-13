/* Cursor Glow */
const cursorGlow = document.getElementById("cursorGlow");
document.addEventListener("mousemove", e => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
});

/* ---------------- Text-to-Image Generator ---------------- */
const generateBtn = document.getElementById("generateBtn");
const promptInput = document.getElementById("prompt");
const imageContainer = document.getElementById("imageContainer");
const loading = document.getElementById("loading");

generateBtn.addEventListener("click", () => {
  const text = promptInput.value.trim();
  if (!text) return alert("Enter a prompt!");
  
  const prompt = `${text}, colonial America, 18th century, oil painting, historical lighting`;
  imageContainer.innerHTML = "";
  loading.style.display = "block";
  generateBtn.disabled = true;

  const img = document.createElement("img");
  img.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${Date.now()}`;
  
  img.onload = () => { loading.style.display = "none"; generateBtn.disabled = false; };
  img.onerror = () => { loading.style.display = "none"; generateBtn.disabled = false; alert("Image failed to load."); };
  
  imageContainer.appendChild(img);
});

/* ---------------- Customizable Avatar Generator ---------------- */
const avatarBtn = document.getElementById("generateAvatar");
const avatarContainer = document.getElementById("avatarPreview");

avatarBtn.addEventListener("click", () => {
  const outfit = document.getElementById("outfitSelect").value;
  const background = document.getElementById("backgroundSelect").value;
  const props = document.getElementById("propsSelect").value;

  const prompt = `A student in 1776 wearing ${outfit}, ${props}, background ${background}, 18th century painting, historical style`;

  avatarContainer.innerHTML = "";
  const img = document.createElement("img");
  img.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${Date.now()}`;

  img.onerror = () => alert("Failed to generate avatar.");
  avatarContainer.appendChild(img);
});

/* ---------------- Quiz ---------------- */
const quizData = [
  { q:"What year was the Declaration of Independence signed?", a:["1775","1776","1781","1800"], c:1 },
  { q:"Who wrote most of the Declaration of Independence?", a:["Washington","Franklin","Jefferson","Adams"], c:2 },
  { q:"Who was the first President of the United States?", a:["Adams","Jefferson","Washington","Madison"], c:2 },
  // Add the rest of your 20 questions here
];

let current=0, score=0, selectedAnswer=null;
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const submitBtnEl = document.getElementById("submitBtn");
const nextBtnEl = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");
const gradeEl = document.getElementById("grade");
const progressBar = document.getElementById("progressBar");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const completeSound = document.getElementById("completeSound");

function loadQuestion(){
  selectedAnswer = null;
  submitBtnEl.disabled = true;
  submitBtnEl.classList.remove("hidden");
  nextBtnEl.classList.add("hidden");
  gradeEl.classList.add("hidden");
  scoreEl.classList.add("hidden");

  answersEl.innerHTML = "";
  const q = quizData[current];
  questionEl.textContent = q.q;
  progressBar.style.width = ((current + 1)/quizData.length)*100 + "%";

  q.a.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = () => {
      [...answersEl.children].forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedAnswer = i;
      submitBtnEl.disabled = false;
    };
    answersEl.appendChild(btn);
  });
}

submitBtnEl.onclick = () => {
  if(selectedAnswer === null) return;

  const correct = quizData[current].c;
  [...answersEl.children].forEach(b => b.disabled = true);

  if(selectedAnswer === correct){
    answersEl.children[selectedAnswer].classList.add("correct");
    correctSound.currentTime = 0;
    correctSound.play();
    score++;
  } else {
    answersEl.children[selectedAnswer].classList.add("wrong");
    answersEl.children[correct].classList.add("correct");
    wrongSound.currentTime = 0;
    wrongSound.play();
  }

  submitBtnEl.classList.add("hidden");
  nextBtnEl.classList.remove("hidden");
};

nextBtnEl.onclick = () => {
  current++;
  if(current < quizData.length) loadQuestion();
  else finishQuiz();
};

function finishQuiz(){
  questionEl.textContent = "Quiz Complete!";
  answersEl.innerHTML = "";
  nextBtnEl.classList.add("hidden");
  scoreEl.textContent = `Score: ${score} / ${quizData.length}`;
  scoreEl.classList.remove("hidden");

  const pct = (score/quizData.length)*100;
  let grade = "";
  if(pct >= 90) grade = "A";
  else if(pct >= 80) grade = "B";
  else if(pct >= 70) grade = "C";
  else if(pct >= 60) grade = "D";
  else grade = "F";

  gradeEl.textContent = `Grade: ${grade}`;
  gradeEl.classList.remove("hidden");
  progressBar.style.width = "100%";
  completeSound.play();
}

// Initialize first question
loadQuestion();
