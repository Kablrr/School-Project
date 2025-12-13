const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('prompt');
const imageContainer = document.getElementById('imageContainer');
const loading = document.getElementById('loading');

generateBtn.addEventListener('click', () => {
  const prompt = promptInput.value.trim();
  if (!prompt) return alert("Please enter a prompt!");

  imageContainer.innerHTML = "";
  loading.style.display = "block";

  const encodedPrompt = encodeURIComponent(prompt);
  const imageUrl = `https://pollinations.ai/p/${encodedPrompt}`;

  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = prompt;
  img.onload = () => {
    loading.style.display = "none";
  };
  img.onerror = () => {
    loading.style.display = "none";
    alert("Failed to generate image.");
  };

  imageContainer.appendChild(img);
});


