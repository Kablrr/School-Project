/* Cursor Glow */
const cursorGlow = document.getElementById("cursorGlow");
document.addEventListener("mousemove", e => {
  cursorGlow.style.top = e.clientY + "px";
  cursorGlow.style.left = e.clientX + "px";
});

/* Text-to-Image Generator */
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

/* Avatar Generator */
const generateAvatarBtn = document.getElementById("generateAvatarBtn");
const avatarContainer = document.getElementById("avatarContainer");
const avatarLoading = document.getElementById("avatarLoading");
const backgroundSelect = document.getElementById("backgroundSelect");
const outfitSelect = document.getElementById("outfitSelect");
const hatSelect = document.getElementById("hatSelect");
const accessorySelect = document.getElementById("accessorySelect");

generateAvatarBtn.addEventListener("click", () => {
  const prompt = `A colonial student wearing ${outfitSelect.value}, with ${hatSelect.value}, holding ${accessorySelect.value}, standing in a ${backgroundSelect.value}, oil painting, 18th century`;
  avatarContainer.innerHTML = "";
  avatarLoading.style.display = "block";
  generateAvatarBtn.disabled = true;

  const img = document.createElement("img");
  img.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${Date.now()}`;
  img.onload = () => { avatarLoading.style.display = "none"; generateAvatarBtn.disabled = false; };
  img.onerror = () => { avatarLoading.style.display = "none"; generateAvatarBtn.disabled = false; alert("Avatar failed to load."); };

  avatarContainer.appendChild(img);
});

/* Quiz */
const quizData = [
  {q:"What year was the Declaration of Independence signed?", a:["1775","1776","1781","1800"], c:1},
  {q:"Who wrote most of the Declaration of Independence?", a:["Washington","Franklin","Jefferson","Adams"], c:2},
  {q:"Who was the first President of the United States?", a:["Adams","Jefferson","Washington","Madison"], c:2},
  {q:"Which country did the colonies gain independence from?", a:["France","Spain","Britain","Portugal"], c:2},
  {q:"What war led to American independence?", a:["Civil War","French & Indian War","Revolutionary War","War of 1812"], c:2}
];

let current=0, score=0, selected=null;
const questionEl=document.getElementById("question");
const answersEl=document.getElementById("answers");
const submitBtn=document.getElementById("submitBtn");
const nextBtn=document.getElementById("nextBtn");
const progressBar=document.getElementById("progressBar");
const scoreEl=document.getElementById("score");
const gradeEl=document.getElementById("grade");
const correctSound=document.getElementById("correctSound");
const wrongSound=document.getElementById("wrongSound");
const completeSound=document.getElementById("completeSound");

function loadQuestion(){
  selected=null;
  submitBtn.disabled=true;
  submitBtn.classList.remove("hidden");
  nextBtn.classList.add("hidden");
  answersEl.innerHTML="";
  scoreEl.classList.add("hidden");
  gradeEl.classList.add("hidden");

  const q = quizData[current];
  questionEl.textContent = q.q;
  progressBar.style.width = ((current+1)/quizData.length)*100 + "%";

  q.a.forEach((text,i)=>{
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = ()=>{
      [...answersEl.children].forEach(b=>b.classList.remove("selected"));
      btn.classList.add("selected");
      selected=i;
      submitBtn.disabled=false;
    };
    answersEl.appendChild(btn);
  });
}

submitBtn.onclick = () => {
  if(selected===null) return;
  const correct=quizData[current].c;
  [...answersEl.children].forEach(b=>b.disabled=true);

  if(selected===correct){
    answersEl.children[selected].classList.add("correct");
    correctSound.play();
    score++;
  } else {
    answersEl.children[selected].classList.add("wrong");
    answersEl.children[correct].classList.add("correct");
    wrongSound.play();
  }
  submitBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");
};

nextBtn.onclick = () => {
  current++;
  if(current<quizData.length) loadQuestion();
  else finishQuiz();
};

function finishQuiz(){
  questionEl.textContent="Quiz Complete!";
  answersEl.innerHTML="";
  nextBtn.classList.add("hidden");
  scoreEl.textContent=`Score: ${score} / ${quizData.length}`;
  scoreEl.classList.remove("hidden");

  const pct = (score/quizData.length)*100;
  let grade="";
  if(pct>=90) grade="A";
  else if(pct>=80) grade="B";
  else if(pct>=70) grade="C";
  else if(pct>=60) grade="D";
  else grade="F";
  gradeEl.textContent = `Grade: ${grade}`;
  gradeEl.classList.remove("hidden");
  progressBar.style.width="100%";
  completeSound.play();
}

loadQuestion();
