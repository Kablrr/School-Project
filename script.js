const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('prompt');
const imageContainer = document.getElementById('imageContainer');
const loading = document.getElementById('loading');

generateBtn.addEventListener('click', async () => {
  const prompt = promptInput.value.trim();
  if (!prompt) return alert("Please enter a prompt!");

  imageContainer.innerHTML = "";
  loading.style.display = "block";

  try {
    // Pollinations API
    const response = await fetch(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`);
    if (!response.ok) throw new Error("Failed to generate image");

    const imageUrl = response.url;
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = prompt;
    imageContainer.appendChild(img);
  } catch (error) {
    alert("Error: " + error.message);
  } finally {
    loading.style.display = "none";
  }
});


