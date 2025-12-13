const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('prompt');
const imageContainer = document.getElementById('imageContainer');
const loading = document.getElementById('loading');

generateBtn.addEventListener('click', () => {
  const userPrompt = promptInput.value.trim();
  if (!userPrompt) return alert("Please enter a prompt!");

  const prompt = userPrompt + " colonial America, 18th century, oil painting, parchment texture, quill and ink, historical scene, rustic background, warm lighting";

  imageContainer.innerHTML = "";
  loading.style.display = "block";
  generateBtn.disabled = true;

  const encodedPrompt = encodeURIComponent(prompt);
  const imageUrl = `https://pollinations.ai/p/${encodedPrompt}`;

  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = prompt;
  img.onload = () => {
    loading.style.display = "none";
    generateBtn.disabled = false;
  };
  img.onerror = () => {
    loading.style.display = "none";
    generateBtn.disabled = false;
    alert("Failed to generate image.");
  };

  imageContainer.appendChild(img);
});
