/* Cursor glow */
const cursor = document.getElementById("cursorGlow");
document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});

/* Text-to-Image */
const generateBtn = document.getElementById("generateBtn");
const promptInput = document.getElementById("prompt");
const imageContainer = document.getElementById("imageContainer");
const loading = document.getElementById("loading");

generateBtn.addEventListener("click", () => {
  const text = promptInput.value.trim();
  if (!text) return alert("Enter a prompt!");
  const prompt = `${text}, colonial America, 18th century, oil painting, historical scene`;

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
const avatarBtn = document.getElementById("generateAvatarBtn");
const avatarInput = document.getElementById("avatarPrompt");
const avatarContainer = document.getElementById("avatarContainer");
const avatarLoading = document.getElementById("avatarLoading");

avatarBtn.addEventListener("click", () => {
  const text = avatarInput.value.trim();
  if (!text) return alert("Enter avatar prompt!");
  const prompt = `${text}, colonial America, 18th century, student outfit, historical portrait, oil painting`;

  avatarContainer.innerHTML = "";
  avatarLoading.style.display = "block";
  avatarBtn.disabled = true;

  const img = document.createElement("img");
  img.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${Date.now()}`;
  img.onload = () => { avatarLoading.style.display = "none"; avatarBtn.disabled = false; };
  img.onerror = () => { avatarLoading.style.display = "none"; avatarBtn.disabled = false; alert("Avatar failed to load."); };
  avatarContainer.appendChild(img);
});

/* Quiz */
const quizData = [
  { q:"What year was the Declaration of Independence signed?", a:["1775","1776","1781","1800"], c:1 },
  { q:"Who wrote most of the Declaration of Independence?", a:["Washington","Franklin","Jefferson","Adams"], c:2 },
  { q:"Who was the first President of the United States?", a:["Adams","Jefferson","Washington","Madison"], c:2 },
  { q:"Which country did the colonies gain independence from?", a:["France","Spain","Britain","Portugal"], c:2 },
  { q:"What war led to American independence?", a:["Civil War","French & Indian War","Revolutionary War","War of 1812"], c:2 },
  { q:"Who rode to warn the colonists?", a:["Revere","Franklin","Hancock","Adams"], c:0 },
  { q:"What city hosted the Continental Congress?", a:["Boston","NYC","Philadelphia","Baltimore"], c:2 },
  { q:"What came before the Constitution?", a:["Bill of Rights","Articles","Magna Carta","Treaty"], c:1 },
  { q:"What phrase summarized colonial anger?", a:["Freedom Now","No taxation without representation","Liberty Forever","Justice for All"], c:1 },
  { q:"Which European country helped militarily?", a:["Spain","Germany","France","Italy"], c:2 }
];

let current=0, score=0, selectedAnswer=null;
const questionEl=document.getElementById("question");
const answersEl=document.getElementById("answers");
const submitBtnEl=document.getElementById("submitBtn");
const nextBtnEl=document.getElementById("nextBtn");
const scoreEl=document.getElementById("score");
const gradeEl=document.getElementById("grade");
const progressBar=document.getElementById("progressBar");

const correctSound=document.getElementById("correctSound");
const wrongSound=document.getElementById("wrongSound");
const completeSound=document.getElementById("completeSound");

function loadQuestion(){
  answersEl.innerHTML="";
  submitBtnEl.disabled=true;
  submitBtnEl.classList.remove("hidden");
  nextBtnEl.classList.add("hidden");
  gradeEl.classList.add("hidden");
  scoreEl.classList.add("hidden");
  selectedAnswer=null;

  const q=quizData[current];
  questionEl.textContent=q.q;
  progressBar.style.width=((current+1)/quizData.length)*100+"%";

  q.a.forEach((text,i)=>{
    const btn=document.createElement("button");
    btn.textContent=text;
    btn.onclick=()=>{
      [...answersEl.children].forEach(b=>b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedAnswer=i;
      submitBtnEl.disabled=false;
    };
    answersEl.appendChild(btn);
  });
}

submitBtnEl.onclick=()=>{
  if(selectedAnswer===null) return;
  const correct=quizData[current].c;
  [...answersEl.children].forEach(b=>b.disabled=true);

  if(selectedAnswer===correct){
    answersEl.children[selectedAnswer].classList.add("correct");
    correctSound.play();
    score++;
  } else {
    answersEl.children[selectedAnswer].classList.add("wrong");
    answersEl.children[correct].classList.add("correct");
    wrongSound.play();
  }

  submitBtnEl.classList.add("hidden");
  nextBtnEl.classList.remove("hidden");
};

nextBtnEl.onclick=()=>{
  if(submitBtnEl.disabled) return; // Prevent skipping
  current++;
  if(current<quizData.length) loadQuestion();
  else finishQuiz();
};

function finishQuiz(){
  questionEl.textContent="Quiz Complete!";
  answersEl.innerHTML="";
  nextBtnEl.classList.add("hidden");
  scoreEl.textContent=`Score: ${score} / ${quizData.length}`;
  scoreEl.classList.remove("hidden");

  const pct=(score/quizData.length)*100;
  let grade="";
  if(pct>=90) grade="A";
  else if(pct>=80) grade="B";
  else if(pct>=70) grade="C";
  else if(pct>=60) grade="D";
  else grade="F";

  gradeEl.textContent=`Grade: ${grade}`;
  gradeEl.classList.remove("hidden");
  progressBar.style.width="100%";
  completeSound.play();
}

loadQuestion();
