const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('promptInput');
const resultContainer = document.getElementById('resultContainer');
const loading = document.getElementById('loading');

generateBtn.addEventListener('click', async () => {
    const promptText = promptInput.value.trim() || 
        "A historical 1776 style painting, oil painting, dramatic lighting, vintage textures";
    
    loading.style.display = "block";        // show loading
    resultContainer.innerHTML = "";          // clear previous image

    try {
        const apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to generate image.");

        const blob = await response.blob();
        const img = document.createElement('img');   // create <img> dynamically
        img.src = URL.createObjectURL(blob);
        resultContainer.appendChild(img);           // add image only after fetched
    } catch (err) {
        alert("Error: " + err.message);
    } finally {
        loading.style.display = "none";            // hide loading
    }
});

