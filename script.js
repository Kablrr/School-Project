/* IMAGE GENERATOR */
const generateBtn = document.getElementById("generateBtn");
const promptInput = document.getElementById("prompt");
const imageContainer = document.getElementById("imageContainer");
const loading = document.getElementById("loading");

generateBtn.onclick = () => {
  const text = promptInput.value.trim();
  if (!text) return alert("Enter a prompt!");

  const prompt = `${text}, colonial America, 18th century, oil painting, parchment texture, historical lighting`;
  imageContainer.innerHTML = "";
  loading.style.display = "block";
  generateBtn.disabled = true;

  const img = document.createElement("img");
  img.src = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?seed=${Date.now()}`;

  img.onload = () => {
    loading.style.display = "none";
    generateBtn.disabled = false;
  };

  img.onerror = () => {
    loading.style.display = "none";
    generateBtn.disabled = false;
    alert("Image failed to load.");
  };

  imageContainer.appendChild(img);
};

/* QUIZ */
const quizData = [
  { q: "What year was the Declaration of Independence signed?", a: ["1775","1776","1781","1800"], c: 1 },
  { q: "Who wrote most of the Declaration of Independence?", a: ["Washington","Franklin","Jefferson","Adams"], c: 2 },
  { q: "Who was the first U.S. President?", a: ["Adams","Jefferson","Washington","Hamilton"], c: 2 },
  { q: "Which country did the colonies gain independence from?", a: ["France","Spain","Britain","Portugal"], c: 2 },
  { q: "What document came before the Constitution?", a: ["Bill of Rights","Articles of Confederation","Magna Carta","Treaty of Paris"], c: 1 },
  { q: "What was the main colonial complaint?", a: ["Low wages","Taxation","Religion","Land"], c: 1 },
  { q: "Which war led to independence?", a: ["Civil War","French War","Revolutionary War","1812"], c: 2 },
  { q: "Who was known for the midnight ride?", a: ["Revere","Franklin","Hancock","Adams"], c: 0 },
  { q: "What was the capital during the Revolution?", a: ["NYC","Boston","Philadelphia","DC"], c: 2 },
  { q: "What slogan summarized colonial anger?", a: ["Freedom First","No taxation without representation","Liberty Now","Justice for All"], c: 1 },
  { q: "Who helped America militarily?", a: ["Spain","France","Germany","Italy"], c: 1 },
  { q: "What was the Boston Tea Party about?", a: ["Trade","Tea tax","Land","Religion"], c: 1 },
  { q: "Who was King of England?", a: ["George III","Henry VIII","Charles II","Edward VI"], c: 0 },
  { q: "What city was a major port?", a: ["Salem","Dallas","Denver","Miami"], c: 0 },
  { q: "What system replaced monarchy?", a: ["Empire","Democracy","Oligarchy","Dictatorship"], c: 1 },
  { q: "Who was a famous inventor?", a: ["Hamilton","Franklin","Adams","Madison"], c: 1 },
  { q: "What document guarantees freedoms?", a: ["Constitution","Treaty","Bill of Rights","Proclamation"], c: 2 },
  { q: "Who was a Patriot leader?", a: ["Benedict Arnold","Washington","Cornwallis","Howe"], c: 1 },
  { q: "What ended the war?", a: ["Treaty of Paris","Constitution","Declaration","Articles"], c: 0 },
  { q: "What year did the war end?", a: ["1776","1781","1783","1790"], c: 2 }
];

let index = 0, score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");
const progressBar = document.getElementById("progressBar");

function loadQuestion() {
  answersEl.innerHTML = "";
  nextBtn.classList.add("hidden");

  const q = quizData[index];
  questionEl.textContent = q.q;
  progressBar.style.width = `${(index / quizData.length) * 100}%`;

  q.a.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = () => selectAnswer(i, btn);
    answersEl.appendChild(btn);
  });
}

function selectAnswer(i, btn) {
  const correct = quizData[index].c;
  [...answersEl.children].forEach(b => b.disabled = true);

  if (i === correct) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    answersEl.children[correct].classList.add("correct");
  }

  nextBtn.classList.remove("hidden");
}

nextBtn.onclick = () => {
  index++;
  if (index < quizData.length) loadQuestion();
  else {
    questionEl.textContent = "Quiz Complete!";
    answersEl.innerHTML = "";
    progressBar.style.width = "100%";
    scoreEl.textContent = `Score: ${score} / ${quizData.length}`;
    scoreEl.classList.remove("hidden");
    nextBtn.classList.add("hidden");
  }
};

loadQuestion();


loadQuestion();
