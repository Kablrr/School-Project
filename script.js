const input = document.getElementById('promptInput');
const resultImg = document.getElementById('result');
const loading = document.getElementById('loading');
const generateBtn = document.getElementById('generateBtn');

generateBtn.addEventListener('click', generateImage);

async function generateImage() {
    const userPrompt = input.value.trim();
    if(!userPrompt) return;

    // Hidden 1776 style details
    const fullPrompt = `${userPrompt}, detailed 1776 revolutionary war style, historical clothing, oil painting, realistic lighting`;

    loading.style.display = "block";
    resultImg.src = "";

    try {
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}`;
        const response = await fetch(url);
        if(!response.ok) throw new Error("Failed to generate image.");
        const blob = await response.blob();
        resultImg.src = URL.createObjectURL(blob);
    } catch(err) {
        alert("Error: " + err.message);
    } finally {
        loading.style.display = "none";
    }
}

