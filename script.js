/* Cursor Glow */
const glow = document.getElementById("cursorGlow");
document.addEventListener("mousemove", e => {
  glow.style.top = e.clientY + "px";
  glow.style.left = e.clientX + "px";
});

/* TEXT TO IMAGE */
generateBtn.onclick = () => {
  if (!prompt.value.trim()) return alert("Enter a prompt");

  loading.classList.remove("hidden");
  imageContainer.innerHTML = "";

  const img = new Image();
  img.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    prompt.value + ", colonial America, 18th century"
  )}?seed=${Date.now()}`;

  img.onload = () => loading.classList.add("hidden");
  imageContainer.appendChild(img);
};

/* AVATAR */
generateAvatarBtn.onclick = () => {
  avatarLoading.classList.remove("hidden");
  avatarContainer.innerHTML = "";

  const promptText =
    `A smiling ${ageSelect.value} ${raceSelect.value} colonial student ` +
    `wearing ${outfitSelect.value}, with ${hatSelect.value}, holding ${accessorySelect.value}, ` +
    `standing in a ${backgroundSelect.value}, oil painting, 18th century`;

  const img = new Image();
  img.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?seed=${Date.now()}`;
  img.onload = () => avatarLoading.classList.add("hidden");

  avatarContainer.appendChild(img);
};

/* QUIZ */
const quizData = [
  {q:"What year was the Declaration signed?",a:["1775","1776","1781","1800"],c:1},
  {q:"Who wrote most of it?",a:["Washington","Franklin","Jefferson","Adams"],c:2},
  {q:"First US President?",a:["Adams","Jefferson","Washington","Madison"],c:2},
  {q:"Independence from?",a:["France","Spain","Britain","Portugal"],c:2},
  {q:"War fought?",a:["Civil War","Revolutionary War","1812","Indian War"],c:1},
  {q:"Signed in which city?",a:["NY","Boston","Philadelphia","DC"],c:2},
  {q:"King of Britain?",a:["George III","Henry VIII","Charles I","William"],c:0},
  {q:"Treaty that ended war?",a:["Paris","Versailles","Ghent","Union"],c:0},
  {q:"Group who wrote it?",a:["Congress","Senate","Court","Parliament"],c:0},
  {q:"Opening phrase?",a:["We the people","Four score","Give me liberty","When in the course"],c:3}
];

let current = 0, score = 0, selected = null;

function loadQuestion() {
  selected = null;
  submitBtn.disabled = true;
  nextBtn.classList.add("hidden");
  answers.innerHTML = "";
  progressBar.style.background = "rgba(255,140,0,0.8)";
  progressBar.style.width = ((current+1)/quizData.length)*100 + "%";

  question.textContent = quizData[current].q;

  quizData[current].a.forEach((t,i)=>{
    const b=document.createElement("button");
    b.textContent=t;
    b.onclick=()=>{selected=i;submitBtn.disabled=false};
    answers.appendChild(b);
  });
}

submitBtn.onclick = () => {
  const correct = quizData[current].c;
  const pct = ((current+1)/quizData.length)*100;

  if (selected === correct) {
    score++;
    progressBar.style.background =
      `linear-gradient(to right, green ${pct}%, rgba(255,255,255,0.15) ${pct}%)`;
    correctSound.play();
  } else {
    progressBar.style.background =
      `linear-gradient(to right, darkred ${pct}%, rgba(255,255,255,0.15) ${pct}%)`;
    wrongSound.play();
  }

  nextBtn.classList.remove("hidden");
  submitBtn.disabled = true;
};

nextBtn.onclick = () => {
  current++;
  if (current < quizData.length) loadQuestion();
  else {
    question.textContent = "Quiz Complete!";
    answers.innerHTML = "";
    score.textContent = `Score: ${score}/${quizData.length}`;
    score.classList.remove("hidden");
    completeSound.play();
  }
};

loadQuestion();
