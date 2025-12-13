const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('promptInput');
const resultImg = document.getElementById('result');
const loading = document.getElementById('loading');

generateBtn.addEventListener('click', async () => {
    const promptText = promptInput.value.trim() || "A historical 1776 style painting, oil painting, dramatic lighting, vintage textures";
    loading.style.display = "block"; // show loading
    resultImg.style.display = "none"; // hide previous image

    try {
        const apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to generate image.");

        const blob = await response.blob();
        resultImg.src = URL.createObjectURL(blob);
        resultImg.style.display = "block"; // show the generated image
    } catch (err) {
        alert("Error: " + err.message);
    } finally {
        loading.style.display = "none"; // hide loading
    }
});

