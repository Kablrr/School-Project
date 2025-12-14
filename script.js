// Avatar dropdowns
const genderSelect = document.getElementById("genderSelect");
const backgroundSelect = document.getElementById("backgroundSelect");
const outfitSelect = document.getElementById("outfitSelect");
const hatSelect = document.getElementById("hatSelect");
const accessorySelect = document.getElementById("accessorySelect");
const hairSelect = document.getElementById("hairSelect");
const ageSelect = document.getElementById("ageSelect");
const raceSelect = document.getElementById("raceSelect");

let currentAvatar = null; // track current avatar

generateAvatarBtn.onclick = () => {
  // Remove previous avatar if exists
  if (currentAvatar) {
    currentAvatar.onload = null;
    currentAvatar.onerror = null;
    avatarContainer.removeChild(currentAvatar);
    currentAvatar = null;
  }

  avatarContainer.innerHTML = "";
  avatarLoading.innerHTML = `<div class="spinner"></div>`;
  avatarLoading.classList.remove("hidden");
  requestAnimationFrame(() => avatarLoading.classList.add("show"));
  generateAvatarBtn.disabled = true;

  const prompt =
    `A ${genderSelect.value} ${ageSelect.value} ${raceSelect.value} colonial student with a gentle smile, ` +
    `wearing ${outfitSelect.value}, ${hatSelect.value}, holding ${accessorySelect.value}, ` +
    `with ${hairSelect.value} hair, standing in a ${backgroundSelect.value}, oil painting, realistic, soft lighting, warm colors`;

  const img = new Image();
  img.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${Date.now()}`;
  currentAvatar = img;

  avatarContainer.appendChild(img);

  img.onload = () => {
    avatarLoading.classList.remove("show");
    setTimeout(() => {
      avatarLoading.classList.add("hidden");
      avatarLoading.innerHTML = "";
    }, 400);
    generateAvatarBtn.disabled = false;
  };

  img.onerror = () => {
    avatarLoading.classList.remove("show");
    setTimeout(() => {
      avatarLoading.classList.add("hidden");
      avatarLoading.innerHTML = "";
    }, 400);
    generateAvatarBtn.disabled = false;
    alert("Failed to load avatar");
  };
};
